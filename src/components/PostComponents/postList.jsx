import { List, Card, Avatar, Icon, Button } from 'antd';
import React, { Component } from 'react';
import styles from './style.less';
import {ButtonOne,ButtonTwo,ButtonThree} from './Search'
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

class postList extends Component {
    render() {
    return (
      <div>
        <Card className={styles.header}>
        <ButtonOne></ButtonOne>
        <ButtonTwo></ButtonTwo> 
        <ButtonThree></ButtonThree> 
        <Button type="primary" onClick={()=>{this.props.changePage(true)}} className={styles.newButton}>写博客</Button>
        </Card>
        <List
          split={true}
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 4,
            style:{textAlign:"center"}
          }}
          dataSource={listData}
          renderItem={item => (
            <List.Item
              style={{ padding: 10, paddingLeft: 15 }}
              key={item.title}
              actions={[
                <IconText type="star-o" text="156" key="list-vertical-star-o" />,
                <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                <IconText type="message" text="2" key="list-vertical-message" />,
              ]}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </div>
      )
  }
}

export default postList;
