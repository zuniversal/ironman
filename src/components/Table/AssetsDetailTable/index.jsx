import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './style.less';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Radio,
  Space,
  InputNumber,
} from 'antd';

import SmartTable from '@/common/SmartTable'; //
import { ImgBlock } from '@/components/Temp';


const AssetsDetailTable = props => {
  console.log(' AssetsDetailTable  ： ', props); //
  const { showModal, edit, remove, tdClick,    } = props; //

  const columns1 = [
    {
      title: '设备编号',
      render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
    },
    {
      title: '设备名称',
      render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
    },
    {
      title: '变压容量',
      render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
    },

  ];


  const columns2 = [
    {
      title: '所属客户',
      render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
    },
    {
      title: '户号',
      render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
    },
    {
      title: '电站',
      render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
    },
    
  ];

  const deviceCol1 = [
    {
      title: '设备',
      render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
    },
    {
      title: '设备类型',
    },
    {
      title: '制造厂家',
    },
    {
      title: '设备型号',
    },
    {
      title: '额定电压',
    },
    {
      title: '额定电流',
    },
    {
      title: '出厂编号',
    },
    {
      title: '出厂编号',
    },
  ];


  const deviceCol2 = [
    {
      title: '设备',
      render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
    },
    {
      title: '设备类型',
    },
    {
      title: '制造厂家',
    },
    {
      title: '设备型号',
    },
    {
      title: '额定电流',
    },
    {
      title: '分合闸电压',
    },
    {
      title: '出厂编号',
    },
    {
      title: '出厂编号',
    },
  ];



  const deviceCol3 = [
    {
      title: '设备',
      render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
    },
    {
      title: '设备类型',
    },
    {
      title: '制造厂家',
    },
    {
      title: '设备型号',
    },
    {
      title: '变比',
    },
    {
      title: '精准度',
    },
    {
      title: '额定二次容量',
    },
    {
      title: '出厂编号',
    },
  ]; 

  const infoCols = [
    columns1,
    columns1,
  ]
  

  const deviceCols = [
    deviceCol1,
    deviceCol2,
    deviceCol3,
  ]

  return (
    <div className={'assetsDetailTable'} >
      {infoCols.map((v, i) => <SmartTable
        key={i} 

        columns={v}
        // dataSource={noCalculateList}
        // rowKey={'source_no'}
        extra={
          <a onClick={() => tdClick({action: 'detail'})}>生成二维码</a>
        }
        rowLength={1}
        noActionCol
        pagination={false}
        className={'noThLine noMargin '} 
        {...props}
      ></SmartTable>)}

      <div className="imgWrapper">
        <div className="label">铭牌</div>
        <ImgBlock>
          电气图
        </ImgBlock>
      </div>


      {deviceCols.map((v, i) => <div className='deviceTableWrapper' key={i}   >
        <div className="title">
          设备{i + 1}
        </div>
        <SmartTable

          columns={v}
          // dataSource={noCalculateList}
          // rowKey={'source_no'}
          extra={
            <a onClick={() => tdClick({action: 'detail'})}>生成二维码</a>
          }
          rowLength={1}
          noActionCol
          pagination={false}
          {...props}
        ></SmartTable>
      </div>
      )}

    </div>
    
  );
};

AssetsDetailTable.defaultProps = {
  tdClick: () => {},
  
};

export default AssetsDetailTable;
