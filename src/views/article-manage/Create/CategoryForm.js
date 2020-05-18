import React, { Component } from 'react';
import {  Form, Input, Cascader } from 'antd'
import axios from 'axios';
class CategoryForm extends Component {
  state={
    options:[]
  }
  componentDidMount() {
    axios.get("http://localhost:5000/categories").then(res=>{
      this.setState({
        options:res.data
      })
    })
    console.log(this.props);
    this.refs.form.setFieldsValue(this.props.formdata);
  }
  
  render() {
    return (
      <div  style={{marginTop: 50}}>
        <Form
          name="basic"
          ref="form"
        >
          <Form.Item
            label="文章标题"
            name="title"
            rules={[
              {
                required: true,
                message: '请输入文章标题',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="文章类型"
            name="category"
            rules={[
              {
                required: true,
                message: '请选择文章类型',
              },
            ]}
          >
              <Cascader options={this.state.options} placeholder="Please select" fieldNames={{
                label:"title" //title 代替 label属性
              }}/>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default CategoryForm;
