import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import classNames from 'classnames';
import { Card, Typography, Upload, Button } from 'antd';
import { UploadOutlined, SettingFilled } from '@ant-design/icons';

import styles from './index.less';

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
