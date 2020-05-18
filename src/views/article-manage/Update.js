import React, { Component } from 'react';
import { Steps, Button, message } from 'antd';
import CategoryForm from './Create/CategoryForm'
import ArticleEditor from './Create/ArticleEditor'
import axios from 'axios';
const {Step} = Steps;
class Update extends Component {
  state = {
    current:0,
    formdata: null,
    content:'',
    num: 1,
    options:[],
    userId:JSON.parse(localStorage.getItem('token')).id
  }

  next = () =>{
    if (this.state.current === 0) {
      this.refs.from.refs.form.validateFields().then(values=>{
        this.setState({
          current: this.state.current + 1,
          formdata:values
        })
      }).catch(err=>{
        console.log(err);    
      })
    } else {
      this.setState({
        current: this.state.current + 1
      })
    }
  }

  submit = () =>{
    const{username}=JSON.parse(localStorage.getItem('token'));
    axios.put(`http://localhost:5000/articles/${this.props.match.params.id}`,{
      ...this.state.formdata,
      content:this.state.content,
      author:username,
      userId:this.state.userId
    }).then(()=>{
      message.success("你成功了，你知道嘛？")
      this.props.history.push(`/article-manage/list`)
    })
  }

  prev = () =>{
    this.setState({
      current: this.state.current - 1
    })
  }

  componentDidMount() {
    const id = this.props.match.params.id
    axios.get(`http://localhost:5000/articles/${id}`).then(res=>{
      const {title,category,content,userId} = res.data
      if(userId!==this.state.userId){
        this.props.history.push(`/article-manage/list`)
        return
      }
      this.setState({
        formdata:{
          title,
          category
        },
        content,
        num:2
      })
    })
  }
  

  render() {
    return (
      <div>
        <Steps current={this.state.current}>
          <Step key="0" title="基本信息" />
          <Step key="1" title="文章内容" />
          <Step key="2" title="提交文章" />
        </Steps>
        {this.state.current===0&&this.state.num===2&&<CategoryForm ref="from"
        formdata={this.state.formdata}/>}
        {this.state.current===1&&
        <ArticleEditor 
          onEvent={(content)=>{
           this.setState(({
             content
           }))}}
           content={this.state.content}/>}
         {this.state.current===2&&
          <div style={{margin:'30px 0',height:600, overflowY:'auto'}}
          dangerouslySetInnerHTML={{__html:this.state.content}}>
          </div>}
        <div className="steps-action">
          {this.state.current < 2 && (
            <Button type="primary" onClick={this.next}>
              下一步
            </Button>
          )}
          {this.state.current === 2 && (
            <Button type="primary" 
            onClick={this.submit}>
              修改
            </Button>
          )}
          {this.state.current > 0 && (
            <Button style={{ margin: '0 8px' }}
            onClick={this.prev}>
              上一步
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default Update;
