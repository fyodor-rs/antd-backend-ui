import {
  List,
  Input,
  Modal,
  Card,
  Avatar,
  Icon,
  Menu,
  Dropdown,
  Button,
  Table,
  Tag,
  Divider,
} from 'antd';
import React, { Component } from 'react';
import styles from './style.less';
import MyEditor from '@/components/PostComponents/myEditor';
import { connect } from 'dva';
import Link from 'umi/link';
const { confirm } = Modal;
const { Search } = Input;
@connect(({ post, loading }) => ({
  postList: post.postList,
}))
class postList extends Component {
  componentDidMount() {
    this.queryPostOptions();
  }
  queryPostOptions = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'post/queryPost',
    });
  };
  deleteOptions = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'post/deletePost',
      payload: { _id: id },
    });
    this.queryPostOptions();
  };
  showConfirm = value => {
    confirm({
      title: `Are you sure want to delete the post '${value.title}' ?`,
      content: 'It can never be restored after deletion......',
      width: 500,
      onOk: () => {
        this.deleteOptions(value._id);
      },
      onCancel() {},
    });
  };
  queryPostBySearch = search => {
    const { dispatch } = this.props;
    dispatch({
      type: 'post/queryPostBySearch',
      payload: search,
    });
  };
  render() {
    const postList = this.props.postList;
    const columns = [
      {
        title: 'Avatar',
        dataIndex: 'user',
        key: 'avatar',
        render: text => (
          <a>
            <Avatar src={text.avatar} />
          </a>
        ),
      },
      {
        title: 'Name',
        dataIndex: 'user',
        key: 'name',
        render: text => <a>{text.nickname}</a>,
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: labels => (
          <span>
            {labels.map((tag, i) => {
              let color = i % 2 == 0 ? 'geekblue' : 'green';
              return (
                <Tag color={color} key={tag._id}>
                  {tag.name.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`/posts/${record._id}`}>Detail </Link>
            <Divider type="vertical" />
            <a
              onClick={() => {
                this.showConfirm(record);
              }}
            >
              Delete
            </a>
          </span>
        ),
      },
    ];

    return (
      <div>
        <Card className={styles.header} bodyStyle={{ padding: 20 }}>
          <Search
            style={{ width: '20em' }}
            placeholder="input search text"
            onSearch={value => this.queryPostBySearch(value)}
            enterButton
          />
          <MyEditor />
        </Card>
        <Table columns={columns} dataSource={postList} />
      </div>
    );
  }
}

export default postList;
