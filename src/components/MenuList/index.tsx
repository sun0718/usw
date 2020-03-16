import React from 'react'
import { Menu, Icon } from 'antd';
import { Link } from 'umi';
const SubMenu = Menu.SubMenu;
import './index.less'

class Index extends React.Component {
  
  static defaultProps = {
    menulist: []
  }

  createMenu = ((menuData) => {  //创建菜单
    //let itemIndex = 0; //累计的每一项索引
    let submenuIndex = 0; //累计的每一项展开菜单索引
    let menu = [];
    const create = (menuData, el) => {
      for (let i = 0; i < menuData.length; i++) {
        if (menuData[i].routes) {  //如果有子级菜单
          let children = [];
          create(menuData[i].routes, children);
          submenuIndex++;
          el.push(
            <SubMenu
              key={`sub${submenuIndex}`}
              title={(
                <span style={{ height: '100%', display: 'block' }}>
                  <Icon type={menuData[i].icon} />{menuData[i].name}
                </span>
              )}
            >
              {children}
            </SubMenu>
          )
        } else {   //如果没有子级菜单
          //itemIndex++;   
          if (menuData[i].name) {
            el.push(
              <Menu.Item key={menuData[i].path} title={menuData[i].name}>
                <Link to={menuData[i].path}>
                  {menuData[i].icon ? <Icon type={menuData[i].icon} /> : null}
                  <span>{menuData[i].name}</span>
                </Link>
              </Menu.Item>
            )
          }
        }
      }

    };
    create(menuData, menu);
    return menu;
  })(this.props.menulist);

  render() {
    console.log(this.props)
    return (
      <Menu {...this.props} style={{ height: '100%' }}>
        {this.createMenu}
      </Menu>
    )
  }
}

export default Index;