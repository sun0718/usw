import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Select, InputNumber, Popconfirm, Form, Tag } from 'antd';

// 1 定义表格数据接口类型
interface Item {
    key: string;
    icpSheet: string;
    icpPoint: string;
    icpStartRow: string;
    configRules: Array<object>;
}

// 定义编辑的行序列号
interface EditableRowProps {
    index: number;
}

// 定义列
interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    inputType: 'number' | 'text' | 'select' | undefined;
    dataIndex: string;
    record: Item;
    handleSave: (record: Item) => void;
}

// hook实现content,每一行都能使用form的方法
const EditableContext = React.createContext<any>();

// 重定义行
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

//重新定义列
const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    inputType,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const [selectL, setSlectL] = useState([])
    const inputRef = useRef();
    const selectRef = useRef();
    const form = useContext(EditableContext);

    useEffect(() => {
        if (editing && inputType != 'select') {
            inputRef.current.focus();
        } else if (editing && inputType == 'select') {
            selectRef.current.focus()
        }
    }, [editing]);

    const selectChange = (value) => {
        if (value.length < selectL.length) {
            var pos = selectL.findIndex(item => value.indexOf(item) < 0)
            record['configRules'].splice(pos, 1)
        } else if (value.length > selectL.length) {
            record['configRules'].push({
                icpId: record['configRules'].slice(-1)[0].icpId,
                ruleId: record['configRules'].slice(-1)[0].ruleId + 1,
                ruleFrom: value.slice(-1)[0].split('-')[0],
                ruleTo: value.slice(-1)[0].split('-')[1],
            })
        }
        setSlectL(_.cloneDeep(record['configRules']))
    }

    const toggleEdit = () => {
        setEditing(!editing);
        if (dataIndex == 'configRules' && !editing) {
            let selectList = record[dataIndex].map((item, i) => {
                return item.combination
            })
            setSlectL(_.cloneDeep(selectList))
            form.setFieldsValue({
                [dataIndex]: selectList
            });
        } else {
            form.setFieldsValue({
                [dataIndex]: record[dataIndex]
            });
        }
    };

    const save = async e => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >

                {
                    inputType === 'number' ?
                        <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} /> :
                        inputType === 'select' ?
                            (
                                <Select
                                    ref={selectRef}
                                    mode="tags"
                                    style={{ width: '25rem' }}
                                    placeholder="Please select"
                                    onChange={selectChange}
                                    onBlur={save}
                                >
                                </Select>
                            ) :
                            <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                }
            </Form.Item>
        ) : (
                <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                    {children}
                </div>
            );
    }

    return <td {...restProps}>{childNode}</td>;
};

const selectItem: any[] = [];

export default class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        // 表格属性控制
        this.columns = [
            {
                title: '工作簿',
                dataIndex: 'icpSheet',
                width: '20%',
                editable: true,
            },
            {
                title: '测点',
                width: '20%',
                dataIndex: 'icpPoint',
                editable: true,
            },
            {
                title: '起始行',
                width: '10%',
                dataIndex: 'icpStartRow',
                editable: true,
            },
            {
                title: '规则',
                dataIndex: 'configRules',
                width: '30%',
                editable: true,
                render: (text, record) => (
                    <span>
                        {
                            record.configRules.map((tag: {}, i: number) => {
                                tag.combination = `${tag.ruleFrom}-${tag.ruleTo}`
                                return (
                                    <Tag color="blue" key={i}>
                                        {tag.combination}
                                    </Tag>
                                )
                            })
                        }
                    </span>
                )
            }
        ];

        this.state = {
            // 表格数据
            dataSource: this.props.list.configPoints || [],
            count: 2,
        };
    }
    componentWillReceiveProps(next) {
        var selectedRowKeys: string[] = []
        const list = next.list.configPoints;
        list && list.map(item => {
            selectedRowKeys.push(item.icpId)
        })
        this.setState({
            selectedRowKeys,
            dataSource: list
        })
    }

    // 保存修改数据函数
    handleSave = row => {
        delete row.configRules
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.icpId === item.icpId);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row
        });
        // this.setState({ dataSource: newData });
        this.props.listChange(newData)
    };

    // 渲染函数
    render() {
        //展示数据
        const dataSource = this.state.dataSource;
        // debugger
        // 覆盖默认的 table 元素
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };

        //列描述数据对象
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    inputType: col.dataIndex === 'icpStartRow' ? 'number' : col.dataIndex === 'configRules' ? 'select' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });

        // 表格行是否可选择
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            // getCheckboxProps: record => ({
            //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
            //     name: record.name,
            // }),
        };

        return (
            <div>
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        columnWidth: '5rem',
                        columnTitle: '选择工作簿',
                        selectedRowKeys: this.state.selectedRowKeys,
                        ...rowSelection,
                    }}
                    components={components}
                    rowClassName={() => 'editable-row'}
                    rowKey='icpId'
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}