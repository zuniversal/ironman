import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { history, connect } from 'umi';
import { Form, Input } from 'antd';

const PageTitle = props => {
  // console.log(' PageTitle ： ', props, props.title);
  return props.title ? (
    <div
      className={`${props.noPadding ? '' : 'paddingTop'} pageTitleWrapper ${
        props.className
      }`}
    >
      <div className="pageTitle">{props.title}</div>
      {props.children}
    </div>
  ) : null;
  // props.isWrapper &&<div className="pageTitle">{props.title}</div> <div className={props.className}>
  //   <div className="pageTitle">{props.title}</div>
  // </div>
};

PageTitle.defaultProps = {
  className: '',
};

PageTitle.propTypes = {
  className: PropTypes.string,
};

export default PageTitle;
// const mapStateToProps = ({ layout }) => ({ title: layout.title });
// export default connect(mapStateToProps)(PageTitle);
