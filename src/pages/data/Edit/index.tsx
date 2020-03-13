import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import classNames from 'classnames';
import { Card, Typography, Upload, Button } from 'antd';
import { UploadOutlined, SettingFilled } from '@ant-design/icons';

import styles from './index.less';

// interface p {
//   action: string;
//   onChange({ file, fileList }: {
//       file: any;
//       fileList: any;
//   }): void;
//   defaultFileList: ({
//       uid: string;
//       name: string;
//       status: string;
//       response: string;
//       url: string;
//   }

// const props:p = {
//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//   onChange({ file, fileList }) {
//     if (file.status !== 'uploading') {
//       console.log(file, fileList);
//     }
//   },
//   defaultFileList: [
//     {
//       uid: '1',
//       name: 'xxx.png',
//       status: 'done',
//       response: 'Server Error 500', // custom error message to show
//       url: 'http://www.baidu.com/xxx.png',
//     },
//     {
//       uid: '2',
//       name: 'yyy.png',
//       status: 'done',
//       url: 'http://www.baidu.com/yyy.png',
//     },
//     {
//       uid: '3',
//       name: 'zzz.png',
//       status: 'error',
//       response: 'Server Error 500', // custom error message to show
//       url: 'http://www.baidu.com/zzz.png',
//     },
//   ],
// };

const SelectFile: React.FC<{}> = () => (
  <>
    <Typography.Text style={{ marginRight: '20px' }}>导入文件</Typography.Text>
    <Upload>
      <Button>
        <UploadOutlined /> 选择文件
      </Button>
    </Upload>
  </>
);

export default (): React.ReactNode => (
  <PageHeaderWrapper>
    <Card>
      <Typography.Text>选择文件</Typography.Text>
      <Card>
        <div className={styles.uploadTop}>
          <SelectFile />
          <Button type="primary" icon={<SettingFilled />}>
            修改配置
        </Button>
          <Button type="primary">
            开始导入
        </Button>
        </div>
      </Card>
    </Card>
  </PageHeaderWrapper>
);
