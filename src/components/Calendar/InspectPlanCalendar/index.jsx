import React, { useEffect, useRef, createRef } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { Form, Input } from 'antd';
import SmartCalendar, {
  CalendarDraggable,
  dayCellContent,
} from '@/common/SmartCalendar'; //
import { ANIMATE } from '@/constants'; //
import { CloseOutlined } from '@ant-design/icons';

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

const items = { title: '部门会议x', start: '2020-11-08' };
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

const ShiftsArrangeList = props => {
  console.log(
    ' %c ShiftsArrangeList 组件 props ： ',
    `color: #333; font-weight: bold`,
    props,
  );
  const { className } = props; //

  return (
    <CalendarDraggable
      className={`${className} `}
      itemSelector={'.dragItem'}
      // renderItem={(event, index) => (
      //   <div key={event.id} className="fsb rowItem ">
      //   </div>
      // )
    >
      <>
        <div className="titleRow primaryBorderBottom fsb absoulte">
          <div>电站</div>
          <div>剩余/总巡检数量</div>
        </div>
        <div className="titleRow primaryBorderBottom fsb">
          <div>电站</div>
          <div>剩余/总巡检数量</div>
        </div>
        {props.events
          .filter(v => v.surplus_plan_num > 0)
          .map((event, index) => {
            // console.log(' CalendarDraggable event ： ', event,)//
            return (
              <div key={event.id} className="fsb rowItem ">
                <div className={'left'}>
                  {/* {true && ( */}
                  {event.surplus_plan_num > 0 && (
                    <div
                      className="dragItem "
                      id={event.id}
                      url={event.surplus_plan_num}
                      // data-isdraged={event.isdraged}
                      data-datas={event}
                      test={'zyb'}
                    >
                      {event.name}
                    </div>
                  )}
                  <div>客户-{event.customer}</div>
                </div>
                <div>
                  {event.surplus_plan_num} / {event.spect_plan_num}
                </div>
              </div>
            );
          })}
      </>
    </CalendarDraggable>
  );
};

ShiftsArrangeList.defaultProps = {
  unScheduleList: [],
};

ShiftsArrangeList.propTypes = {
  unScheduleList: PropTypes.array,
};

const calendarRef = React.createRef();

// const renderEventContent = (eventInfo) => {
//   console.log(' renderEventContent   ,   ： ',   )
//   return (
//     <div className={`eventWrapper`}  >
//       {eventInfo.event.title}
//       <CloseOutlined />
//     </div>
//   )
// }
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
    props.eventsSet(params);
  };
  const eventDrop = params => {
    console.log(' eventDrop   ,   ： ', params);
    // props.eventDrop(params);
  };
  const eventAdd = params => {
    console.log(' eventAdd   ,   ： ', params);
  };
  const eventRemove = params => {
    console.log(' eventRemove   ,   ： ', params);
  };
  const eventChange = params => {
    console.log(' eventChange   ,   ： ', params);
  };

  console.log(' cusRef ： ', cusRef, calendarRef); //

  return (
    <div className="inspectPlanCalendar ">
      <SmartCalendar
        // events={calendarEvents}

        // initialDate={new Date(2020, 9, 1)}
        // className={`${ANIMATE.slideInLeft} `}
        calendarRef={calendarRef}
        validRange={nowDate => {
          return {
            start: nowDate,
          };
        }}
        events={props.scheduleList}
        select={select}
        eventClick={eventClick}
        eventsSet={eventsSet}
        eventDrop={eventDrop}
        eventAdd={eventAdd}
        // eventRemove={eventRemove}
        eventChange={eventChange}
        initialDate={props.initialDate}
        eventContent={eventInfo => (
          <div className={`eventWrapper`}>
            {eventInfo.event.title}
            <CloseOutlined onClick={props.remove} />
          </div>
        )}
        eventOverlap={false}
        // dayCellContent={}
      />

      <ShiftsArrangeList
        events={props.unScheduleList}
        // className={`${ANIMATE.slideInRight} `}
      ></ShiftsArrangeList>
    </div>
  );
};

InspectPlanCalendar.defaultProps = {
  scheduleList: [],
  eventsSet: () => {},
};

InspectPlanCalendar.propTypes = {
  scheduleList: PropTypes.array,
  eventsSet: PropTypes.func,
};

export default InspectPlanCalendar;
