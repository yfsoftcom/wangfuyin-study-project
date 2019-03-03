import React, { Component } from 'react';
import { Button, Dialog, Message, Tabs, MessageBox } from 'element-react';
import _ from 'lodash';
import 'element-theme-default';
import Record from './component/Record.js';
import Rate from './component/Rate.js';
import Countdown from './component/Countdown.js';
import Header from './component/Header.js';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      sid: 0,
      num1: 0,
      num2: 0,
      records: [],
      counter: {
        total: 0,
        ok: 0,
      },
      canNext: false,
      stopFlag: true,
      resultDialogVisible: false,
      totalTime: 15,
      input: '',
      
    }
    this.flagTime = 0;
    
  }

  componentDidMount(){
    MessageBox.msgbox({
      title: '消息',
      message: '准备开始了么？\n提示: 按回车键可以快速进行下一题!',
      showClose: false,
      showCancelButton: false,
    }).then(action => {
      if(action == 'confirm'){
        this.start();
      }
    })
  }


  stop = () => {
    this.setState({
      canNext: false,
      stopFlag: true,
      resultDialogVisible: true,
    })
  }

  start = () => {
    this.setState({ stopFlag: false, startDialogVisible: false }, () => {
      
      this.reset();
      this.refs['countdown'].start(this.state.totalTime);

      this.refs['answerInput'].focus();
    });    
  }

  reset = () => {
    const { sid } = this.state;
    const num1 = _.random(10, 20);
    const num2 =_.random(3, 10);
    this.setState({
      sid: sid + 1,
      num1, num2,
      answer: num1 - num2,
      input: '',
    })
    this.flagTime = _.now();
  }

  next = () =>{
    const { sid, num1, num2, answer, input, counter, records } = this.state;
    
    const inputNum = parseInt(input);
    if(isNaN(inputNum)){
      Message.error('还没写答案不可以跳过哦~');
      return;
    }
    let result = false;
    counter.total++;
    if(inputNum === answer){
      // right
      counter.ok++;
      result = true;
    }
    const now = _.now();
    const cost = parseInt((now - this.flagTime) / 1000).toFixed(0); //每一题用的秒数
    // const newRecord = <div><i className="txt-success" className={ result?"el-icon-check": "el-icon-close"}></i> {` ${sid}: ${ num1 } - ${ num2 } = ${ inputNum } ( ${ answer } ) | ${costTime}s`}</div>;
    const newRecord = {
      result,
      cost,
      sid,
      num1,
      num2,
      question: `${ num1 } - ${ num2 }`,
      op: '-',
      input: inputNum,
      answer,
    };
    records.push(newRecord);
    this.setState({
      counter,
      records,
    })

    
    this.reset();
  }

  handleKeyUp = (e) => {
    if(e.keyCode === 13) {
      this.next();
      return;
    }
    if(e.keyCode === 8 || e.keyCode === 32){
      // backspace or white space
      this.setState({ input: '' })
    }
  }

  onInputChange = (event) => {
    const val = event.target.value;
    if(val === undefined){
      this.setState({
        canNext: false,
      })
      return;
    }
    this.setState({
      canNext: true,
    })
    this.setState({input: val})
  }

  onSelect = (tabIndex) => {
    switch(parseInt(tabIndex)){
      case 3:
        this.setState({ resultDialogVisible: true })
        return;
    }
  }
  

  render() {
    
    return (
      <div>
        <Header onSelect={ this.onSelect } />
      
        <div className="container">
          <h1>口算练习 <div className="pull-right" style={ { fontSize: "14px"}}><Countdown ref="countdown" timeout={ this.stop }/></div></h1>

          <Dialog
            title="练习结果"
            size="small"
            visible={ this.state.resultDialogVisible }
            onCancel={ () => { this.setState({ resultDialogVisible: false })} }
            closeOnClickModal= { false }
          >
            <Dialog.Body>
              <span style={{ visibility: this.state.stopFlag? '': 'hidden' }}>已经做了{this.state.totalTime}分钟了，休息一下吧!</span>
              <Tabs type="border-card" activeName="1" style={{ marginTop: "1em"}}>
                <Tabs.Pane label="正确率" name="1">
                  <div style={{ overflow: "auto", height: "20em"}}>
                    <Rate counter={this.state.counter} />
                  </div>            
                </Tabs.Pane>
                <Tabs.Pane label="记录" name="2">
                  <div style={{ overflow: "auto", height: "20em"}}>
                    <Record records={ this.state.records } />
                  </div>
                </Tabs.Pane>
                <Tabs.Pane label="统计" name="3">
                  <div style={{ overflow: "auto", height: "20em"}}>
                    <p> ？？ </p>
                  </div>
                </Tabs.Pane>
              </Tabs>
            </Dialog.Body>
            <Dialog.Footer className="dialog-footer">
              <Button type="primary" onClick={ () => { this.setState({ resultDialogVisible: false })} }>嗯</Button>
            </Dialog.Footer>
          </Dialog>

          <div className="grid-content bg-purple">
            <h5>{ this.state.sid}. </h5>
              <center>
                <span className="question">{ this.state.num1 } - { this.state.num2 }  = </span>
                <span className="answer"><input ref="answerInput" disable={ this.stopFlag }onChange={ this.onInputChange} placeholder="?" autoFocus onKeyUp={ this.handleKeyUp } size="large" value={ this.state.input} /></span>
              </center>
          </div>

          
        </div>
      </div>
    );
  }
}

export default App;

