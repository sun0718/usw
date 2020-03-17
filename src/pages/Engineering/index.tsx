import React, { Component } from 'react'
import { Card } from 'antd'
import styles from "./index.less";


const InfoTable=()=>{
    return (
        <Card.Grid className={styles.gridStyle}>Content</Card.Grid>
    )
}

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

export default class Engineering extends Component {
    render() {
        console.log(styles)
        return (
            <div>
                <Card title="工程信息" style={{height:'2000px'}}>
                    <InfoTable/>
                </Card>
            </div>
        )
    }
}
