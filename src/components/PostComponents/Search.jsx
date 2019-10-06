import { Menu, Dropdown, Button } from 'antd';
import styles from './style.less';
import React, { Component } from 'react';
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
const menu2 = (
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
  const menu3 = (
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

class ButtonOne extends Component {
  render() {
    return (
      <Dropdown className={styles.dropdownButton} overlay={menu} placement="bottomLeft">
        <Button type="primary">分类</Button>
      </Dropdown>
    );
  }
}

class ButtonTwo extends Component {
  render() {
    return (
      <Dropdown className={styles.dropdownButton} overlay={menu} placement="bottomLeft">
        <Button type="primary">标签</Button>
      </Dropdown>
    );
  }
}

class ButtonThree extends Component {
  render() {
    return (
      <Dropdown className={styles.dropdownButton} overlay={menu} placement="bottomLeft">
        <Button type="primary">作者</Button>
      </Dropdown>
    );
  }
}

// ReactDOM.render(
//   <div>
//     <Dropdown overlay={menu} placement="bottomLeft">
//       <Button>bottomLeft</Button>
//     </Dropdown>
//     <Dropdown overlay={menu} placement="bottomCenter">
//         <Button>bottomCenter</Button>
//       </Dropdown>
//       <Dropdown overlay={menu} placement="bottomRight">
//         <Button>bottomRight</Button>
//       </Dropdown>
//       <br />
//       <Dropdown overlay={menu} placement="topLeft">
//         <Button>topLeft</Button>
//       </Dropdown>
//       <Dropdown overlay={menu} placement="topCenter">
//         <Button>topCenter</Button>
//       </Dropdown>
//       <Dropdown overlay={menu} placement="topRight">
//         <Button>topRight</Button>
//       </Dropdown>
//   </div>,
// );

export {ButtonOne,ButtonTwo,ButtonThree}