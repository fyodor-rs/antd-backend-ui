import react, { Component } from 'react';
import { Button, Card } from 'antd';
import { connect } from 'dva';
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
          <div style={{wordBreak: 'break-all',whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{ __html: postInfo?postInfo.htmlContent:'' }}></div>
        </Card>
      </div>
    );
  }
}
export default PostContent;
