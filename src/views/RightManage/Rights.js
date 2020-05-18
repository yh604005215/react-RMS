import React, { Component } from 'react';
import { Table,Tag } from 'antd'
import axios from 'axios'
class Rights extends Component {
  state = {
    data:[]
  }
  columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      render: id => <span>{id}</span>
    },
    {
      title: '权限名称',
      dataIndex: 'title', //映射原数据的属性
      key: 'ruleName',
    },
    {
      title: '权限等级',
      dataIndex: 'grade', //映射原数据的属性
      key: 'grade',
      render: grade  =>{
        const arr = ['green',"orange","red"];
        return <Tag color={arr[grade-1]}>{grade}</Tag>
      }
    }
  ]

  componentDidMount() {
    axios.get('http://localhost:5000/rights').then(res=>{
      this.setState({
        data:res.data
      })
    })
  }
  

  render() {
    return (
      <Table 
      columns={this.columns} dataSource={this.state.data}
      rowKey={item => item.id}
      pagination={{ pageSize: 5 }}
      />
    );
  }
}

export default Rights;
