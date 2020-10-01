import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const timeChoices = ['今日', '本周', '本月', '全年'];

//
const TimeChoice = () => {
  const [active, setActive] = useState(0);
  // console.log(' TimeChoice   ,   ： ', active,   )
  const timeClick = (v, i) => {
    console.log(' timeClick   v, i,   ： ', active, v, i);
    setActive(i);
  };

  return (
    <div className={'extraWrapper dfc '}>
      <div className={'timeChoice'}>
        {timeChoices.map((v, i) => (
          <a
            key={i}
            onClick={() => timeClick(v, i)}
            className={`${active === i ? 'active' : ''}`}
          >
            {v}
          </a>
        ))}
      </div>
      <RangePicker />
    </div>
  );
};

TimeChoice.defaultProps = {};

TimeChoice.propTypes = {};

export default TimeChoice;
