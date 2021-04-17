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
import { INPUT_TXT, WORD } from '@/constants';

const SmartInput = props => {
  console.log(' SmartInput  + word{...prop} ： ', props);
  const { placeholder, word, ph, className, time, ...rest } = props;

  const prop = {
    placeholder: ph ? INPUT_TXT + ph : placeholder,
    ...rest,
  };

  const onChange = (e, rest) => {
    console.log(
      ' e (e) => {...rest}  onChange={props.onChange}{this.props.getHouseNoAsync({keyword: e.target.value})debounce(, 500)： ',
      e,
      e.target.value,
      rest,
    );
    props.onChange(e);
    // props.onPressEnter(e) debounce(() => , time)
  };
  const onPressEnter = (e, rest) => {
    console.log(
      ' e (e) => {...rest} onPressEnter={onPressEnter}  onChange={props.onChange}{this.props.getHouseNoAsync({keyword: e.target.value})debounce(, 500)： ',
      e,
      e.target.value,
      rest,
    );
    props.onPressEnter(e);
    // props.onPressEnter(e) debounce(() => , time)
  };

  return (
    <Input allowClear {...prop} className={`searchInput ${className}`} />
    // <Input {...props} onChange={debounce(props.onChange, 500)} className={`searchInput ${className}`} />
  );
};

SmartInput.defaultProps = {
  className: '',
  placeholder: INPUT_TXT,
  word: WORD,
  ph: '',
  time: 500,
  onChange: () => {},
};

SmartInput.propTypes = {
  placeholder: PropTypes.string,
  word: PropTypes.string,
  ph: PropTypes.string,
  time: PropTypes.number,
  onChange: PropTypes.func,
};

export default SmartInput;
