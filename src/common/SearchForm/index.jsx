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
import { INPUT_TXT, WORD,    } from '@/constants'; //


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
    const data = new Array(20).fill(0).map((v, i) => {
      // obj[`value`] = `value${i}`
      const obj = {};
      obj[`value`] = `value-${i}`
      obj[`text`] = `text-${i}`
      return obj 
    });

    // const data = new Array(20).fill((e, ) => {
    //   console.log(' objobjobjobj ： ', e,    )// 
    //   return 111 
    // })
    // const data = new Array(20).fill(obj)
    console.log(' data ： ', data,  )// 

    this.setState({
      // value,
      data: data,
      fetching: false,
    });
  };

  handleChange = value => {
    console.log(' handleChange ： ', value,    )// 


    this.setState({
      value,
      // data: data,
      fetching: false,
    });
  };

  render() {
    const { fetching, data, value } = this.state;
    const { className, menuConfig, placeholder, word, defPh, ...rest } = this.props;

    const prop = {
      placeholder: defPh ? placeholder + word : placeholder
    }

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
        // style={{ width: '100%' }}
      >
        {data.map(d => <Option key={d.value}>{d.text}</Option>)}

      </Select>
    );
  }
}

SearchForm.defaultProps = {
  menuConfig: [],
  className: '',
  placeholder: INPUT_TXT,
  word: WORD, 
  defPh: true,  

};

export default SearchForm;
