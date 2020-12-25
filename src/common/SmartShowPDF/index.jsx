import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './style.less';

const SmartShowPDF = props => {
  console.log(' SmartShowPDF   props, ,   ： ', props);
  return (
    <embed
      // src="http://oss-cm-tc.epkeeper.com/2020/12/GC-TC-2020-0149FB.pdf"
      className="embed"
      type="application/pdf"
      {...props}
      key={props.src}
    />
  );
};

SmartShowPDF.defaultProps = {
  src: '',
};

SmartShowPDF.propTypes = {
  src: PropTypes.string,
};

export default SmartShowPDF;
