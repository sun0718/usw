
import React from 'react';
import { inject, observer } from 'mobx-react'
import { Layout, Spin } from 'antd';
import MenuList from '../components/MenuList/index'
import '../pages/index.less'

interface Route {
  path: string
  name?: string
  icon?: string
  authority: string[]
  routes: Route[]
}

interface Location {
  pathname: string
  search: string
  hash: string
  query: {}
  state: string
  key: string
}

export interface Props {
  stores: {
    startNum: number
  },
  location: Location,
  route: object
}

export interface States {
  currentRoute: string,
  routeList: {}
}

@inject('stores')
@observer
export default class BasicLayout extends React.Component<Props, States> {
  state: States = {
    currentRoute: '',
    routeList: {}
  }
  constructor(props: Props) {
    super(props)
  }
  componentWillMount() {
    console.log(this.props)
    this.setState({
      currentRoute: this.props.location.pathname,
      routeList: this.props.route.routes
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname != this.props.location.pathname) {
      this.setState({
        currentRoute: nextProps.location.pathname
      })
    }
  }

  render() {
    return (
      <div>
        {/* <div className='example'>
          <Spin />
        </div> */}
        <Layout className="layout">
          <Layout.Header>
            <MenuList menulist={this.state.routeList} theme="dark" mode="horizontal" defaultSelectedKeys={[this.state.currentRoute]} />
            <div className="logo">LOGO</div>
          </Layout.Header>
          <Layout.Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
              {/* < div > 这是mobx数据： {this.props.stores.startNum}</div > */}
              {this.props.children}
            </div>
          </Layout.Content>
          {/* <Layout.Footer style={{ textAlign: 'center' }}>©2018 中南院信息与数字技术工程公司</Layout.Footer> */}
        </Layout>
      </div>
    )
  }
}

