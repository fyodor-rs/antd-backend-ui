import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import { Button, Card, Form, Modal, Select, Input, Icon, Row, Col } from 'antd';
import { convertToRaw } from 'draft-js';
import styles from './style.less';
import { connect } from 'dva';
import draftToHtml from 'draftjs-to-html';
import fileUtil from '@/utils/fileUtil';
const { Option } = Select;
const { TextArea } = Input;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

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
  handleSubmit = () => {
    this.setState({ loading: true });
    const rawContent = convertToRaw(this.state.editorState.getCurrentContent());
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Object.assign(this.state.postContent, {
          ...values,
          rawContent: JSON.stringify(rawContent),
          htmlContent: this.state.editorState.toHTML(),
          user: this.props.currentUser._id,
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
      this.setState({ loading: false });
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
      <div style={{ float: 'right', display: 'inline-block' }}>
        <Button onClick={this.showModal}>
          <Icon type="form" />
          写博客
        </Button>

        <Modal
          visible={visible}
          title="新建"
          width={900}
          style={{ top: 40, left: 100 }}
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
                        <Option value="Technology">Technology</Option>
                        <Option value="Entertainment">Entertainment</Option>
                        <Option value="Gossip">Gossip</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item className={styles.formItem} label="Label">
                    {getFieldDecorator('label', {
                      rules: [
                        {
                          required: true,
                          message: 'Please select the label!',
                          type: 'array',
                        },
                      ],
                    })(
                      <Select
                        mode="tags"
                        // size={size}
                        placeholder="Please select"
                        defaultValue={['a10', 'c12']}
                        // onChange={handleChange}
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
            <Card bodyStyle={{ padding: 0 }}>
              <BraftEditor
                contentStyle={{ height: 220 }}
                value={this.state.editorState}
                onChange={this.handleChange}
                media={{ uploadFn: fileUtil }}
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
