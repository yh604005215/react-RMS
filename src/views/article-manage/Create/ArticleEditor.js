import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftjsToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState } from 'draft-js';
class AritcleEditor extends Component {
  state={
    editorState:"", //
    contentState:""
  }

  onContentStateChange  = (contentState) =>{
    this.setState({
      contentState
    })
  }

  onEditorStateChange = (editorState) =>{
    this.setState({
      editorState
    })
  }
  componentDidMount() {
    if(this.props.content){
      const html = this.props.content;
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks); //内容状态
        const editorState = EditorState.createWithContent(contentState);//编辑器状态
        this.setState({
            editorState
        })
      }
    }
  }
  
  render() {
    return (
      <div style={{margin:'30px 0',height:600, overflowY:'auto'}}>
        <Editor 
        editorState={this.state.editorState} //编辑器状态
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={this.onEditorStateChange}
        onContentStateChange = {this.onContentStateChange}
        onBlur={()=>{
          this.props.onEvent(draftjsToHtml(this.state.contentState));
        }}
        />
      </div>
    );
  }
}

export default AritcleEditor;
