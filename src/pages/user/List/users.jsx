import { Table,Divider,Input,Card,Modal } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
const { Search } = Input;
const { confirm,warning } = Modal;
@connect(({ user, loading }) => ({
  userList: user.userList,
  currentUser:user.currentUser,
  submitting: loading.effects['register/register'],
}))
class UserList extends Component {
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type:'user/fetchUsers'
    })
  }
  searchUserOption=(text)=>{
    const { dispatch } = this.props;
    dispatch({
      type:'user/queryUserBySearch',
      payload:text
    })
  }
  deleteUserOption=(id)=>{
    const { dispatch } = this.props;
    dispatch({
      type:'user/deleteUser',
      payload:{'_id':id}
    })
    dispatch({
      type:'user/fetchUsers'
    })
  }
  showConfirm=(value)=> {
    confirm({
      title: `Are you sure want to delete the user '${value.nickname}' ?`,
      content: 'You will delete all user records and articles......',
      width:500,
      onOk:()=> {
        this.deleteUserOption(value._id)
      }
    });
  }
  render() {
    const {userList,currentUser}=this.props
    const columns = [
      {
        title: 'Avatar',
        dataIndex: 'avatar',
        key: 'avatar',
        render: text => <img style={{width:25,height:25}} src={text}/>
      },
      {
        title: 'Name',
        dataIndex: 'nickname',
        key: 'nickname',
      },
        {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            {/* <a>Edit {record.name}</a>
            <Divider type="vertical" /> */}
            <a disabled={record.role=='admin'||record._id==currentUser._id} onClick={()=>{this.showConfirm(record)}}>Delete</a>
          </span>
        ),
      },
    ];
    return (
      <div>
         <Card style={{ marginTop: -20}} bodyStyle={{padding:20}}>
        <Search style={{width:'20em'}} placeholder="input search text" onSearch={value => {this.searchUserOption(value)}} enterButton />
          
        </Card>
        <Table columns={columns} dataSource={userList} size="middle" />
      </div>
    );
  }
}

export default UserList;
