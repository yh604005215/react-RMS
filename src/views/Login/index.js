import React, { Component } from 'react';
import Particles from 'react-particles-js';
import axios from 'axios'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import style from './login.module.css'
class Login extends Component {
  render() {
    return (
      <div style={{background: 'rgb(35,39,65)'}}>
        <Particles height={window.innerHeight - 5} />
        <div className={style.container}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
                name="username"
                rules={[{ required: true, message: '用户名不能为空' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: '密码不能为空' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" block>
                    登录
                </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
  onFinish = values => {
    axios.get(`http://localhost:5000/users?username=${values.username}&password=${values.password}&roleState=${true}`).then(res=>{
      if(res.data.length ===0 ){
        // console.log('用户名与密码不匹配')
        message.error("用户名密码不匹配")
      }else{
          // localstorage 只能存字符串， json字符串转化
          localStorage.setItem("token",JSON.stringify(res.data[0]))
          this.props.history.push(`/home`) //跳转到首页
      }
    })
    this.props.history.push(`/home`);
  };
}

export default Login;
