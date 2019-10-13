import react, { Component } from 'react';
import { Button,Icon, Card } from 'antd';
import { connect } from 'dva';
import MyEditor from '@/components/PostComponents/myEditor';
@connect(({ post, loading }) => ({
  postInfo:post.post
}))
class PostContent extends Component {
  componentDidMount() {
    const {dispatch, match } = this.props;
    dispatch({
      type: 'post/getPostById',
      payload: match.params.id,
    });
  }
  render() {
    const {postInfo}=this.props
    return (
      <div>
        <Card>
          <div style={{wordBreak: 'break-word',whiteSpace: 'pre-wrap',overflow:'hidden'}} dangerouslySetInnerHTML={{ __html: postInfo?postInfo.htmlContent:'' }}></div>
          <MyEditor isEdit={true} post={postInfo}/>
        </Card>
      </div>
    );
  }
}
export default PostContent;
