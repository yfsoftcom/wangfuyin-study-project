import React, { Component } from 'react';
import { Icon } from 'element-react';
import _ from 'lodash';
import 'element-theme-default';

import '../App.css';

export default class extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
    this.recordColumns = [
      {
        label: "SID",
        prop: "sid"
      },
      {
        label: "题干",
        render: function(data){
          const { num1, op, num2 } = data;
          return (<span>
            {`${ num1 } ${ op } ${ num2 }` }
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
        prop: "result",
        render: function(data){
          const { result } = data;
          return (<span>
            {result? <Icon name={ 'check'} />: <Icon name={ "close" } /> }
          </span>)
        }
      },
      {
        label: "用时(s)",
        prop: "cost"
      }
    ]
  }

  render() {
    const { records } = this.props;
    // let sortedArr = records;
    // if(_.size(records) > 0){
    //   // sort
    //   sortedArr = _.sortBy(records, [ 'result', 'cost'])
    //   console.log(sortedArr)
    // }
    return (
    <table style={ {width: '100%'}}>
      <thead>
      <tr style={ {background: '#eef1f6'}}>
        {
          _.map(this.recordColumns, (col, index) => {
            return (
              <th key={`col-${index}`}>{col.label}</th>
            )
          })
        }
      </tr>
      </thead>
      <tbody>
      {
        _.map(records, (record, index) => {
          return (
            <tr key={`col-${index}`}>{
              _.map(this.recordColumns, (col, i) => {
                const { render, prop } = col;
                if(_.isFunction(render)){
                  return <td style={ record.result ? styles.success: styles.error } key={`data-${index}-${i}`}><center>{ render(record, index) }</center></td>
                }
                return (
                  <td style={ record.result ? styles.success: styles.error } key={`col-${index}-${i}`}><center>{record[prop]}</center></td>
                )
              })
            }</tr>
          )
        })
      }
      </tbody>
    </table>
    )
  }

}

const styles = {
  success: {
    // background: '#13CE66',
    // color: 'white',
  },
  warning: {
    background: '#F7BA2A',
    color: '#fff',
  },
  error: {
    background: '#CC9999',
    color: '#fff',
  }
}