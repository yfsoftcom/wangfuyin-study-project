import React, { Component } from 'react';
import {  } from 'element-react';
import _ from 'lodash';
import 'element-theme-default';

import '../App.css';

export default class extends Component {
  constructor(props){
    super(props);
    this.state = {
      label: '00:00:00',
    }
    this.endTime = 0;
    this.timerHandle = undefined;
  }

  showTime = () => {
    if(this.endTime <= _.now()){
      // end
      this.stop();
      return;
    }
    const delta = parseInt((this.endTime - _.now()) / 1000);
    const mins = parseInt(delta/60).toFixed(0);
    const seds = parseInt(delta%60).toFixed(0);
    this.setState({
      label: `00:${ _.padStart(mins, 2, '0') }:${ _.padStart(seds, 2, '0') }` ,    
    })    
  }

  stop = () => {
    if(this.timerHandle){
      clearInterval(this.timerHandle);
    }
    this.props.timeout && this.props.timeout();
  }

  start = (mins) => {
    this.endTime = _.now() + parseInt(mins) * 60 * 1000 - 1;
    this.showTime();
    this.timerHandle = setInterval(() => {
      this.showTime();
    }, 1000)
  }

  render(){

    return (
      <span>{ this.state.label } </span>
    )
  }
}