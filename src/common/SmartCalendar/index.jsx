import React, { useEffect, useRef, createRef } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { Form, Button } from 'antd';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
// import "@fullcalendar/core/main.css";
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import DragCom from '@/common/SmartCalendar/CalendarDraggable';
import { ANIMATE } from '@/constants';
const { bounceIn } = ANIMATE;

export const CalendarDraggable = DragCom;

export const formatDay = data => `${data.dayNumberText}`.split('日')[0];
export const dayCellContent = data => (
  <div className={`dayText`}>{formatDay(data)}</div>
);

const toolBar = {
  header: {
    // 上一年，上一月，下一月，下一年 今天(逗号为紧相邻，空格为有间隙，不写哪个就不展示哪个按钮)
    left: 'prevYear,prev,next,nextYear today',
    // 默认显示当前年月
    center: 'title',
    // 右侧月 周 天切换按钮
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },
  buttonText: {
    prev: '上个月',
    next: '下个月',
    today: '今天',
    month: '月',
    week: '周',
    day: '天',
  },
};

const calendarRef = React.createRef();
const SmartCalendar = React.forwardRef((props, ref) => {
  console.log(' SmartCalendar   props, ,   ： ', props);

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

  return (
    <div className={`smartCalendar ${props.className}`}>
      {/* <Button onClick={() => () => console.log(' handleCancel   ,   ： ', calendarRef  )}>取消</Button> */}
      <FullCalendar
        ref={props.calendarRef}
        // {...toolBar}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable
        droppable
        selectable
        selectHelper
        fixedWeekCount
        locale="zh-cn"
        allDayText="全天"
        title={''}
        // dayMaxEvents={0}
        // moreLinkContent={params => {
        //   console.log(' paramsparams ： ', params);
        //   return 'xxx';
        // }}
        moreLinkContent={'...'}
        // eventContent={(params) => { console.log(' eventContent params ： ', params,  ); return 'xxx'  }}// 有事件的显示内容
        // showNonCurrentDates={false}
        dayCellContent={dayCellContent}
        dayCellClassNames={`dayCellClassNames ${props.dayCellClassNames} ${ANIMATE.bounceIn}`}
        eventClassNames={`eventClassNames ${props.eventClassNames} ${bounceIn}`}
        slotLabelClassNames={'slotLabelClassNames'}
        moreLinkClassNames={'moreLinkClassNames'}
        dayHeaderClassNames={'dayHeaderClassNames'}
        // aspectRatio={11/13}
        dayHeaderFormat={{ weekday: 'short' }}
        // calendarEvents={calendarEvents}
        // eventSources={[matchList, repeatMatchList]}
        // eventSources={[matchList, ]}
        // eventSources={[repeatMatchList]}
        // events={events}
        {...props}
      />
    </div>
  );
});

SmartCalendar.defaultProps = {
  dayMaxEvents: 3,
  eventsSet: () => {},
  dayCellClassNames: '',
  eventClassNames: '',
};

SmartCalendar.propTypes = {
  dayMaxEvents: PropTypes.number,
  eventsSet: PropTypes.func,
};

export default SmartCalendar;
