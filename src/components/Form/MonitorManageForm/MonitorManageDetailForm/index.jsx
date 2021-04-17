import React, { useState } from 'react';
import './style.less';
import { Divider, Radio } from 'antd';
import SmartForm from '@/common/SmartForm';
import MonitorManageForm from '@/components/Form/MonitorManageForm';
import { PRIMARY } from '@/constants';

const formLayouts = {
  labelCol: {
    sm: { span: 3 }, //
  },
  wrapperCol: {
    sm: { span: 21 }, //
  },
};

const radioOptions = [
  { label: 'A相', value: 'A相' },
  { label: 'B相', value: 'B相' },
  { label: 'C相', value: 'C相' },
];

const voltageConfig = [
  {
    key: '总功率',
    label: '总功率',
  },
  {
    key: '环境温度',
    label: '环境温度',
  },
  {
    key: '环境温度',
    label: '环境温度',
  },
  {
    key: '电网频率',
    label: '电网频率',
  },
  {
    key: '有功需量',
    label: '有功需量',
  },
  {
    key: '有功需量',
    label: '有功需量',
  },
  {
    key: '感性无功电度',
    label: '感性无功电度',
  },
  {
    key: '容性无功电度',
    label: '容性无功电度',
  },
];

const positionConfig = [
  {
    key: '',
    label: '有功需量',
  },
  {
    key: '',
    label: '有功需量',
  },
  {
    key: '',
    label: '有功需量',
  },
  {
    key: '',
    label: '有功需量',
  },
  {
    key: '',
    label: '有功需量',
  },
];

const ListCom = props => {
  const { config, data } = props;
  return config.map((v, i) => (
    <div className={`row`} key={i}>
      <div className="left">
        {/* {data[v.key]} */}
        {v.label}
      </div>
      <div className="center">{v.label}</div>
      <div className="right">
        <div className="statusTag">正常</div>
      </div>
    </div>
  ));
};

const MonitorManageDetailForm = props => {
  console.log(' MonitorManageDetailForm ： ', props);
  const [checkItem, setCheckItem] = useState('A相');

  const { formBtn, ...rest } = props;

  const config = [
    {
      formType: 'TextArea',
      itemProps: {
        label: '处理信息',
        name: '',
      },
      comProps: {
        className: 'w-280',
      },
    },
  ];

  return (
    <div className="monitorManageDetailForm">
      <div className={`leftForm`}>
        <MonitorManageForm isInsertForm action={'detail'}></MonitorManageForm>
      </div>

      {/* <Divider type="vertical" /> */}
      {/* <div className="divider"></div> */}

      <div className="infoList">
        <div className="titleTag">在线 | 低压总开关</div>
        <div className="listWrapper">
          {/* {voltageConfig.map((v, i) => )} */}
          <ListCom data={{}} config={voltageConfig}></ListCom>
          {/* {voltageConfig.map((v, i) => <div className={`row`} key={i}>
            <div className="left">
              {v.label}
            </div>
            <div className="center">
              {v.label}
            </div>
            <div className="right">
              <div className="statusTag">
                正常
              </div>
            </div>
          </div>)} */}

          <Radio.Group
            options={radioOptions}
            onChange={e => {
              console.log(' e.target.value ： ', e.target.value);
              // setCheckItem
            }}
            value={checkItem}
            optionType="button"
            buttonStyle="solid"
            className={`radioGroup`}
          />
          <ListCom data={{}} config={positionConfig}></ListCom>
        </div>
      </div>
    </div>
  );
};

MonitorManageDetailForm.defaultProps = {
  init: {},
};

export default MonitorManageDetailForm;
