import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import _ from 'lodash'
import classNames from 'classnames';
import { Card, Typography, Button, Form, Select, Input, InputNumber } from 'antd';
import { UploadOutlined, SettingFilled } from '@ant-design/icons';
import UploadFile from './components/UploadFile'
import TableList from './components/TableList'
import { insertExcelApi } from '@/services/data'

import styles from './index.less'

const selectItem: any[] = [];

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startRow: 10,
      rules: [],
      fileList: [],
      response: {}
    }
    this.fileChange = this.fileChange.bind(this)
    this.editRules =this.editRules.bind(this)
    this.insertExcel =this.insertExcel.bind(this)
  }
  fileChange(newValue) {
    const uploadData = _.cloneDeep(newValue)
    this.setState({
      startRow: 10,
      fileList: uploadData.fileList,
      response: uploadData.file.response.data
    })
  }
  handleInputChange(e) {
    this.setState({ startRow: e });
    this.state.response.configPoints.map(item => {
      item.icpStartRow = e
    })
  }
  handleSelectChange(e) {
    this.setState({ rules: e });
    let startRuleId = this.state.response.configPoints[0].ruleId
    this.state.response.configPoints.map(item => {
      item.configRules = e.map(i => {
        return {
          icpIdId: item.icpId,
          ruleId: startRuleId,
          ruleFrom: i.split('-')[0],
          ruleTo: i.split('-')[1],
          sheetName: null
        }
      })
    })
  }
  editRules(e){
    var data = this.state.response
    data.configPoints = e
    this.setState({
      response: data
    })
    console.log(data)
  }
  insertExcel(){
    const params = {}
    // params.updateConfig = true
    params.multipartFile = this.state.fileList[0]
    
    insertExcelApi({...params,...this.state.response}).then(res=>{
      console.log(res)
    })
  }
  render() {
    return (
      <PageHeaderWrapper className={styles.excelImport}>
        <Card>
          <Typography.Text>选择文件</Typography.Text>
          <Card>
            <div className={styles.uploadTop}>
              <Typography.Text style={{ marginRight: '20px' }}>导入文件</Typography.Text>
              <UploadFile fileList={this.state.fileList} onChange={this.fileChange} />
              <Button type="primary" icon={<SettingFilled />}>
                修改配置
              </Button>
              <Button type="primary" onClick={this.insertExcel}>
                开始导入
              </Button>
            </div>
          </Card>
        </Card>
        <Card style={{ marginTop: '0.75rem' }}>
          <div className={styles.formCard}>
            <Typography.Text>批量设置</Typography.Text>
            <div>
              <div className={styles.flexForm}>
                <Typography.Text>起始行:</Typography.Text>
                <InputNumber placeholder="请输入起始行" value={this.state.startRow} onChange={(e) => this.handleInputChange(e)} />
              </div>
              <div className={styles.flexForm}>
                <Typography.Text>规则:</Typography.Text>
                <Select
                  mode="tags"
                  style={{ width: '25rem' }}
                  placeholder="请输入数据规则"
                  onChange={(e) => this.handleSelectChange(e)}
                >
                  {selectItem}
                </Select>
              </div>
            </div>
          </div>
        </Card>
        <Card style={{ marginTop: '0.75rem' }}>
          <div className={styles.formCard}>
            <Typography.Text>详细设置</Typography.Text>
          </div>
          <TableList list={this.state.response} listChange={this.editRules}/>
        </Card>
      </PageHeaderWrapper>)
  }
};
