import React, { Component } from 'react';
import {Route,Redirect,Switch} from 'react-router-dom';
import { Layout } from 'antd';
import SideMenu from './SideMenu';
import TopHeader from './TopHeader'
import Home from '../Home';
import User from '../UearManage/User';
import Manage from '../RightManage'
import List from '../article-manage/List'
import Preview from '../article-manage/Preview'
import Create from '../article-manage/Create/index'
import Update from '../article-manage/Update'
import './index.css';
import store from '../../store'
import {Provider} from 'react-redux'
const { Content, Footer } = Layout;
class Dashboard extends Component {
  render() {
    const {roleType} = JSON.parse(localStorage.getItem('token'))
    return (
      <Provider store={store}>
        <Layout>
          <SideMenu />
          <Layout>
            <TopHeader />
            <Content style={{ 
              margin: '24px 16px 0',
              padding: '10px 24px 0 24px',
              background: '#fff',
              minHeight: 'auto'}}>
            <Switch>
                {/* 首页 */}
                <Route path="/home" component={Home} />
                {/* 用户权限-用户列表 */}
                {
                  roleType > 1 &&
                  <Route path="/user-manage/users" component= {User}/>
                }
                {/* 权限管理-权限列表,角色列表 */}
                {
                  roleType > 1 &&
                  <Route path="/right-manage" component={Manage}/>
                }
                {/* 文章管理- 文章列表 文章分类 */}
                <Route path="/article-manage/list" component={List} />
                <Route path="/article-manage/preview/:id" component={Preview} exact />
                <Route path="/article-manage/create" component={Create}/>
                <Route path="/article-manage/update/:id" component={Update}/>
                <Redirect from ="/" to="/home" exact/>
            </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </Provider>
    );
  }
}

export default Dashboard;
