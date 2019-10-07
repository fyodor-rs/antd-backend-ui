import react, { Component } from 'react';
import { Button, Card } from 'antd';
import { connect } from 'dva';
@connect(({ post, loading }) => ({}))
class PostContent extends Component {
  componentDidMount() {
    // const { dispatch, postId } = this.props;
    // dispatch({
    //   type: 'post/getPostById',
    //   payload: postId,
    // });
  }
  render() {
    const { postId } = this.props;
    return (
      <div style={{ height: 500 }}>
        <Card>
          <div dangerouslySetInnerHTML={{ __html: postId.htmlContent }}></div>
        </Card>
        <Card>
          <Button
            type="primary"
            onClick={() => {
              this.props.changePage(false);
            }}
          >
            返回
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.props.changePage(false);
            }}
          >
            返回
          </Button>
        </Card>
      </div>
    );
  }
}
export default PostContent;
