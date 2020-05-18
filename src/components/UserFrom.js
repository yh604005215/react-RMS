import React, { Component } from 'react';
import { Modal, Form, Input, Select } from 'antd';
const {Option} = Select;
class UserFrom extends Component {
  setValues=(values)=>{
    console.log(values);
    console.log(this.refs);
    
    this.refs.userFrom.setFieldsValue(values)
  }
  render() {
    return (
      <Modal 
      forceRender={true}
      title={this.props.title}
      okText="确定"
      cancelText="取消"
      visible={this.props.visible}
      onCancel={()=>{
        this.props.onCancel()
      }}
      onOk={() => {
        this.refs.userFrom
          .validateFields()
          .then(values => {
            console.log(this.props);
            
            this.props.handelUser(values).then(res=>{
              console.log(res);
              
              this.props.onCancel()
            })
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
      >
        <Form
          // form={Form.useForm()}
          ref="userFrom"
          layout="vertical"
          name="form_in_modal"
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[
              {
                required: true,
                message: '请输入账号',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
              <Input type="password" />
          </Form.Item>
          <Form.Item
            name="roleType"
            label="角色"
            rules={[
                {
                  required: true,
                  message: 'Please select the roleName of collection!',
                }
            ]}
          >
              <Select
                showSearch
                placeholder="选择一个角色"
              >
                <Option value={3}>超级管理员</Option>
                <Option value={2}>管理员</Option>
                <Option value={1}>小编</Option>
              </Select>
            </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default UserFrom;
