import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import dog from '@/static/img/dog.jpg';
import { getPdf } from '@/services/common';
import { pdfPrefix } from '@/services/contract';

const SmartShowPDF = props => {
  console.log(' SmartShowPDF   props, ,   ： ', props);
  const { src } = props;

  const [isError, setIsError] = useState(false);
  const onError = err => {
    console.log(' onError   err,   ： ', err);
  };

  // useEffect(async () => {
  //   console.log(' useEffect   副作用,   ： ', props);
  //   const res = await getPdf(pdfPrefix + props.path)
  //   console.log(' useEffect   副作用, res  ： ', res);
  // }, [])

  useEffect(() => {
    // console.log(' useEffect   副作用,   ： ', props);
    // getPdf(pdfPrefix + props.path)
    // return;
    if (props.path) {
      getPdf(props.path)
        .then(res => {
          console.log('  res  ： ', res);
        })
        .catch(err => {
          console.log('  err catch  ： ', err);
          setIsError(true);
        });
    }
  }, []);

  // return (
  //   <img
  //     // src="http://oss-cm-tc.epkeeper.com/2020/12/GC-TC-2020-0149FB.pdf"
  //     src={dog}
  //     onError={onError}
  //   />
  // );
  return isError ? (
    <div className={`dfc`}>PDF加载出错！</div>
  ) : (
    <embed
      // src="http://oss-cm-tc.epkeeper.com/2020/12/GC-TC-2020-0149FB.pdf"
      className="embed"
      type="application/pdf"
      // {...props}
      src={src}
      key={props.src}
      onError={onError}
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
