import React from 'react';
import './style.less';
import icon1 from '@/static/assets/cs/electric1.png';
import icon2 from '@/static/assets/cs/electric2.png';
import icon3 from '@/static/assets/cs/electric3.png';
import icon4 from '@/static/assets/cs/electric4.png';
import icon5 from '@/static/assets/cs/electric5.png';
import icon6 from '@/static/assets/cs/electric6.png';
import icon7 from '@/static/assets/cs/electric7.png';
import { voltageLevelMap, billTypeMap } from '@/configs';
import useHttp from '@/hooks/useHttp';
import { formatSelectList } from '@/utils';
import { getList as getBillTypeList } from '@/services/electricBill';

const statConfig = [
  [
    {
      title: '电价类型',
      dataKey: 'type',
      content: '',
      icon: icon1,
    },
    {
      title: '计费方式',
      dataKey: 'billing_method',
      content: '',
      icon: icon2,
      dataMap: billTypeMap,
    },
  ],
  [
    {
      title: '电压器容量',
      dataKey: 'transformer_capacity',
      content: '',
      icon: icon3,
    },
    {
      title: '实际容量',
      dataKey: 'real_capacity',
      content: '',
      icon: icon4,
    },
  ],
  [
    {
      title: '电压等级',
      dataKey: 'voltage_level',
      content: '',
      icon: icon5,
      dataMap: voltageLevelMap,
    },
    {
      title: '电功率考核因数',
      dataKey: 'ep_factor',
      content: '',
      icon: icon6,
    },
  ],
  [
    {
      title: '托管电站数',
      dataKey: '',
      content: '',
      icon: icon7,
    },
  ],
];

const StatBoxItem = props => {
  const val = props.data[props.dataKey];
  const content = props.data
    ? props.dataMap
      ? props.dataMap[val]
      : val
    : null;

  return (
    <div className={`statBoxItem `}>
      <div className="left">
        <div className="title">{props.title}</div>
        <div className="subTitle">{content}</div>
      </div>
      <div className="right">
        <img src={props.icon} className="icon" />
      </div>
    </div>
  );
};

StatBoxItem.defaultProps = {
  data: {},
};

const StatBox = props => {
  console.log(
    ' %c StatBox 组件 this.state, this.props ： ',
    `color: #333; font-weight: bold`,
    props,
  ); //
  // const { data: electricBillList,  } = useHttp(
  //   getBillTypeList,
  //   {
  //     format: res => formatSelectList(res, ).map(v => {
  //         const { deleted, is_summer, ...rest } = v;
  //         return rest;
  //       }),
  //   },
  // );
  // console.log(' electricBillList ： ', electricBillList,  )//

  return (
    <div className="statBoxWrapper">
      {statConfig.map((v, i) => (
        <div className="statBoxCol" key={i}>
          {v[0] && <StatBoxItem {...props} {...v[0]}></StatBoxItem>}
          {v[1] && <StatBoxItem {...props} {...v[1]}></StatBoxItem>}
        </div>
      ))}
    </div>
  );
};

StatBox.defaultProps = {};

export default StatBox;
