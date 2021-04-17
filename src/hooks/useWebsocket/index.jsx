import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { openNotification } from '@/utils';
import { isDev } from '@/constants';

const useWebsocket = (props = {}) => {
  // console.log(
  //   ' %c useWebsocket 组件 this.state, this.props ： ',
  //   `color: #333; font-weight: bold`,
  //   props,
  // );
  const { url = 'ws://119.3.123.144:8008/websocket' } = props;
  console.log(' %c useWebsocketuseWebsocket 组件 ', props, url);

  // const websocket = new window.WebSocket("ws://119.3.123.144:8008/websocket");
  // useEffect(() => {
  //   return () => {
  //   }
  // }, [])
  const [socket, setSocket] = useState(null);
  const [wsData, setWsData] = useState(props.init);

  // useEffect(() => {
  // console.log(' useWebsocket useEffect 副作用 ： ');
  // const socket = new window.WebSocket(notifyWs);
  if (socket) {
    //连接成功建立的回调方法
    socket.onopen = event => {
      console.log(' socket.onopen 副作用 ： ', event);
    };

    //连接发生错误的回调方法
    socket.onerror = error => {
      console.log(' socket.onerror 副作用 ： ', error);
    };

    //接收到消息的回调方法
    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      console.log(
        ' socket.onmessage 副作用 ： ',
        wsData,
        event,
        event.data,
        data,
      );
      setWsData(data);
      if (!isDev) {
        data.forEach((v, i) => {
          console.log(' menuConfig v ： ', v, i);
          openNotification({
            message: v.verb,
            description: v.description,
          });
        });
      }

      // console.log(' socket.onmessage2 ： ', JSON.parse(event.data));
    };

    //连接关闭的回调方法
    socket.onclose = () => {
      console.log(' socket.onclose ： ');
    };
  } else {
    setSocket(new window.WebSocket(url));
  }

  // }, []);
  // });

  return {
    socket,
    wsData,
  };

  return <div className={`useWebsocketWrapper`}>useWebsocketWrapper</div>;
};

// useWebsocket.defaultProps = {
//   url: 'ws://119.3.123.144:8008/websocket',
// };

// useWebsocket.propTypes = {
//   url: PropTypes.string,

// };

export default useWebsocket;
