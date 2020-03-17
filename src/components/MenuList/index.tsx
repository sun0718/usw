import React, { Component } from 'react'
import { Menu, Button } from 'antd';
import { history } from 'umi'
import { withRouter } from 'react-router-dom'

import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';

import { inject, observer } from 'mobx-react'

const { SubMenu } = Menu;

import './index.less'

@inject('stores')
@observer
class MenuList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            sidebar: []
        }
        this.menuChange.bind(this)
        this.updateMenu.bind(this)
    }
    componentDidMount() {
        this.updateMenu()
    }
    componentWillReceiveProps() {
        this.updateMenu()
    }

    updateMenu() {
        let curBasePath = this.props.stores.curBasePath;
        let sidebar = this.props.route.find(item => item.path == curBasePath)
        this.setState({
            sidebar: Object.assign({}, sidebar)
        })
    }

    menuChange = (val) => {
        history.push(val.key)
    }

    toggleCollapsed = () => {
        this.props.stores.increment()
    };

    render() {
        return (
            <>
                <Button className='collapsed-btn' onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    {React.createElement(this.props.stores.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    {
                        (this.state.sidebar.routes && this.state.sidebar.routes.map(curr => {
                            if (curr.routes && curr.routes.length > 0) {     //判断是否是有下拉选项的菜单项
                                return (
                                    <SubMenu
                                        key={curr.path}
                                        title={<span>{curr.name}</span>}
                                    >{
                                            curr.routes.map(item => {
                                                if (!item.name) {
                                                    return null
                                                }
                                                return (
                                                    <Menu.Item
                                                        key={item.path}
                                                        onClick={this.menuChange}
                                                    >{item.name}</Menu.Item>
                                                )
                                            })
                                        }</SubMenu>
                                )
                            }
                            if (!curr.name) {
                                return
                            }
                            return (
                                <Menu.Item key={curr.path} onClick={this.menuChange}>
                                    <span>{curr.name}</span>
                                </Menu.Item>
                            )
                        }))}
                </Menu>
            </>
        );
    }
}

export default withRouter(MenuList)