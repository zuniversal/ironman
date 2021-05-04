import React from 'react';
import './style.less';
// import icon1 from '@/static/assets/cs/electric1.png';
// import icon2 from '@/static/assets/cs/electric2.png';
// import icon3 from '@/static/assets/cs/electric3.png';
// import icon4 from '@/static/assets/cs/electric4.png';
// import icon5 from '@/static/assets/cs/electric5.png';
// import icon6 from '@/static/assets/cs/electric6.png';
// import icon7 from '@/static/assets/cs/electric7.png';

const statConfig = [
  [
    {
      title: '电价类型',
      key: '电价类型',
      content: '',
      // icon: icon1,
    },
    {
      title: '计费方式',
      key: '计费方式',
      content: '',
      // icon: icon2,
    },
  ],
  [
    {
      title: '电压器容量',
      key: '电压器容量',
      content: '',
      // icon: icon3,
    },
    {
      title: '实际容量',
      key: '实际容量',
      content: '',
      // icon: icon4,
    },
  ],
  [
    {
      title: '电压等级',
      key: '电压等级',
      content: '',
      // icon: icon5,
    },
    {
      title: '电功率考核因数',
      key: '电功率考核因数',
      content: '',
      // icon: icon6,
    },
  ],
  [
    {
      title: '托管电站数',
      key: '托管电站数',
      content: '',
      // icon: icon7,
    },
  ],
];

const StatBoxItem = props => {
  return (
    <div className={`statBoxItem `}>
      <div className="left">
        <div className="title">{props.title}</div>
        <div className="subTitle">{props.title}</div>
      </div>
      <div className="right">
        <img src={props.icon} className="icon" />
      </div>
    </div>
  );
};

const StatBox = props => {
  return (
    <div className="statBoxWrapper">
      {statConfig.map((v, i) => (
        <div className="statBoxCol" key={i}>
          {v[0] && <StatBoxItem {...v[0]}></StatBoxItem>}
          {v[1] && <StatBoxItem {...v[1]}></StatBoxItem>}
        </div>
      ))}
    </div>
  );
};

StatBox.defaultProps = {};

export default StatBox;
