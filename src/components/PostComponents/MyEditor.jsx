import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import {Card, Button, Modal} from 'antd'
import draftjs from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styles from './style.less';
class MyEditor extends React.Component {
  state = {
      showRichText: false,
      editorContent: '',
      editorState: ''
  }
  handleClearContent = () => {  //清空文本
      this.setState({
          editorState: ''
      })
  }
  handleGetText = () => {    //获取文本内容
      this.setState({
          showRichText: true
      })
  }
  onEditorStateChange = (editorState) => {   //编辑器的状态
      this.setState({
          editorState
      })
  }
  onEditorChange = (editorContent) => {   //编辑器内容的状态
      this.setState({
          editorContent
      })
  }
  render(){
      const { editorState, editorContent } = this.state;
      return (
          <div>
              <Card bodyStyle={{padding:20}}>
                  <Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
                  {/* <Button type="primary" onClick={this.handleGetText} style={{marginLeft: 10}}>获取html文本</Button> */}
                  <Button type="primary" onClick={this.handleGetText} style={{marginLeft: 10}}>发布</Button>
                  <Button type="primary" onClick={()=>this.props.changePage(false)} style={{float:"right"}}>返回</Button>
              </Card>
              <Card>
                  <Editor 
                      editorState={editorState}
                      onEditorStateChange={this.onEditorStateChange}
                      onContentStateChange={this.onEditorChange}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      wrapperStyle={{minHeight: 300}}
                      editorStyle={{minHeight: 300}}
                    //   toolbarStyle={{height: 500}}
                      onEditorStateChange={this.onEditorStateChange}
                  />
              </Card>
              <Modal 
                  title="富文本"
                  visible={this.state.showRichText}
                  onCancel={() =>{
                      this.setState({
                          showRichText: false
                      })
                  }}
                  footer={null}>
                  {draftjs(this.state.editorContent)}
              </Modal>
          </div>
      )
  }
}

export default MyEditor