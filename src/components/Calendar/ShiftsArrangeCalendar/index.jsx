import React, { useEffect, useRef, createRef } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { Spin } from 'antd';
import SmartCalendar, { CalendarDraggable } from '@/common/SmartCalendar';

const items = { title: '部门会议x', start: '2020-10-08' };
const items2 = {
  title: '部门会议x',
  start: '2020-10-09',
  display: 'background',
};
const calendarEvents = [
  items,
  items,
  items,
  items,
  // items2
];

const ShiftsArrangeCalendar = props => {
  console.log(' ShiftsArrangeCalendar   props, ,   ： ', props);

  const eventClick = info => {
    console.log(' eventClick   info,   ： ', info);
    const items = { title: '部门会议x', start: new Date() };
    calendarEvents.push(items);
    // console.log('  calendarEvents ：', calendarEvents);
    // info.el.style.borderColor = 'red';
  };
  const select = params => {
    console.log(' select   ,   ： ', params);
  };
  const eventsSet = params => {
    console.log(' eventsSet   ,   ： ', params);
    props.eventsSet(params);
  };
  const eventDrop = params => {
    console.log(' eventDrop   ,   ： ', params);
  };

  return (
    <div className="shiftsArrangeCalendar ">
      <Spin
        className={''}
        size="large"
        spinning={props.loading}
        tip="请求发送中，请稍等..."
      >
        <SmartCalendar
          // events={calendarEvents}
          editable={false}
          events={props.data}
          select={select}
          eventClick={eventClick}
          eventsSet={eventsSet}
          eventDrop={eventDrop}
        />
      </Spin>
    </div>
  );
};

ShiftsArrangeCalendar.defaultProps = {
  data: calendarEvents,
  eventsSet: () => {},
};

ShiftsArrangeCalendar.propTypes = {
  data: PropTypes.array,
  eventsSet: PropTypes.func,
};

export default ShiftsArrangeCalendar;
