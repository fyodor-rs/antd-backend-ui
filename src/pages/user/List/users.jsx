import { List, Avatar } from 'antd';

const data = [
  {
    title: 'Ant Design Title 1',
    title1: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
    titl1: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 3',
    title1: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 4',
    title1: 'Ant Design Title 1',
  },
];

const header=[
  'asd','asd','asd','asd'
]

export default () => (
  <List
    itemLayout="horizontal"
    header={header}
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<a href="https://ant.design">{item.title}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
      </List.Item>
    )}
  ></List>
);