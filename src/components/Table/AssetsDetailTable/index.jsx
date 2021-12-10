import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import SmartTable from '@/common/SmartTable';
import { ImgBlock } from '@/components/Temp';

const AssetsDetailTable = props => {
  const { showModal, edit, remove, tdClick, data } = props;

  const columns1 = [
    {
      title: '设备编号',
      dataIndex: 'code',
    },
    {
      title: '设备名称',
      dataIndex: 'name',
    },
    {
      title: '变压容量',
      dataIndex: 'transformer_capacity',
    },
  ];

  const columns2 = [
    {
      title: '所属客户',
      dataIndex: 'customer',
      render: (text, record, index) => (
        <a onClick={() => tdClick({ action: 'detail' })}>{text}</a>
      ),
    },
    {
      title: '户号',
      dataIndex: 'electricity_user',
      render: (text, record, index) => (
        <a onClick={() => tdClick({ action: 'detail' })}>{text}</a>
      ),
    },
    {
      title: '电站',
      dataIndex: 'station',
      render: (text, record, index) => (
        <a onClick={() => tdClick({ action: 'detail' })}>{text}</a>
      ),
    },
  ];

  const deviceCol1 = [
    {
      title: '设备',
      dataIndex: 'name',
      render: (text, record, index) => (
        <a onClick={() => tdClick({ action: 'detail' })}>{text}</a>
      ),
    },
    {
      title: '设备类型',
      dataIndex: 'type',
    },
    {
      title: '制造厂家',
      dataIndex: 'factory',
    },
    {
      title: '设备型号',
      dataIndex: 'model',
    },
    {
      title: '额定电压',
      dataIndex: 'voltage',
    },
    {
      title: '额定电流',
      dataIndex: 'electricity',
    },
    {
      title: '出厂编号',
      dataIndex: 'code',
    },
    {
      title: '出厂日期',
      dataIndex: 'production_date',
    },
  ];

  const deviceCol2 = [
    {
      title: '设备',
      dataIndex: 'name',
      render: (text, record, index) => (
        <a onClick={() => tdClick({ action: 'detail' })}>{text}</a>
      ),
    },
    {
      title: '设备类型',
      dataIndex: 'type',
    },
    {
      title: '制造厂家',
      dataIndex: 'manufacturer',
    },
    {
      title: '设备型号',
      dataIndex: 'model',
    },
    {
      title: '额定电流',
      dataIndex: 'electricity',
    },
    {
      title: '分合闸电压',
      dataIndex: '',
    },
    {
      title: '出厂编号',
      dataIndex: 'code',
    },
    {
      title: '出厂日期',
      dataIndex: 'production_date',
    },
    {
      title: '变比',
      dataIndex: '',
    },
    {
      title: '精准度',
      dataIndex: '',
    },
  ];

  const deviceCol3 = [
    {
      title: '设备',
      dataIndex: 'name',
      render: (text, record, index) => (
        <a onClick={() => tdClick({ action: 'detail' })}>{text}</a>
      ),
    },
    {
      title: '设备类型',
      dataIndex: 'type',
    },
    {
      title: '制造厂家',
      dataIndex: 'manufacturer',
    },
    {
      title: '设备型号',
      dataIndex: 'model',
    },
    {
      title: '变比',
      dataIndex: '',
    },
    {
      title: '精准度',
      dataIndex: '',
    },
    {
      title: '额定二次容量',
      dataIndex: '',
    },
    {
      title: '出厂编号',
      dataIndex: 'code',
    },
  ];

  const infoCols = [
    columns1,
    // columns1
  ];

  const deviceCols = [
    deviceCol1,
    // deviceCol2, deviceCol3
  ];

  const showQRCode = e => {
    console.log(' showQRCode   e, ,   ： ', e);
  };

  return (
    <div className={'assetsDetailTable'}>
      {infoCols.map((v, i) => (
        <SmartTable
          key={i}
          columns={v}
          // dataSource={noCalculateList}
          // rowKey={'source_no'}
          isQRCode
          rowLength={1}
          noActionCol
          pagination={false}
          className={'noThLine noMargin '}
          dataSource={[data]}
          rowSelection={null}
          {...props}
        ></SmartTable>
      ))}

      <div className="imgWrapper">
        <div className="label">铭牌</div>
        {/* <ImgBlock>电气图</ImgBlock> */}
        <img src={props.data.file} className={`imgBlock`} />
      </div>

      {deviceCols.map((v, i) => (
        <div className="deviceTableWrapper" key={i}>
          <div className="title">设备{i + 1}</div>
          <SmartTable
            columns={v}
            // dataSource={noCalculateList}
            // rowKey={'source_no'}
            isQRCode
            // rowLength={1}
            noActionCol
            pagination={false}
            dataSource={data.list}
            rowSelection={null}
            {...props}
          ></SmartTable>
        </div>
      ))}
    </div>
  );
};

AssetsDetailTable.defaultProps = {
  tdClick: () => {},
  data: {},
};

export default AssetsDetailTable;
