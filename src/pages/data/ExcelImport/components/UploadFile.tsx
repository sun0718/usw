import React from 'react'
import { Upload, Button, Modal, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default class MyUpload extends React.Component {
  state = {
    fileList: [
    ]
  };

  handleChange = info => {
    if (info.file.status === 'done') {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });
      this.setState({
        fileList
      });
      message.success(`${info.file.name} 上传成功`);
      this.props.onChange(info)
    } else if (info.file.status === 'error') {
      this.setState({
        fileList: []
      })
      message.error(`${info.file.name} 上传失败`);
    }
  };
  handleBeforeUpload = file => {
    //限制图片 格式、size、分辨率
    debugger
    const isExcel = /^.*\.(?:xls|xlsx)$/i.test(file.name)
    const isXLS = file.type === 'application/vnd.ms-excel';
    const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    if (!(isExcel || isXLS || isXLSX)) {
      message.error(`${file.name} 只能上传EXCEL文件`);
      return;
    }
    return (isExcel || isXLS || isXLSX);
  };

  render() {
    const props = {
      action: 'http://10.219.12.27:8090/excel/config',
      onChange: this.handleChange,
      // multiple: true,
      name: 'multipartFile',
      beforeUpload: this.handleBeforeUpload
    };
    return (
      <Upload {...props} fileList={this.state.fileList}>
        <Button>
          <UploadOutlined /> 上传文件
        </Button>
      </Upload>
    );
  }
}