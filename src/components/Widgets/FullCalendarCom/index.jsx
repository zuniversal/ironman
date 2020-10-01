import React from 'react';
import './style.less';
import { Form, Input } from 'antd';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const FullCalendarCom = props => {
  console.log(' FullCalendarCom   props, ,   ： ', props);
  return (
    <div className="inputFormWrapper ">
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
    </div>
  );
};

export default FullCalendarCom;
