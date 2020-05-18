import React, { Component } from 'react';
import {withRouter} from 'react-router';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
const { Header } = Layout;
class TopHeader extends Component {

  handleMenu=(obj)=>{
    if(obj.key === 'exit') {
      localStorage.removeItem("token")
      this.props.history.push('/login')
    }
  }

  render() {
    const {roleName,username} = JSON.parse(localStorage.getItem('token'))
    const menu = (
      <Menu onClick={this.handleMenu}>
        <Menu.Item key="role">
         {roleName}
        </Menu.Item>
        <Menu.Item key="exit">
          退出
        </Menu.Item>
      </Menu>
    );
    return (
      <Header className="site-layout-sub-header-background"
      style={{ padding: '0 24px', margin: '10px 16px' }}>
        <div style={{float: 'right'}}>
    <span style={{marginRight: 10}}>欢迎{username}回来</span>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <Avatar size={34} icon={<UserOutlined />} /> <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </Header>
    );
  }
}

export default withRouter(TopHeader);
