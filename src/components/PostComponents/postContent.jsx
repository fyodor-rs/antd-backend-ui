import { Component } from 'react';
import { Icon, Card } from 'antd';
import { connect } from 'dva';
import MyEditor from '@/components/PostComponents/myEditor';
import styles from './style.less';
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
          <h3 style={{textAlign:"center"}}>{postInfo?postInfo.title:'' }</h3>
          <div className={styles.braftOutputContent} style={{wordBreak: 'break-word',whiteSpace: 'pre-wrap',overflow:'hidden'}} dangerouslySetInnerHTML={{ __html: postInfo?postInfo.htmlContent:'' }}></div>
          <MyEditor isEdit={true} post={postInfo}/>
        </Card>
      </div>
    );
  }
}
export default PostContent;
