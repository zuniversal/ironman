import React from 'react';
import './style.less';
import { Form, Input } from 'antd';

const PageTitle = props => {
  console.log(' PageTitle ： ', props); //
  return (
    <div className="titleWrapper">
      <div className="pageTitle">{props.title}</div>
    </div>
  );
};

export default PageTitle;
