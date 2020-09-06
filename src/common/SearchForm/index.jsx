import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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

const { Option } = Select;

class SearchForm extends PureComponent {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    // this.fetchUser = debounce(this.fetchUser, 800)
  }

  state = {
    data: [],
    value: [],
    fetching: false,
  };

  request = e => {
    console.log(' request   e, ,   ： ', e);
  };

  handleChange = value => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  };

  render() {
    const { fetching, data, value } = this.state;
    const { className } = this.props;

    return (
      <Select
        labelInValue
        value={value}
        placeholder="Select users"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.request}
        onChange={this.handleChange}
        suffixIcon={<SearchOutlined className="searchIcon" />}
        className={`${className} searchForm `}
        // style={{ width: '100%' }}
      >
        {data.map(d => (
          <Option key={d.value}>{d.text}</Option>
        ))}
      </Select>
    );
  }
}

SearchForm.defaultProps = {
  menuConfig: [],
  className: '',
};

export default SearchForm;
