import React, { useEffect, useRef, createRef } from 'react';
import PropTypes from 'prop-types'
import './style.less';
import { Form, Input, Checkbox, } from 'antd';
import SmartCalendar, {CalendarDraggable, dayCellContent,  } from '@/common/SmartCalendar'; //


const items = { title: '部门会议x', start: '2020-10-08' };
const items2 = {
  title: '部门会议x',
  start: '2020-10-09',
  display: 'background',
};
const calendarEvents = [items, items, items, items, 
  // items2
];


// const CheckboxItem = (props,  ) => {
//   console.log(' CheckboxItem   ,   ： ', props,   )
//   return <Checkbox
//     checked={this.state.checked}
//     disabled={this.state.disabled}
//     onChange={this.onChange}
//   >
//     {label}
//   </Checkbox>
// }


const ShiftsArrangeDetailCalendar = props => {
  console.log(' ShiftsArrangeDetailCalendar   props, ,   ： ', props);

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
    props.eventsSet(params)
  };
  const eventDrop = params => {
    console.log(' eventDrop   ,   ： ', params);
  };
  const onChange = (data, ) => {
    console.log(' onChange   data, ,   ： ', data,   )
    
  }


  return (
    <div className="shiftsArrangeDetailCalendar ">

      <SmartCalendar
        // events={calendarEvents}
        events={props.data}
        
        select={select}
        eventClick={eventClick}
        eventsSet={eventsSet}
        eventDrop={eventDrop}
        dayCellContent={
          (params) => { 
            return <div className={`fsb`}  >
              {dayCellContent(params)}
              <Checkbox
                // checked={checked}
                onChange={onChange}
              >
              </Checkbox>
            </div>
          }
        }
      />

    </div>
  );
};

ShiftsArrangeDetailCalendar.defaultProps = {
  data: calendarEvents,
  eventsSet: () => {},
};

ShiftsArrangeDetailCalendar.propTypes = {
  data: PropTypes.array,
  eventsSet: PropTypes.func,
};

export default ShiftsArrangeDetailCalendar;
