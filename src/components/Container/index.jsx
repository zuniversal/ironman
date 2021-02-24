import React from 'react';
import { Spin } from 'antd';
import noData from '@/static/assets/noData.png';

import './index.less';

export default React.memo(function Container(props) {
  if (props.loading) {
    return <Spin className="loading" />;
  }
  if (props.empty) {
    return <Empty className={props.emptyCls} text={props.emptyText} />;
  }
  return props.children;
});

function Empty({ text = '暂无数据' }) {
  return (
    <div className="noData">
      <img src={noData} className="noDataImg" />
      <div className="text">{text}</div>
    </div>
  );
}
