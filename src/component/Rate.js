import React, { Component } from 'react';
import { } from 'element-react';
import _ from 'lodash';
import 'element-theme-default';

import '../App.css';

export default class extends Component {
  constructor(props){
    super(props);
    this.state = {
      rate: 100
    }

  }

  render(){
    const { ok, total } = this.props.counter;
    let rate = 100;
    if(total > 0 ){
      rate = parseInt( (parseInt(ok)/parseInt(total) * 100).toFixed(0) );
    }
    
    
    return (
      <div className="block" style={ {width: '90%'}} >
        <p>正确率: { rate } %</p>
        <p>共计: { total } </p>
      </div>
    ) 
  }
}