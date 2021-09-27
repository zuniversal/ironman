import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const timeChoices = [
  // '今日',
  // { text: '今天', type: 'day' },
  { text: '本周', type: 'week' },
  { text: '本月', type: 'month' },
  { text: '全年', type: 'year' },
];

//
const TimeChoice = props => {
  const [activeItem, setActiveItem] = useState(props.activeVal);
  console.log(' TimeChoice   ,   ： ', props, activeItem);
  const timeClick = (v, i) => {
    console.log(' timeClick   v, i,   ： ', activeItem, v, i, props);
    setActiveItem(i);
    props.onOptionChange(v);
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
      {!props.noPicker && (
        <RangePicker
          // showNow
          // showTime
          // showToday
          onChange={onDayChange}
        />
      )}
    </div>
  );
};

TimeChoice.defaultProps = {
  config: timeChoices,
  onOptionChange: () => {},
  activeVal: 0,
};

TimeChoice.propTypes = {
  config: PropTypes.array,
  onOptionChange: PropTypes.func,
};

export default TimeChoice;
