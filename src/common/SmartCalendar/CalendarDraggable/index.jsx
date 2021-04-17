import React, { useEffect, useRef, createRef } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { Draggable } from '@fullcalendar/interaction';

const CalendarDraggable = props => {
  const domRef = React.createRef();
  useEffect(() => {
    // Cannot read property 'addEventListener' of null 如果没有该容器节点 会导致监听失败
    let draggableEl = document.getElementById('dataListWrapper');
    console.log(' CalendarDraggable eventEleventEl 2： ', draggableEl, domRef);
    new Draggable(draggableEl, {
      itemSelector: props.itemSelector,
      eventData(eventEl) {
        let title = eventEl.getAttribute('title');
        let id = eventEl.getAttribute('id');
        let color = eventEl.getAttribute('color');
        let display = eventEl.getAttribute('display');
        let textColor = eventEl.getAttribute('textColor');
        // let isdraged = eventEl.getAttribute('isdraged');
        console.log(
          ' eventEleventEl  ： ',
          eventEl,
          title,
          id,
          color,
          display,
          eventEl.getAttribute,
        );
        return {
          title: eventEl.innerText,
          id: id,
          display: display,
          color: color,
          textColor: textColor,
          // url: url,
          // isdraged,
        };
      },
    });
  }, []);
  console.log(' CalendarDraggable   props, ,   ： ', props);

  const { className } = props;

  return (
    <div id="dataListWrapper" className={`${className} `} ref={domRef}>
      {props.children}
    </div>
  );
};

CalendarDraggable.defaultProps = {
  itemSelector: '.dragItem',
};

CalendarDraggable.propTypes = {
  itemSelector: PropTypes.string,
};

export default CalendarDraggable;
