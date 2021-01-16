import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { Input } from 'antd';
import debounce from 'lodash/debounce';
import { INPUT_TXT, WORD } from '@/constants'; //

const SmartInput = props => {
  console.log(' SmartInput  + word： ', props); //
  const { placeholder, word, defPh, className, time, ...rest } = props; //

  const prop = {
    placeholder: defPh ? placeholder : placeholder,
  };

  const onChange = debounce(props.onChange, time);

  return (
    <Input {...prop} {...rest} className={`searchInput ${className}`} />
    // <Input {...prop} {...props} onChange={debounce(props.onChange, 500)} className={`searchInput ${className}`} />
  );
};

SmartInput.defaultProps = {
  className: '',
  placeholder: INPUT_TXT,
  word: WORD,
  defPh: true,
  time: 500,
};

SmartInput.propTypes = {
  placeholder: PropTypes.string,
  word: PropTypes.string,
  defPh: PropTypes.bool,
  time: PropTypes.number,
};

export default SmartInput;
