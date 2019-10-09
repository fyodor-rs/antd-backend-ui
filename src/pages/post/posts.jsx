import React, { Component } from 'react';
import PostList from '@/components/PostComponents/postList';
import PostContent from '@/components/PostComponents/postContent';
import { connect } from 'dva';
class posts extends Component {
  // state = {
  //   isContent: false,
  //   postId: '',
  // };
  // changePage = (value) => {
  //   this.setState({
  //     isContent: value[0],
  //     postId: value[1]||''
  //   });
  // };
  render() {
    // return this.state.isContent ? (
    //   <PostContent changePage={(...value) => this.changePage(value)} postId={this.state.postId} />
    // ) : (
    //   <PostList changePage={(...value) => this.changePage(value)} />
    // );
    return <PostList></PostList>
  }
}

export default posts;
