import React, { useEffect, useRef, createRef } from 'react';
import PropTypes from 'prop-types'
import './style.less';
import { Form, Input } from 'antd';
import SmartCalendar, {CalendarDraggable, } from '@/common/SmartCalendar'; //


let matchList = [
  {
    id: '1',
    title: '第一个任务',
    // startTime: '2019-12-02 13:22:05',
    // endTime: '2019-12-02 15:38:05',
    repeatExecute: false,
  },
  {
    id: '2',
    title: '第二个任务',
    // startTime: '2019-12-05 09:45:23',
    // endTime: '2019-12-05 15:10:23',
    repeatExecute: false,
  },
  {
    id: '3',
    title: '第三个任务',
    // startTime: '2019-12-07 15:37:18',
    // endTime: '2019-12-07 19:43:18',
    repeatExecute: false,
  },
  {
    id: '4',
    title: '第四个任务',
    // startTime: '2019-12-07 14:49:05',
    // endTime: '2019-12-08 03:15:05',
    repeatExecute: false,
  },
];

let repeatMatchList = [
  {
    id: '5',
    title: '每周一，周三重复任务',
    // startDate: '2019-12-10', // 任务创建于12月10日
    // startTime: '09:10:00', // 每次任务的开始时间
    // endTime: '17:30:23', // 每次任务的结束时间
    // repeatDates: ['星期一', '星期三'],
    // repeatExecute: true,
  },
  {
    id: '6',
    title: '每周二重复任务',
    // startDate: '2019-12-02', // 任务创建于12月2日
    // startTime: '15:10:00', // 每次任务的开始时间
    // endTime: '17:30:23', // 每次任务的结束时间
    // repeatDates: ['星期二'],
    // repeatExecute: true,
  },
];

const datas = [
  { client: '客户1', team: '电站1', id: '1', all: 4, residue: 3 },
  { client: '客户2', team: '电站2', id: '2', all: 4, residue: 3 },
  { client: '客户3', team: '电站3', id: '3', all: 4, residue: 3 },
  { client: '客户4', team: '电站4', id: '4', all: 4, residue: 3 },
  { client: '客户5', team: '电站5', id: '5', all: 4, residue: 3 },
];

const items = { title: '部门会议x', start: '2020-10-08' };
const items2 = {
  title: '部门会议x',
  start: '2020-10-09',
  display: 'background',
};
const calendarEvents = [items, items, items, items, 
  // items2
];


const ShiftsArrangeList = props => {
  console.log(
    ' %c ShiftsArrangeList 组件 props ： ',
    `color: #333; font-weight: bold`,
    props,
  );

  return (
    <CalendarDraggable 
      itemSelector={'.dragItem'}
      // renderItem={(event, index) => (
      //   <div key={event.id} className="fsb rowItem ">
      //   </div>
      // )
    >
      <>
        <div className="titleRow primaryBorderBottom fsb">
          <div>电站</div>
          <div>剩余/总巡检数量</div>
        </div>
        {datas.map((event, index) => {
          // console.log(' CalendarDraggable event ： ', event,  )// 
          return (
            <div key={event.id} className="fsb rowItem ">
              <div className={'left'}>
                <div className="dragItem ">{event.team}</div>
                <div>{event.client}</div>
              </div>
              <div>
                {event.residue}/{event.all}
              </div>
            </div>
          )
        })}
      </>
    </CalendarDraggable>
  );
};

const InspectPlanCalendar = props => {
  console.log(' InspectPlanCalendar   props, ,   ： ', props);
  const cusRef = useRef();

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



  const events = [
    {
      id: 1,
      title: 'Available hours +Studio',
      color: '#ffab91',
      display: 'block',
    },
    {
      id: 2,
      title: 'Available hours',
      color: '#ffff00',
      display: 'block',
    },
    {
      id: 3,
      title: 'Whole Day Event',
      color: '#76ff03',
      display: 'block',
    },
  ];
  console.log(' cusRef ： ', cusRef); //

  return (
    <div className="inspectPlanCalendar ">

      <SmartCalendar
        events={calendarEvents}
        
        select={select}
        eventClick={eventClick}
        eventsSet={eventsSet}
        eventDrop={eventDrop}
      />

      <ShiftsArrangeList></ShiftsArrangeList>
    </div>
  );
};

InspectPlanCalendar.defaultProps = {
  eventsSet: () => {},
};

InspectPlanCalendar.propTypes = {
  eventsSet: PropTypes.func,
};

export default InspectPlanCalendar;
