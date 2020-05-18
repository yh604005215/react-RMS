import React, { Component } from 'react';
import { Table, Button,Tag } from 'antd'
import axios from 'axios'
class Roles extends Component {
  state =  {
    data:[]
  }
  colums = [
    {
      title: '角色名称',
      dataIndex: 'roleName', //映射原数据的属性
      key: 'roleName'
    },
    {
      title: '操作',
      // dataIndex
      key: 'action',
      render: () => <Button type="danger">delete</Button>
    }
  ]

  componentDidMount() {
    //权限的后端接口
    axios.get("http://localhost:5000/roles").then(res => {
      this.setState({
          data: res.data
      })
    })
  }
  

  render() {
    return (
      <Table columns={this.colums}
      dataSource={this.state.data}
      rowKey={item => item.id} pagination={{ pageSize: 5 }}
      expandable={{
        expandedRowRender: (data) => {
          // console.log(data.roleRight)
          return data.roleRight.map((item,index) =>
            <div key={index}>
                <b>{item.category}</b>
                {
                  item.list.map(childitem=>
                    <Tag key={childitem}
                    color="green"
                    style={{margin:10}}
                    >{childitem}</Tag>
                  )
                }
            </div>
          )
        }
      }}
      />
    );
  }
}

export default Roles;
