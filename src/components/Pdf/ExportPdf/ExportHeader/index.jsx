import React from 'react';
import './style.less';
import ReactDOM from 'react-dom';
import { Button } from 'antd';

const ExportHeader = props => {
  console.log(' ExportHeader ： ', props); //
  const { goBack } = props; //
  const print = () => {
    console.log(' printprintprint   ,   ： ');
    props.print();
  };
  return (
    <div className="fsb header">
      <Button onClick={goBack}>返回列表</Button>
      <Button type="primary" onClick={print}>
        导出报告
      </Button>
    </div>
  );
};

ExportHeader.defaultProps = {};

export default ExportHeader;
