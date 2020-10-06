import React from 'react';
import './style.less';
import { Form, Input } from 'antd';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

let matchList = [
  {
    id: '1',
    name: '第一个任务',
    startTime: "2019-12-02 13:22:05",
    endTime: "2019-12-02 15:38:05",
    repeatExecute: false,
  },
  {
    id: '2',
    name: '第二个任务',
    startTime: "2019-12-05 09:45:23",
    endTime: "2019-12-05 15:10:23",
    repeatExecute: false,
  },
  {
    id: '3',
    name: '第三个任务',
    startTime: "2019-12-07 15:37:18",
    endTime: "2019-12-07 19:43:18",
    repeatExecute: false,
  },
  {
    id: '4',
    name: '第四个任务',
    startTime: "2019-12-07 14:49:05",
    endTime: "2019-12-08 03:15:05",
    repeatExecute: false,
  },
];

let repeatMatchList = [
  {
    id: '5',
    name: '每周一，周三重复任务',
    startDate: "2019-12-10", // 任务创建于12月10日
    startTime: "09:10:00", // 每次任务的开始时间
    endTime: "17:30:23", // 每次任务的结束时间
    repeatDates: ["星期一", "星期三"],
    repeatExecute: true,
  },
  {
    id: '6',
    name: '每周二重复任务',
    startDate: "2019-12-02", // 任务创建于12月2日
    startTime: "15:10:00", // 每次任务的开始时间
    endTime: "17:30:23", // 每次任务的结束时间
    repeatDates: ["星期二"],
    repeatExecute: true,
  }
];



const FullCalendarCom = props => {
  console.log(' FullCalendarCom   props, ,   ： ', props);
  return (
    <div className="inputFormWrapper ">
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" 
        width={800}
        eventSources={[matchList, repeatMatchList]}
      />
    </div>
  );
};

export default FullCalendarCom;
