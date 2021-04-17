import React from 'react';
import Typology from './Layout';
import './font/iconfont.css';

const Topogy = props => {
  console.log(' Topogy ： ', props);
  const { formBtn, ...rest } = props;

  return (
    <div className={' Topogy '}>
      <Typology {...props}></Typology>
    </div>
  );
};

Topogy.defaultProps = {};

export default Topogy;
