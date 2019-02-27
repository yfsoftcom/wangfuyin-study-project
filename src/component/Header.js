import React, { Component } from 'react';
import {  Menu, } from 'element-react';
import _ from 'lodash';
import 'element-theme-default';

import '../App.css';

export default class extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  onSelect = (arg) => {
    console.log(arg);
  }
  render() {
    return (
      <div>
        <Menu defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={ this.props.onSelect? this.props.onSelect: this.onSelect }>
          {/* <Menu.Item index="1">处理中心</Menu.Item>
          <Menu.SubMenu index="2" title="我的工作台">
            <Menu.Item index="2-1">选项1</Menu.Item>
            <Menu.Item index="2-2">选项2</Menu.Item>
            <Menu.Item index="2-3">选项3</Menu.Item>
          </Menu.SubMenu> */}
          <Menu.Item style={{ float: 'right' }} index="3">显示结果</Menu.Item>
        </Menu>
      </div>
    )
  }
}