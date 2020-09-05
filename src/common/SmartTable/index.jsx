import React, { Component, PureComponent } from 'react';
import './style.less';
import { Table, Icon, Switch, Radio, Form, Divider, Button, Input } from 'antd';
import { SIZE, ANIMATE, INPUT_TXT } from '@/constants'; //
import { showTotal, dataFilter, customFilter } from '@/utils'; //

import datas from '@/pages/data'; //

// export const showTotal = (total) => `總共 ${total} 條`

// const filters = (params, ) => {
//   console.log(' filters   params, ,   ： ', params, this,  )

// }

function filters(params) {
  console.log(' filters ： ', params, this);
}

class SmartTable extends PureComponent {
  constructor(props) {
    super(props);
    const { total, size = SIZE } = this.props;
    const pagination = {
      // current: 10,
      pageSize: Number(size),
      // pageSize: 6,
      total,
      showSizeChanger: true,
      showTotal: showTotal,
    };
    this.state = {
      pagination,

      searchText: '',
      searchKey: '',
      filtered: false,
      filterDropdownVisible: false,

      datas,
    };
  }

  onInputChange = (k, e) => {
    console.log(' k, e ： ', k, e); //
    this.setState({ searchText: e.target.value, searchKey: k });
  };
  blur = k => this.setState({ [`${k}Visible`]: false });
  reset = k =>
    this.setState({ [`${k}Visible`]: false, searchText: '', searchKey: '' });

  autoFilter = key => {
    // console.log(' autoFilter   key, ,   ： ', key, this,  )

    return {
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => {
              console.log(' searchInput this ： ', this); //
              this.searchInput = ele;
            }}
            placeholder={`${INPUT_TXT}`}
            value={this.state.searchText}
            onChange={e => this.onInputChange(key, e)}
          />
          <Button
            type="primary"
            onClick={() => this.blur(key)}
            className="m-r10"
          >
            关闭
          </Button>
          <Button type="primary" onClick={() => this.reset(key)}>
            重置
          </Button>
        </div>
      ),
      // filterIcon: <Icon type="filter" style={{ color: this.state.filtered ? '#fff' : '#fff' }} />,
      filterDropdownVisible: this.state[`${key}Visible`],
      onFilterDropdownVisibleChange: visible => {
        console.log(
          ' onFilterDropdownVisibleChange  ：',
          visible,
          this.state,
          `${key}Visible`,
          key,
        );
        // if (!this.state.isHandleTableChange) {
        this.setState(
          {
            [`${key}Visible`]: visible,
            // searchText: '', searchKey: '',
          },
          () => {
            console.log(' focusfocus ： ', this); //
            // this.searchInput.focus()
            // this.setState({
            //     searchText: '',
            // })
            this.reset();
          },
        );
        // }
      },
    };
  };

  dataFilter = () => {
    const { searchKey, searchText } = this.state; //
    const { dataSource } = this.props; //
    // const data = dataSource
    const data = this.state.datas;

    console.log(
      ' dataFilter ：',
      this.state,
      data,
      'k ：',
      searchKey,
      'searchText ：',
      searchText,
    );

    if (data.length && searchKey != '') {
      const reg = new RegExp(searchText, 'gi');

      return data
        .map(record => {
          // console.log('record ：', record)
          if (record[searchKey] != undefined) {
            const match = `${record[searchKey]}`.match(reg);
            if (!match) {
              return null;
            }
            return {
              ...record,
              [searchKey]: record[searchKey],
            };
          } else {
            return {
              ...record,
            };
          }
        })
        .filter(record => !!record);
    } else {
      return data;
    }
  };

  renderCol = (text, record, index, config) => {
    // console.log('    renderCol ： ', text, record, index, config,  )
    // if (config.render) {
    //   return config.render
    // }
    if (record) {
      return <span>{text}</span>;
    }

    if (config.link) {
      return <a>{text}</a>;
    }
  };

  render() {
    const { pagination, searchText, searchKey } = this.state;
    const { dataSource, columns, loading, rowKey, className } = this.props;

    const col = columns.map(v => ({
      render: v.render ? v.render : this.renderCol,
      ...v,
      ...(v.noFilter ? null : this.autoFilter(v.dataIndex)),
    }));
    console.log(
      ' %c SmartTable 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    ); //

    return (
      <div className="smartTable">
        <Table
          bordered
          showQuickJumper
          showSizeChanger
          // size={'small'}
          pagination={pagination}
          // loading={loading}
          rowClassName={(record, i) => ANIMATE.bounceIn}
          // scroll={{ x: 800,  }}
          rowKey={rowKey}
          {...this.props}
          // dataSource={dataSource}
          dataSource={this.dataFilter()}
          // dataSource={dataFilter(this, dataSource, searchText, searchKey, )}
          // dataSource={filters(dataSource, searchText, searchKey, ).bind(this)}
          // dataSource={filters(dataSource, searchText, searchKey, )}
          // dataSource={() => filters(dataSource, searchText, searchKey, )()}
          // dataSource={this.filters(dataSource, searchText, searchKey, )}
          columns={col}
          className={`tables ${className} `}
        />
      </div>
    );
  }
}

SmartTable.defaultProps = {
  columns: [],
  // dataSource: [],
  dataSource: datas,
  className: '',
  rowKey: 'key',
};

export default SmartTable; //
