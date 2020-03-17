import React from 'react'
import { Menu, Icon } from 'antd';
import classnames from 'classnames'
import { Link,history } from 'umi';
import './index.less'
import { inject, observer } from 'mobx-react'

import { withRouter } from 'react-router-dom'

function RenderNavs(tabs, tab, changeTabs) {
  return tabs.map((item, idx) => {
    return (
      <li
        key={item.index}
        className={classnames(item.className,{ 'nav-active': idx === tab })}
        onClick={() => { changeTabs(idx,item) }}>
        <Link to={item.url}>{item.name}</Link>
      </li>
    )
  })
}

@inject('stores')
@observer
class HeaderNav extends React.Component {
  state = {
    tab: 0,
    tabs: [
      { name: '首页', index: 0, className: 'bothEnds', url: '/' },
      { name: '工程管理', index: 1, className: "clockwise", url: '/Engineering' },
      { name: '数据管理', index: 2, className: "clockwise", url: '/data' },
      { name: '报表管理', index: 3, className: "clockwise", url: '/' },
      { name: '地下安全检查', index: 4, className: "logo", url: '/' },
      { name: '三维可视化', index: 5, className: "counterclockwise", url: '/' },
      { name: '预警预报', index: 6, className: "counterclockwise", url: '/' },
      { name: '系统管理', index: 7, className: "counterclockwise", url: '/' },
      { name: '用户名', index: 8, className: 'bothEnds', url: '/' },
    ]

  }
  static defaultProps = {
    navList: []
  }
  componentDidMount(){
    let pathname = this.props.location.pathname.split('/')[1];
    let currentTab = this.state.tabs.find(item=> pathname==item.url.split('/')[1])
    this.changeTab(currentTab.index,currentTab)
  }

  changeTab = (idx:number,item:object) => {
    if(idx === this.state.tab){
      return
    }
    this.props.stores.menuRender(item)
    this.setState({
      tab: idx
    })
  }
  render() {
    return (
      <ul>
        {RenderNavs(this.state.tabs, this.state.tab, this.changeTab.bind(this))}
      </ul>
    )
  }
}

export default withRouter(HeaderNav);