import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import SmartTim from '@/common/SmartTim'; //
import { Form, Input } from 'antd';

const config = [
  {
    key: 'upload',
    name: '张三',
    verb: '张明发来一条通知',
    desc: '各单位注意，下午三点集体大厅开会',
    time: '16分钟前',
  },
  {
    key: 'upload',
    name: '张三',
    verb: '张明发来一条通知',
    desc: '各单位注意，下午三点集体大厅开会',
    time: '16分钟前',
  },
  {
    key: 'upload',
    name: '张三',
    verb: '张明发来一条通知',
    desc: '各单位注意，下午三点集体大厅开会',
    time: '16分钟前',
  },
  {
    key: 'upload',
    name: '张三',
    verb: '张明发来一条通知',
    desc: '各单位注意，下午三点集体大厅开会',
    time: '16分钟前',
  },
  {
    key: 'upload',
    name: '张三',
    verb: '张明发来一条通知',
    desc: '各单位注意，下午三点集体大厅开会',
    time: '16分钟前',
  },
  {
    key: 'upload',
    name: '张三',
    verb: '张明发来一条通知',
    desc: '各单位注意，下午三点集体大厅开会',
    time: '16分钟前',
  },
  {
    key: 'upload1',
    name: '张三',
    verb: '张明发来一条通知',
    desc: '各单位注意，下午三点集体大厅开会',
    time: '16分钟前',
  },
  {
    key: 'upload2',
    name: '张三',
    verb: '张明发来一条通知',
    desc: '各单位注意，下午三点集体大厅开会',
    time: '16分钟前',
  },
];

const UserList = props => {
  // console.log(' userList   ,   ： ', props,  )
  const { data = {}, config = [], ...rest } = props;
  return (
    <div className="userList">
      {config.map((v, i) => (
        <div className={`rowItem`} key={i}>
          <div className={`item`}>
            <div className={`name`}>{v.name}</div>
            <div className={`time`}>{v.time}</div>
          </div>
          <div className={`item`}>{v.verb} </div>
          <div className={`item`}>{v.verb} </div>
        </div>
      ))}
    </div>
  );
};

const MsgBox = props => {
  // console.log(' MsgBox   ,   ： ', props,  )
  const { data = {}, config = [], ...rest } = props;
  return (
    <div className="msgBox">
      {config.map((v, i) => {
        const isSelf = i % 2 == 0;
        const avatar = <div className="avatar"></div>;
        const userInfo = (
          <div className="userInfo">
            {/* <div className="chatTime">{v.time}</div> */}
            <div className="username">{v.name}</div>
            <div className="username">{v.desc}</div>
          </div>
        );
        return (
          <div className={`rowItem ${isSelf ? 'self' : ''} `} key={i}>
            {isSelf ? userInfo : avatar}
            {isSelf ? avatar : userInfo}
          </div>
        );
      })}
    </div>
  );
};

const InputBox = props => {
  // console.log(' InputBox   ,   ： ', props,  )
  const { data = {}, config = [], ...rest } = props;
  return <div className="inputBox"></div>;
};

const ChatWindow = props => {
  // console.log(' ChatWindow ： ', props, props.title); //
  return (
    <div className={`chatWindow`}>
      <UserList config={[...config, ...config, ...config]}></UserList>
      <div className="right">
        <MsgBox config={[...config, ...config, ...config]}></MsgBox>
        <InputBox></InputBox>
      </div>
      <SmartTim></SmartTim>
    </div>
  );
};

ChatWindow.defaultProps = {
  className: '',
};

ChatWindow.propTypes = {
  className: PropTypes.string,
};

export default ChatWindow;
