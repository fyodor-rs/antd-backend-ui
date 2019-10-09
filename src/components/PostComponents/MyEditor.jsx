import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import { Button, Card, Form, Modal, Select, Input,Icon } from 'antd';
import { convertToRaw } from 'draft-js';
import styles from './style.less';
import { connect } from 'dva';
import draftToHtml from 'draftjs-to-html';
const { Option } = Select;
const { TextArea } = Input;
@connect(({ post, user, loading }) => ({
  currentUser: user.currentUser,
}))
class MyEditor extends React.Component {
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
  };
  handleSubmit  = () => {
    this.setState({ loading: true });
    const rawContent = convertToRaw(this.state.editorState.getCurrentContent());
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Object.assign(this.state.postContent, {
           ...values,
          rawContent: JSON.stringify(rawContent),
          htmlContent: this.state.editorState.toHTML(),
          user: this.props.currentUser._id
        });
        this.props.dispatch({
          type: 'post/addPost',
          payload: this.state.postContent,
        });
        this.props.dispatch({
          type: 'post/queryPost',
        });
        this.setState({ visible: false });
        this.props.form.resetFields();
      }
        this.setState({ loading: false});
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleChange = editorState => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const htmlContent = draftToHtml(rawContent);
    this.setState({ editorState });
  };

  render() {
    const { visible, loading } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return (
      <div style={{ float: 'right',display:'inline-block' }} >
        <Button onClick={this.showModal}>
        <Icon type="form" />写博客
        </Button>

        <Modal
          visible={visible}
          title="新建"
          width={900}
          style={{ top: 40,left:100 }}
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
          <Form {...formItemLayout} style={{ display: 'flex' }}>
            <Card bodyStyle={{ padding: 20, height: 100, width: 300 }}>
              <Form.Item label="Title" hasFeedback>
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: 'Please enter the title!' }],
                })(<Input placeholder="Please enter the title."></Input>)}
              </Form.Item>

              <Form.Item label="Sort" hasFeedback>
                {getFieldDecorator('category', {
                  rules: [{ required: true, message: 'Please select categories!' }],
                })(
                  <Select placeholder="Please select categories.">
                    <Option value="Technology">Technology</Option>
                    <Option value="Entertainment">Entertainment</Option>
                    <Option value="Gossip">Gossip</Option>
                  </Select>,
                )}
              </Form.Item>

              <Form.Item label="Label">
                {getFieldDecorator('label', {
                  rules: [
                    {
                      required: true,
                      message: 'Please select the label!',
                      type: 'array',
                    },
                  ],
                })(
                  <Select mode="multiple" placeholder="Please select the label.">
                    <Option value="HTMl">HTMl</Option>
                    <Option value="CSS">CSS</Option>
                    <Option value="JavaScript">JavaScript</Option>
                    <Option value="Vue">Vue</Option>
                    <Option value="React">React</Option>
                    <Option value="Node">Node</Option>
                  </Select>,
                )}
              </Form.Item>

              <Form.Item label="Desc" hasFeedback>
                {getFieldDecorator('describe', {
                  rules: [{ message: 'Please enter a description.!' }],
                })(
                  <TextArea
                    autosize={{ minRows: 6 }}
                    placeholder="Please enter a description."
                  ></TextArea>,
                )}
              </Form.Item>
            </Card>
            <Card bodyStyle={{ padding: 0 }}>
              <BraftEditor
                contentStyle={{ height: 280 }}
                value={this.state.editorState}
                onChange={this.handleChange}
              />
            </Card>
          </Form>
        </Modal>
      </div>
    );
  }
}

const MyEditorForm = Form.create({ name: 'myEditor' })(MyEditor);

export default MyEditorForm;
