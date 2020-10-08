import React, { useEffect, useRef, createRef } from 'react';
import './style.less';
import { Form, Input } from 'antd';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
// import "@fullcalendar/core/main.css";
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

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
const calendarEvents = [items, items, items, items, items2];

const handleEventClick = info => {
  console.log(' handleEventClick   info,   ： ', info);
  const items = { title: '部门会议x', start: new Date() };
  calendarEvents.push(items);
  // console.log('  calendarEvents ：', calendarEvents);
  info.el.style.borderColor = 'red';
};
const handleDateSelect = params => {
  console.log(' handleDateSelect   ,   ： ', params);
};
const eventsSet = params => {
  console.log(' eventsSet   ,   ： ', params);
};
const eventDrop = params => {
  console.log(' eventDrop   ,   ： ', params);
};

const ShiftsArrangeList = props => {
  console.log(
    ' %c ShiftsArrangeList 组件 props ： ',
    `color: #333; font-weight: bold`,
    props,
  );

  const domRef = React.createRef();
  useEffect(() => {
    // Cannot read property 'addEventListener' of null 如果没有该容器节点 会导致监听失败
    let draggableEl = document.getElementById('dataListWrapper');
    console.log(' eventEleventEl 2： ', draggableEl, domRef); //
    new Draggable(draggableEl, {
      itemSelector: '.dragItem',
      eventData: function(eventEl) {
        let title = eventEl.getAttribute('title');
        let id = eventEl.getAttribute('data');
        let color = eventEl.getAttribute('color');
        let display = eventEl.getAttribute('display');
        console.log(' eventEleventEl  ： ', eventEl, title, id, color, display); //
        return {
          title: eventEl.innerText,
          id: id,
          display: display,
          color: color,
        };
      },
    });
  }, []);

  return (
    <div id="dataListWrapper" ref={domRef}>
      <div className="titleRow primaryBorderBottom fsb">
        <div>电站</div>
        <div>剩余/总巡检数量</div>
      </div>
      {datas.map((event, index) => (
        <div key={event.id} className="fsb rowItem ">
          <div className={'left'}>
            <div className="dragItem ">{event.team}</div>
            <div>{event.client}</div>
          </div>
          <div>
            {event.residue}/{event.all}
          </div>
        </div>
      ))}
    </div>
  );
};

const FullCalendarCom = props => {
  console.log(' FullCalendarCom   props, ,   ： ', props);
  const cusRef = useRef();

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
    <div className="calendarWrapper ">
      {/* <Draggable  eventData={{
        title: 'my event',
        duration: '02:00'
      }} ></Draggable> */}

      <FullCalendar
        ref={cusRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        width={800}
        editable
        droppable
        locale="zh-cn"
        header={{
          // 上一年，上一月，下一月，下一年 今天(逗号为紧相邻，空格为有间隙，不写哪个就不展示哪个按钮)
          left: 'prevYear,prev,next,nextYear today',
          // 默认显示当前年月
          center: 'title',
          // 右侧月 周 天切换按钮
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        buttonText={{
          prev: '上个月',
          next: '下个月',
          today: '今天',
          month: '月',
          week: '周',
          day: '天',
        }}
        dayMaxEvents={3}
        // moreLinkContent={(params) => { console.log(' params ： ', params,  ) return 'xxx'  }}
        moreLinkContent={'...'}
        fixedWeekCount
        // eventContent={(params) => { console.log(' eventContent params ： ', params,  ); return 'xxx'  }}// 有事件的显示内容
        // showNonCurrentDates={false}
        dayCellContent={params => {
          console.log(' dayCellContent params ： ', params);
          return `${params.dayNumberText}`.split('日')[0];
        }}
        dayCellClassNames={'dayCellClassNames'}
        eventClassNames={'eventClassNames'}
        slotLabelClassNames={'slotLabelClassNames'}
        moreLinkClassNames={'moreLinkClassNames'}
        // aspectRatio={11/13}

        dayHeaderFormat={{ weekday: 'short' }}
        allDayText="全天"
        selectable
        selectHelper
        eventClick={handleEventClick}
        // calendarEvents={calendarEvents}
        // eventSources={[matchList, repeatMatchList]}
        // eventSources={[matchList, ]}
        // eventSources={[repeatMatchList]}
        events={calendarEvents}
        select={handleDateSelect}
        eventsSet={eventsSet}
        eventDrop={eventDrop}
      />

      <ShiftsArrangeList></ShiftsArrangeList>
    </div>
  );
};

export default FullCalendarCom;
