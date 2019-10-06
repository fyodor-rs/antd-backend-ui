import React, { Component } from 'react';
import MyEditor from '@/components/PostComponents/MyEditor'
import PostList from '@/components/PostComponents/postList'
class posts extends Component {
  state={
    isEdit:false
  }
  changePage=(value)=>{
    this.setState({
      isEdit:value
    })
  }
  render() {
    return !this.state.isEdit?<PostList changePage={(value)=>this.changePage(value)}/>:<MyEditor changePage={(value)=>this.changePage(value)}/>;
  }
}

export default posts;
