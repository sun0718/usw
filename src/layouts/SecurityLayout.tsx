import React from 'react';
import { Redirect } from 'umi';
import { stringify } from 'querystring';


//此处做登录校验
class SecurityLayout extends React.Component{
  componentDidMount() {

  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default SecurityLayout;
