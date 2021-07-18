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
import {
  Table,
  Icon,
  notification,
  Modal,
  Button,
  Tag,
  Form,
  Input,
  Row,
  Col,
  Menu,
  Dropdown,
  Select,
  Spin,
} from 'antd';
// import debounce from 'lodash/debounce'
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { INPUT_TXT, WORD } from '@/constants';

const { Option } = Select;

class SearchForm extends PureComponent {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    // this.fetchUser = debounce(this.fetchUser, 800)
  }

  state = {
    data: [],
    // value: '',
    value: [],
    fetching: false,
  };

  request = value => {
    console.log(' request   value, ,   ： ', value);
    const obj = {};
    // https://segmentfault.com/a/1190000020221170
    const data = new Array(20).fill(0).map((v, i) => {
      // const data = Array.from({ length: 20, }, () => ({})).map((v, i) => {
      // obj[`value`] = `value${i}`
      const obj = {};
      obj[`value`] = `value-${i}`;
      obj[`label`] = `text-${i}`;
      return obj;
    });

    // const data = new Array(20).fill((e, ) => {
    //   console.log(' objobjobjobj ： ', e,    )//
    //   return 111
    // })
    // const data = new Array(20).fill(obj)
    console.log(' data ： ', data);

    this.setState({
      // value,
      data: data,
      fetching: false,
    });
  };

  handleChange = value => {
    console.log(' handleChange ： ', value);
    this.props.onChange && this.props.onChange();

    this.setState({
      value,
      // data: data,
      fetching: false,
    });
  };

  render() {
    const { fetching, data, value } = this.state;
    const {
      className,
      menuConfig,
      placeholder,
      word,
      defPh,
      selectData,
      children,
      ...rest
    } = this.props;

    const prop = {
      placeholder: defPh ? placeholder + word : placeholder,
    };

    return (
      <Select
        // mode="multiple"
        // labelInValue
        value={value}
        showSearch
        // notFoundContent={fetching ? <Spin size="small" /> : null}
        // filterOption={false}
        onSearch={this.request}
        onChange={this.handleChange}
        suffixIcon={<SearchOutlined className="searchIcon" />}
        {...prop}
        {...rest}
        className={`${className} searchForm w-224 `}
        optionFilterProp={'children'}
        // style={{ width: '100%' }}
      >
        {children ||
          (selectData || data).map(d => (
            <Option key={d.value}>{d.label}</Option>
          ))}
      </Select>
    );
  }
}

SearchForm.defaultProps = {
  className: '',
  menuConfig: [],
  placeholder: INPUT_TXT,
  word: WORD,
  defPh: true,
  selectData: [],
  // onChange: () => {},
};

SearchForm.propTypes = {
  menuConfig: PropTypes.array,
  placeholder: PropTypes.string,
  word: PropTypes.string,
  defPh: PropTypes.bool,
  selectData: PropTypes.array,
  // onChange: PropTypes.func,
};

export default SearchForm;
