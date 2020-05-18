import React, { Component } from 'react';
import { Table, Button } from 'antd'
import { EditOutlined, DeleteOutlined,CopyOutlined } from '@ant-design/icons';
import axios from 'axios';
class List extends Component {
  state = {
    data: []
  }
  columns = [
    {
      title: '文章标题',
      dataIndex: 'title', //映射原数据的属性
      key: 'title'
    },
    {
      title: '文章作者',
      dataIndex: 'author', //映射原数据的属性
      key: 'author'
    },
    {
      title: '文章类别',
      dataIndex: 'category', //映射原数据的属性
      key: 'category',
      render:category=>category.join("/")
    },
    {
      title: '操作',
      key: 'action',
      render:obj=>{
        console.log(obj);
        const {id,roleType} = JSON.parse(localStorage.getItem('token'))
        console.log(roleType);
        
        return <div>
          <Button type="primary" shape="circle" icon={<CopyOutlined />} 
          onClick={()=>this.props.history.push(`/article-manage/preview/${obj.id}`)}/>
          <Button type="primary" shape="circle" icon={<EditOutlined />} 
          disabled={obj.userId !== id}
          onClick={()=>this.props.history.push(`/article-manage/update/${obj.id}`)}/>
          <Button type="danger" shape="circle" icon={<DeleteOutlined />}
          disabled={obj.userId !== id && roleType === 1}
          onClick={()=>this.handleDelClick(obj.id)}/>
        </div>
      }
    }
  ]

  handleDelClick  = (id)=>{
    axios.delete(`http://localhost:5000/articles/${id}`).then(res=>{
      //过滤掉此id对应的数据
      this.setState({
          data:this.state.data.filter(item=>item.id!==id)
      })    
    })
  }

  componentDidMount() {
    axios.get('http://localhost:5000/articles').then(res=>{
      this.setState({
        data:res.data
      })
    })
  }
  

  render() {
    return (
      <div>
        <Button type="primary" onClick={()=>{
          this.props.history.push("/article-manage/create")
        }}>创建文章</Button>
        <Table columns={this.columns} 
        dataSource={this.state.data}
        rowKey={item=>item.id}
        />
      </div>
    );
  }
}

export default List;
