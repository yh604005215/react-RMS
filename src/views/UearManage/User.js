import React, { Component } from 'react';
import { Button, Table, Switch, Modal, Form, Input ,Select} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UserFrom from '../../components/UserFrom'
import axios from 'axios'


class User extends Component {
  state = {
    data:[],
    title: '添加用户',
    visible:false,
    onCancel:()=>{
      this.setState({
        visible: !this.state.visible
      })
    },
    handelUser:null
  }

  addUser=()=>{
     this.refs.userFrom.setValues({
      username:null,
      password:null,
      roleType:null
    })
    this.setState({
      title:'添加用户',
      handelUser:(values)=>{
        const arr = ['小编','管理员','超级管理员'];
        return axios.post('http://localhost:5000/users',{
          ...values,
          roleName:arr[values.roleType-1],
          roleState:false,
          default: false
        })
      },
      visible:!this.state.visible
    })
  }

  updateUser = (obj) =>{
    
    this.refs.userFrom.setValues({
      username:obj.username,
      password:obj.password,
      roleType:obj.roleType
    })
    this.setState({
      title:'修改用户',
      handelUser:(values)=>{
        
        const arr = ['小编','管理员','超级管理员'];
        return axios.put(`http://localhost:5000/users/${obj.id}`,{
          ...obj,
          ...values,
          roleName:arr[values.roleType-1]
        })
      },
      visible:!this.state.visible
    })
  }

  columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
      render: item => <span>{item}</span>
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      render: item => <span>{item}</span>
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      key: 'roleState',
      render: (roleState, item) => {
        return <Switch
        defaultChecked={roleState}
        disabled={item.default}
        onClick={()=>{     
          axios.put(`http://localhost:5000/users/${item.id}`,{
            ...item,
            roleState: !roleState
          }) 
        }}/>
      }
    },
    {
      title: '操作',
      key: 'action',
      render: obj => <div>
          <Button type="primary" shape="circle"
          icon={<EditOutlined />}
          disabled={obj.default}
          onClick={()=>this.updateUser(obj)}/>

          <Button type="danger"shape="circle"
          icon={<DeleteOutlined />}
          disabled={obj.default}
          onClick={()=>{
            axios.delete(`http://localhost:5000/users/${obj.id}`)
          }}
         />
      </div>
    }
  ]

  componentDidMount() {
    axios.get('http://localhost:5000/users').then(res=>{
      this.setState({
        data:res.data
      })
    })
  }



  render() {
    return (
      <div>
          <Button type="primary"
          onClick={()=>{
            this.addUser()
          }}
          >添加用户</Button>
          <Table
          columns={this.columns}
          dataSource={this.state.data}
          rowKey={item => item.id}
          />
          <UserFrom 
          visible={this.state.visible}
          title={this.state.title}
          onCancel={this.state.onCancel}
          handelUser={this.state.handelUser}
          ref='userFrom'
          />
      </div>
    );
  }
}

export default User;
