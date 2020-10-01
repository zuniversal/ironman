import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { DatePicker } from 'antd';
import SmartEcharts from '@/common/SmartEcharts'; //
import TimeChoice from '@/components/Widgets/TimeChoice';

const legend = ['趋势'];

const xAxis = [
  '10月',
  '11月',
  '12月',
  '01月',
  '02月',
  '03月',
  '04月',
  '05月',
  '06月',
  '07月',
  '08月',
  '09月',
];

const CsHomeStatEcharts = props => {
  return (
    <div className="">
      <div className="fsb csHomeStatEcharts">
        <div className={'title'}>电站实时信息</div>
        <TimeChoice></TimeChoice>
      </div>

      <SmartEcharts
        data={[]}
        type="line"
        legend={legend}
        xAxis={xAxis}
        noToolBox
        {...props}
      ></SmartEcharts>
    </div>
  );
};

CsHomeStatEcharts.defaultProps = {};

CsHomeStatEcharts.propTypes = {};

export default CsHomeStatEcharts;
