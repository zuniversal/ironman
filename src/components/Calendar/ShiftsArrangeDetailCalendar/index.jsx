import React, { useEffect, useRef, createRef } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { Form, Input, Checkbox, Button } from 'antd';
import SmartCalendar, {
  CalendarDraggable,
  dayCellContent,
  formatDay,
} from '@/common/SmartCalendar'; //
import moment from 'moment'; //
import business from 'moment-business';

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

const weekendArr = ['Sat', 'Sun'];

const isWeekend = date => {
  // console.log(' isWeekend   date,   ： ', date  )
  return weekendArr.includes(`${date}`.slice(0, 3));
};

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

const calendarRef = React.createRef();

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
    props.eventsSet(params);
  };
  const eventDrop = params => {
    console.log(' eventDrop   ,   ： ', params);
  };

  console.log(' calendarRef ： ', calendarRef, moment().get('month')); //

  return (
    <div className="shiftsArrangeDetailCalendar ">
      {/* <Button onClick={() => () => console.log(' handleCancel   ,   ： ', calendarRef  )}>取消</Button> */}
      <SmartCalendar
        // events={calendarEvents}
        events={props.data}
        calendarRef={calendarRef}
        select={select}
        eventClick={eventClick}
        eventsSet={eventsSet}
        eventDrop={eventDrop}
        dayCellContent={params => {
          //
          // console.log(
          //   ' onChange    params ： ',
          //   params,
          //   formatDay(params),
          //   params.date,
          // ); //
          return (
            <div className={`fsb`}>
              {dayCellContent(params)}
              <Checkbox
                checked={
                  props.selectData.some(v => v == formatDay(params)) &&
                  !params.isOther
                }
                day={formatDay(params)}
                isWeekend={isWeekend(params.date)}
                onChange={props.onCheck}
              ></Checkbox>
            </div>
          );
        }}
      />
    </div>
  );
};

ShiftsArrangeDetailCalendar.defaultProps = {
  data: [],
  // data: calendarEvents,
  eventsSet: () => {},
};

ShiftsArrangeDetailCalendar.propTypes = {
  data: PropTypes.array,
  eventsSet: PropTypes.func,
};

export default ShiftsArrangeDetailCalendar;
