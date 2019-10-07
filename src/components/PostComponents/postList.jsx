import { List, Card, Avatar, Icon, Menu, Dropdown, Button } from 'antd';
import React, { Component } from 'react';
import styles from './style.less';
import MyEditor from '@/components/PostComponents/myEditor';
import { connect } from 'dva';
const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);
@connect(({ post, loading }) => ({
  postList: post.postList,
}))
class postList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'post/queryPost',
    });
  }
  render() {
    const postList = this.props.postList;
    return (
      <div>
        <Card className={styles.header}>
            <MyEditor />
              <Dropdown className={styles.dropdownButton} overlay={menu} placement="bottomLeft">
            <Button style={{backgroundColor:'gray'}} type="primary"><Icon type="user" />作者</Button>
          </Dropdown>
          <Dropdown className={styles.dropdownButton} overlay={menu} placement="bottomLeft">
            <Button style={{backgroundColor:'gray'}} type="primary"><Icon type="bars" />分类</Button>
          </Dropdown>
          <Dropdown className={styles.dropdownButton} overlay={menu} placement="bottomLeft">
            <Button style={{backgroundColor:'gray'}} type="primary"><Icon type="tag" />标签</Button>
          </Dropdown>
        
        
          {/* <Button type="primary" className={styles.newButton}>写博客</Button> */}
        </Card>
        <Card bodyStyle={{padding:10}}>
        <List
          split={true}
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 4,
            style: { textAlign: 'center'},
          }}
          dataSource={postList}
          renderItem={item => (
            <List.Item
              style={{ padding: 10, paddingLeft: 15 }}
              key={item.title}
              // actions={[
              //   <IconText type="star-o" text="156" key="list-vertical-star-o" />,
              //   <IconText type="like-o" text="156" key="list-vertical-like-o" />,
              //   <IconText type="message" text="2" key="list-vertical-message" />,
              // ]}
              extra={
                <img
                  width={50}
                  height={50}
                  alt="logo"
                  src={item.img}
                />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.user.avatar} />}
                title={
                  <a
                    onClick={() => {
                      this.props.changePage(true,item);
                    }}
                  >
                    {item.title}
                  </a>
                }
                description={item.describe}
              />
              {/* {item.content} */}
            </List.Item>
          )}
        /></Card>
      </div>
    );
  }
}

export default postList;
