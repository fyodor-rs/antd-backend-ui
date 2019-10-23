import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import { Button, Card, Form, Modal, Select, Input, Icon, Row, Col } from 'antd';
import styles from './style.less';
import { connect } from 'dva';
import fileUtil from '@/utils/fileUtil';
const { Option } = Select;
const { TextArea } = Input;
@connect(({ post, user, loading }) => ({
  currentUser: user.currentUser,
  tagList: post.tagList,
}))
class MyEditor extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'post/queryTags',
    });
  }
  state = {
    loading: false,
    visible: false,
    editorState: BraftEditor.createEditorState(null),
    postContent: {},
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
    if (this.props.isEdit) {
      const { _id, img, rawContent, htmlContent, likes, views, ...formData } = this.props.post;
      this.setState({
        editorState: BraftEditor.createEditorState(htmlContent),
        postContent: { _id: _id },
      });
      const handleFormData = { ...formData, tags: formData.tags.map(tag => tag.name) };
      this.props.form.setFieldsValue(handleFormData);
    }
  };
  handleSubmit = () => {
    this.setState({ loading: true });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Object.assign(this.state.postContent, {
          ...values,
          rawContent: this.state.editorState.toRAW(),
          htmlContent: this.state.editorState.toHTML(),
          user: this.props.currentUser._id,
        });
        this.props.dispatch({
          type: this.props.isEdit ? 'post/editPost' : 'post/addPost',
          payload: this.state.postContent,
        });
        this.setState({ visible: false });
        this.props.form.resetFields();
      }
      this.setState({ loading: false });
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleChange = editorState => {
    this.setState({ editorState: editorState });
  };

  render() {
    const { visible, loading } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { tagList,isEdit, post} = this.props;
    const children = [];
    for (let i = 0; i < tagList.length; i++) {
      children.push(<Option key={tagList[i].name}>{tagList[i].name}</Option>);
    }
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return (
      <div style={{ float: 'right', display: 'inline-block' }}>
        <Button onClick={this.showModal} disabled={isEdit && !post}>
          <Icon type="form" />
          {isEdit ? '编辑' : '写博客'}
        </Button>

        <Modal
          visible={visible}
          title="新建"
          width={900}
          style={{ top: 15+"%"}}
          bodyStyle={{ padding: 0 }}
          onOk={this.handleOk}
          // closable={true}
          // maskClosable={false}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleSubmit}>
              Submit
            </Button>,
          ]}
        >
          <Form {...formItemLayout}>
            <Card bodyStyle={{ paddingBottom: 0, paddingTop: 10 }}>
              <Row gutter={8}>
                <Col span={8}>
                  <Form.Item className={styles.formItem} label="Title" hasFeedback>
                    {getFieldDecorator('title', {
                      rules: [{ required: true, message: 'Please enter the title!' }],
                    })(<Input placeholder="Please enter the title."></Input>)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item className={styles.formItem} label="Sort" hasFeedback>
                    {getFieldDecorator('category', {
                      rules: [{ required: true, message: 'Please select categories!' }],
                    })(
                      <Select placeholder="Please select categories.">
                        <Option value="note">note</Option>
                        <Option value="life">life</Option>
                        {/* <Option value="Entertainment">Life</Option>
                        <Option value="Gossip">Gossip</Option> */}
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item className={styles.formItem} label="Tag">
                    {getFieldDecorator('tags', {
                      rules: [
                        {
                          required: true,
                          message: 'Please select the tag !',
                          type: 'array',
                        },
                      ],
                    })(
                      <Select
                        mode="tags"
                        placeholder="Please select the tag."
                        style={{ width: '100%' }}
                      >
                        {children}
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Desc" className={styles.formItem} hasFeedback>
                    {getFieldDecorator('describe', {
                      rules: [{ message: 'Please enter a description.' }],
                    })(
                      <TextArea
                        autosize={{ minRows: 2 }}
                        placeholder="Please enter a description."
                      ></TextArea>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Form>
          <Card bodyStyle={{ padding: 0 }}>
            <BraftEditor
              contentStyle={{ height: 220 }}
              value={this.state.editorState}
              onChange={this.handleChange}
              media={{ uploadFn: fileUtil }}
            />
          </Card>
        </Modal>
      </div>
    );
  }
}

const MyEditorForm = Form.create({ name: 'myEditor' })(MyEditor);

export default MyEditorForm;
