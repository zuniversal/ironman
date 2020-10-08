import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { Form, Input } from 'antd';

const PageTitle = props => {
  console.log(' PageTitle ： ', props); //
  return (
    <div className={props.className}>
      <div className="pageTitle">{props.title}</div>
    </div>
  );
};

PageTitle.defaultProps = {
  className: '',
};

PageTitle.propTypes = {
  className: PropTypes.string,
};

export default PageTitle;
