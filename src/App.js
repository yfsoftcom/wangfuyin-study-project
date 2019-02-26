import React, { Component } from 'react';
import {  Button, Dialog, Message, Tabs, Table } from 'element-react';
import _ from 'lodash';
import 'element-theme-default';

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
      timer: '00:00:00',
      startDialogVisible: true,
      stopDialogVisible: false,
      endTime: undefined,
      totalTime: 15,
      input: '',
      recordColumns: [
        {
          label: "SID",
          prop: "sid"
        },
        {
          label: "题干",
          render: function(data){
            console.log(data)
            const { num1, op, num2 } = data;
            return (<span>
              `${ num1 } ${ op } ${ num2 }`
            </span>)
          }
        },
        {
          label: "输入",
          prop: "input"
        },
        {
          label: "答案",
          prop: "answer"
        },
        {
          label: "结果",
          prop: "result"
        },
        {
          label: "用时(s)",
          prop: "cost"
        }
      ],
    }
    this.flagTime = 0;
    
    
    
  }

  componentDidMount(){
    
    
  }

  showTime = () => {
    if(this.state.endTime <= _.now()){
      // end
      this.stop();
      return;
    }
    const delta = parseInt((this.state.endTime - _.now()) / 1000);
    const mins = parseInt(delta/60).toFixed(0);
    const seds = parseInt(delta%60).toFixed(0);
    this.setState({
      timer: `00:${ _.padStart(mins, 2, '0') }:${ _.padStart(seds, 2, '0') }` ,    
    })    
  }

  stop = () => {
    this.setState({
      canNext: false,
      stopFlag: true,
      stopDialogVisible: true,
    })
  }

  start = () => {
    this.setState({ stopFlag: false, startDialogVisible: false, endTime: _.now() + (1000 * this.state.totalTime * 60 - 1) }, () => {
      this.showTime();
      this.reset();
      setInterval(() => {
        this.showTime();
      }, 1000)

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
    if(e.keyCode === 8){
      // backspace
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
  render() {
    console.log(this.state.records)
    return (
      <div className="container">
        <h1>口算练习 <div className="pull-right" style={ { fontSize: "14px"}}>{ this.state.timer }</div></h1>
        <Dialog
          title="提示"
          size="tiny"
          visible={ this.state.startDialogVisible }
          onCancel={ () => {} }
          closeOnClickModal= { false }
        >
          <Dialog.Body>
            <span>准备开始了么？</span>
            <p>提示: 按回车键可以快速进行下一题</p>
          </Dialog.Body>
          <Dialog.Footer className="dialog-footer">
            <Button type="primary" onClick={ this.start }>开始</Button>
          </Dialog.Footer>
        </Dialog>

        <Dialog
          title="提示"
          size="tiny"
          visible={ this.state.stopDialogVisible }
          onCancel={ () => {} }
          closeOnClickModal= { false }
        >
          <Dialog.Body>
            <span>已经做了{this.state.totalTime}分钟了，休息一下吧!</span>
          </Dialog.Body>
          <Dialog.Footer className="dialog-footer">
            <Button type="primary">嗯</Button>
          </Dialog.Footer>
        </Dialog>

        <div className="grid-content bg-purple">
          <h5>{ this.state.sid}. </h5>
            <center>
              <span className="question">{ this.state.num1 } - { this.state.num2 }  = </span>
              <span className="answer"><input ref="answerInput" onChange={ this.onInputChange} placeholder="?" autoFocus onKeyUp={ this.handleKeyUp } size="large" value={ this.state.input} /></span>
            </center>
        </div>

        <Tabs type="border-card" activeName="1" style={{ marginTop: "6em"}}>
          <Tabs.Pane label="正确率" name="1" style={{ overflow: "auto", height: "10em"}}>
            <p>{this.state.counter.ok}/{this.state.counter.total}</p>
          </Tabs.Pane>
          <Tabs.Pane label="记录" name="2">
            <div style={{ overflow: "auto", height: "10em"}}>
              <table>
              {
                _.map(this.state.records, (record, index) => {
                  return (
                    <tr>
                      <td>{record.sid}</td>
                    </tr>
                  )
                })
              }
              </table>
              <Table
                style={{width: '100%'}}
                columns={this.state.recordColumns}
                data={this.state.records}
                stripe={true}
              />
            </div>
          </Tabs.Pane>
          <Tabs.Pane label="统计" name="3" style={{ overflow: "auto", height: "10em"}}>
            <p> ？？ </p>
          </Tabs.Pane>
        </Tabs>
      </div>
    );
  }
}

export default App;
