import React from 'react';
import { Link } from 'umi';
import { Breadcrumb } from 'antd';

//具体导航的名称
const breadcrumbNameMap = {
  '/user': '用户管理',
  '/data': '数据管理',
  '/data/excelImport': 'EXCEL导入',
  '/data/autoImport': '自动化导入',
  '/data/search': '数据搜索',
  '/data/edit': '数据修正',
  '/admin': '管理员',

}
export default class NewBreadcrumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pathSnippets: null,
      extraBreadcrumbItems: null
    }
    this.getPath.bind(this)
  }
  componentWillMount(){
    this.getPath(this.props.pathname)
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.pathname != this.props.pathname){
      this.getPath(nextProps.pathname)
    }
 }
  getPath = (pathname) => {
    //对路径进行切分，存放到this.state.pathSnippets中
    this.state.pathSnippets = pathname.split('/').filter(i => i);
    // let arr=this.state.pathSnippets;
    // let pathname=this.context.router.history.location.pathname;
    //将切分的路径读出来，形成面包屑，存放到this.state.extraBreadcrumbItems
    this.state.extraBreadcrumbItems = this.state.pathSnippets.map((_, index) => {
      let url = `/${this.state.pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>
            {breadcrumbNameMap[url]}
          </Link>
        </Breadcrumb.Item>
      );
    });
  }
  render() {
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item key='shouye'>
          <Link to={'/'}>
            首页
          </Link>
        </Breadcrumb.Item>
        {this.state.extraBreadcrumbItems}
      </Breadcrumb>
    );
  }
}