import React, { Component } from 'react';
import { Steps, Button, message } from 'antd';
import CategoryForm from './CategoryForm'
import ArticleEditor from './ArticleEditor'
import axios from 'axios';
const {Step} = Steps;

class Create extends Component {

  state = {
    current:0,
    formdata: null,
    content:'',
    options:[]
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
    const{username,id}=JSON.parse(localStorage.getItem('token'));
    
    axios.post('http://localhost:5000/articles',{
      ...this.state.formdata,
      content:this.state.content,
      author:username,
      userId:id
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

  render() {
    return (
      <div>
        <Steps current={this.state.current}>
          <Step key="0" title="基本信息" />
          <Step key="1" title="文章内容" />
          <Step key="2" title="提交文章" />
        </Steps>
        {this.state.current===0&&<CategoryForm ref="from"
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
              提交
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

export default Create;
