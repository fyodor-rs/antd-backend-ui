import { Table } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ user, loading }) => ({
  userList: user.userList,
  submitting: loading.effects['register/register'],
}))
class UserList extends Component {
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type:'user/fetchUsers'
    })
  }
  render() {
    const {userList}=this.props
    const columns = [
      {
        title: 'Avatar',
        dataIndex: 'avatar',
        render: text => <img style={{width:25,height:25}} src={text}/>
      },
      {
        title: 'Name',
        dataIndex: 'nickname',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
      },
    ];
    return (
      <div>
        <Table columns={columns} dataSource={userList} size="middle" />
      </div>
    );
  }
}

export default UserList;
