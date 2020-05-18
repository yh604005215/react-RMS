import React, { Component } from 'react';
import axios from 'axios'
import Title from 'antd/lib/skeleton/Title';
class Preview extends Component {
  state = {
    content:''
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/articles/${id}`).then(res=>{
      this.setState({
        content:res.data.content,
        title:res.data.title
      })
    })
  }
  
  render() {
    return (
      <div style={{margin:'30px 0',height:600, overflowY:'auto'}}>
        <h1
        style={{marginBottom:'20px 0',fontSize: 20,textAlign:'center'}}
        >{this.state.title}</h1>
        <div
        dangerouslySetInnerHTML={{__html:this.state.content}}
        ></div>
      </div>
    );
  }
}

export default Preview;
