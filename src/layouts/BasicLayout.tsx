
import React from 'react';
import { inject, observer } from 'mobx-react'
import { Layout, Spin } from 'antd';
import HeaderNav from '../components/HeaderNav/index'
import MenuList from '../components/MenuList/index'
import './BasicLayout.less'

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
    this.setState({
      routeList: this.props.route.routes
    })
  }

  render() {
    return (
      <Layout className="layout">
        <Layout.Header>
          <HeaderNav navList={this.state.routeList} />
        </Layout.Header>
        <Layout className="layout-content">
          <Layout.Sider style={{ width: '256px' }} trigger={null} collapsible collapsed={this.props.stores.collapsed}>
            <MenuList route={this.state.routeList}/>
          </Layout.Sider>
          <Layout.Content>
            <div className="site-layout-content">
              {React.cloneElement(this.props.children)}
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}

