import React from 'react';
import './style.less';
// import Typology from './Typology';
// import Typology from './Visio/pages';
// import Typology from './Visio/pages/workspace';
import Fb from './Fb';

const Topogy = props => {
  console.log(' Topogy ： ', props); //
  const { formBtn, ...rest } = props; //
  return <Fb {...props}></Fb>;
  return <div></div>;
  // return <Typology {...props}></Typology>;
  // return (
  //   <div className={' Topogy '}>
  //     <Typology {...props}></Typology>
  //   </div>
  // );
};

Topogy.defaultProps = {};

export default Topogy;
