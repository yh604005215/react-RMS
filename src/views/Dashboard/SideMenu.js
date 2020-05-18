import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Menu, Layout } from 'antd';
import menuArr from '../../router/menuArr';
import { withRouter } from 'react-router';

const { Sider } = Layout;
const { SubMenu } = Menu;
const  rules = /\/(.*)\//;
class SideMenu extends Component {
  renderMenu = (menus) => {
    const {roleType} = JSON.parse(localStorage.getItem('token'));
    return menus.map(item => {
      if (item.children &&  roleType >= item.permission) {
        return (
        <SubMenu key={item.path} icon={<item.icon />} title={item.title}>
          {this.renderMenu(item.children)}
        </SubMenu>
        )
      } else {
        if(item.permission > roleType){
          return null;
        }

        return (
        <Menu.Item key={item.path} icon={<item.icon />}>
          {item.title}
          </Menu.Item>
        )
      }
    })
  }

  handleChangePage = (obj) =>{
    this.props.history.push(obj.key);
    this.props.sendPath(obj.key)
  }
  

  render() {
    
    const openPath = rules.test(this.props.location.pathname) ? '/' + rules.exec(this.props.location.pathname)[1] : null
    return (
      <Sider>
        <Menu theme="dark" mode="inline" 
        selectedKeys={['/'+this.props.state.path]}
        defaultOpenKeys={[openPath]}
        onClick ={this.handleChangePage}>
          { this.renderMenu(menuArr) } 
        </Menu>
      </Sider>
    )
  }
}

const mapDispatchToProps = (dispathch) =>{
  return {
    sendPath:(val) =>{
      dispathch({
        type:'path_switch',
        path:val
      })
    }
  }
}
const mapStateToProps = (state) =>{
  return {
    state
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideMenu));
