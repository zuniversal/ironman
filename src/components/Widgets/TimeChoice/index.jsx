import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const timeChoices = [
  // '今日',
  { text: '本周', type: 'week' },
  { text: '本月', type: 'month' },
  { text: '全年', type: 'year' },
];

//
const TimeChoice = props => {
  const [activeItem, setActiveItem] = useState(0);
  // console.log(' TimeChoice   ,   ： ', props, activeItem,   )
  const timeClick = (v, i) => {
    console.log(' timeClick   v, i,   ： ', activeItem, v, i);
    setActiveItem(i);
    props.onOptionChange({ type: v.type });
  };
  const onDayChange = (momentArr, timeArr) => {
    console.log(
      ' onDayChange   momentArr, timeArr, ,   ： ',
      activeItem,
      momentArr,
      timeArr,
    );
    // setActiveItem(i);
    const [start_time, end_time] = timeArr;

    props.onOptionChange({ start_time, end_time });
  };

  return (
    <div className={'extraWrapper dfc '}>
      <div className={'timeChoice'}>
        {props.config.map((v, i) => (
          <a
            key={i}
            onClick={() => timeClick(v, i)}
            className={`${activeItem === i ? 'active' : ''}`}
          >
            {v.text}
          </a>
        ))}
      </div>
      <RangePicker
        // showNow
        // showTime
        // showToday
        onChange={onDayChange}
      />
    </div>
  );
};

TimeChoice.defaultProps = {
  config: timeChoices,
};

TimeChoice.propTypes = {
  config: PropTypes.array,
};

export default TimeChoice;
