import React, { useEffect, useRef, createRef } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { Input, Tooltip } from 'antd';
import SmartCalendar, {
  CalendarDraggable,
  dayCellContent,
} from '@/common/SmartCalendar'; //
import { ANIMATE, PRIMARY } from '@/constants'; //
import { CloseOutlined, BarsOutlined } from '@ant-design/icons';
import SmartInput from '@/common/SmartInput';

const { Search } = Input;

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

const ShiftsArrangeDetailList = props => {
  console.log(
    ' %c ShiftsArrangeDetailList 组件 props ： ',
    `color: #333; font-weight: bold`,
    props,
  );
  const { className, leftTitle, rightTitle, type } = props; //

  const Com = (
    <div className={`${className} `}>
      <div className="titleRow primaryBorderBottom fsb absoulte">
        <div>{leftTitle}</div>
        <div>{rightTitle}</div>
      </div>
      <div className="titleRow primaryBorderBottom fsb">
        <div>{leftTitle}</div>
        <div>{rightTitle}</div>
      </div>
      <div className="titleRow primaryBorderBottom fsb subTitle">
        {/* <div>电站({type === 0 ? '月检' : '日检'}){type === 0 ? '时间点' : ''}</div> */}
        <div>电站({0 === 0 ? '月检' : '日检'})</div>
      </div>
      {props.dayEvents
        // .filter(v => v.surplus_plan_num > 0)
        .map((event, index) => {
          // console.log(' ShiftsArrangeDetailList event ： ', event, event.station.inspection_type, )//
          return (
            <div key={event.station?.id} className="fsb rowItem ">
              <div className={'left'}>
                <div className={'top'}>电站-{event.station.name}</div>
                <div className={'bottom'}>
                  客户-{event.station.customer.name}
                </div>
              </div>
              <div>{props.renderRight(event)}</div>
            </div>
          );
        })}
      <div className="titleRow primaryBorderBottom fsb subTitle">
        {/* <div>电站({type === 0 ? '月检' : '日检'}){type === 0 ? '时间点' : ''}</div> */}
        <div>电站({1 === 0 ? '月检' : '日检'})</div>
        <div>{1 === 1 ? '时间点' : ''}</div>
      </div>
      {props.monthEvents
        // .filter(v => v.surplus_plan_num > 0)
        .map((event, index) => {
          // console.log(' ShiftsArrangeDetailList event ： ', event, event.station.inspection_type, )//
          return (
            <div key={event.station?.id} className="fsb rowItem ">
              <div className={'left'}>
                <div className={'top'}>电站-{event.station.name}</div>
                <div className={'bottom'}>
                  客户-{event.station.customer.name}
                </div>
              </div>
              <div className={''}>
                {event.station.inspection_time.map((v, i) => (
                  <div key={i} className={'timeBox'}>
                    {v}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );

  return <div className="leftWrapper">{Com}</div>;
};

ShiftsArrangeDetailList.defaultProps = {
  unScheduleList: [],
  placement: 'left',
  leftTitle: '电站 (月度)',
  rightTitle: '剩余/总巡检数量',
  noToolTip: false,
};

ShiftsArrangeDetailList.propTypes = {
  unScheduleList: PropTypes.array,
  placement: PropTypes.string,
  leftTitle: PropTypes.string,
  rightTitle: PropTypes.string,
  noToolTip: PropTypes.bool,
};

const ShiftsArrangeList = props => {
  console.log(
    ' %c ShiftsArrangeList 组件 props ： ',
    `color: #333; font-weight: bold`,
    props,
  );
  const { className, leftTitle, rightTitle, placement, noToolTip } = props; //

  const Com = (
    <>
      <div className="titleRow primaryBorderBottom fsb absoulte">
        <div>{leftTitle}</div>
        <div>{rightTitle}</div>
      </div>
      <div className="titleRow primaryBorderBottom fsb">
        <div>{leftTitle}</div>
        <div>{rightTitle}</div>
      </div>
      {props.events
        .filter(v => v.surplus_plan_num > 0)
        .map((event, index) => {
          // console.log(' CalendarDraggable event ： ', event,)//
          return (
            <div key={event.id} className="fsb rowItem ">
              <Tooltip
                placement={placement}
                title={'拖拽电站到日历里！'}
                overlayClassName="aaa"
              >
                <div className={'left'}>
                  {/* {true && ( */}
                  {event.surplus_plan_num > 0 && (
                    <div
                      id={event.id}
                      url={event.surplus_plan_num}
                      // data-isdraged={event.isdraged}
                      data-datas={event}
                      className="dragItem "
                      test={'zyb'}
                    >
                      <BarsOutlined className={`dragIcon`} />
                      电站-{event.name}
                    </div>
                  )}
                </div>
                <div>客户-{event.customer}</div>
              </Tooltip>
              <div>{props.renderRight(event)}</div>
            </div>
          );
        })}
    </>
  );

  return (
    <div className={`rightList rightTable`}>
      {/* <SearchForm className={`w100 `}
        onSearch={null}
        onChange={props.onUnScheduleListChange}
        selectData={props.unScheduleFilter}
      ></SearchForm> */}
      <SmartInput
        className={`w100 `}
        placeholder={'请输入关键字过滤'}
        onChange={props.onUnScheduleListChange}
        // onChange={() => {
        //   console.log(' ssssssssss ： ',    )//
        // }}
      ></SmartInput>
      <CalendarDraggable
        className={`${className} `}
        itemSelector={'.dragItem'}
        // renderItem={(event, index) => (
        //   <div key={event.id} className="fsb rowItem ">
        //   </div>
        // ){}
      >
        {!noToolTip ? Com : Com}
      </CalendarDraggable>
    </div>
  );
};

ShiftsArrangeList.defaultProps = {
  unScheduleList: [],
  placement: 'left',
  leftTitle: '电站 (月度)',
  rightTitle: '剩余/总巡检数量',
  noToolTip: false,
};

ShiftsArrangeList.propTypes = {
  unScheduleList: PropTypes.array,
  placement: PropTypes.string,
  leftTitle: PropTypes.string,
  rightTitle: PropTypes.string,
  noToolTip: PropTypes.bool,
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
    // props.eventsSet(params);
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
      <ShiftsArrangeDetailList
        noToolTip
        events={props.dateList}
        dayEvents={props.dayEvents}
        monthEvents={props.monthEvents}
        leftTitle={props.dayInfo.date}
        rightTitle={`已排电站数：${props.dayEvents.length +
          props.monthEvents.length}`}
        renderRight={event => (
          <a onClick={() => props.removePlanAsync(event)}>移除</a>
        )}
        className={`leftTable listWrapper`}
      ></ShiftsArrangeDetailList>

      <SmartCalendar
        // events={calendarEvents}

        // initialDate={new Date(2020, 9, 1)}
        // className={`${ANIMATE.slideInLeft} `}
        calendarRef={calendarRef}
        // validRange={nowDate => {
        //   return {
        //     start: nowDate,
        //   };
        // }}
        // dayCellClassNames={(e) => {
        //   console.log(' dayCellClassNames ： ', e,  )//
        // }}
        events={props.scheduleList}
        select={select}
        eventClick={props.eventClick}
        eventsSet={eventsSet}
        eventDrop={eventDrop}
        eventAdd={eventAdd}
        // eventRemove={eventRemove}
        eventChange={eventChange}
        initialDate={props.initialDate}
        dayMaxEvents={1}
        moreLinkContent={'新拖入电站列表...'}
        // dayMaxEvents={0}
        eventContent={eventInfo => {
          console.log(' eventInfo ： ', eventInfo); //
          return (
            <div
              className={`eventWrapper`}
              onClick={e => {
                console.log(' eventWrappereventWrapper ： '); //
              }}
            >
              {eventInfo.event.title?.split('客户')[0]}
              {/* <CloseOutlined onClick={props.remove} /> */}
            </div>
          );
        }}
        // eventOverlap={false}
        // dayCellContent={}
      />

      <ShiftsArrangeList
        className={` listWrapper`}
        renderRight={event => (
          <>
            {event.surplus_plan_num} / {event.spect_plan_num}
          </>
        )}
        events={props.unScheduleList}
        events={props.unScheduleFilter}
        unScheduleFilter={props.unScheduleFilter}
        onUnScheduleListChange={props.onUnScheduleListChange}
        // className={`${ANIMATE.slideInRight} `}
      ></ShiftsArrangeList>
    </div>
  );
};

InspectPlanCalendar.defaultProps = {
  scheduleList: [],
  eventsSet: () => {},
  date: '',
};

InspectPlanCalendar.propTypes = {
  scheduleList: PropTypes.array,
  eventsSet: PropTypes.func,
  date: PropTypes.string,
};

export default InspectPlanCalendar;
