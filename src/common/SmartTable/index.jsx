import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types'
import './style.less';
import { Table, Icon, Switch, Radio, Form, Divider, Button, Input } from 'antd';
import { RemoveModal } from '@/components/Modal/ResultModal';
import { SIZE, ANIMATE, INPUT_TXT } from '@/constants'; //onRemove
// import { showTotal, dataFilter, customFilter } from '@/utils'; //
import { tips,  } from '@/utils'; //
import datas from '@/pages/data'; //

// export const showTotal = (total) => `總共 ${total} 條`

// const filters = (params, ) => {
//   console.log(' filters   params, ,   ： ', params, this,  )

// }

// function filters(params) {
//   console.log(' filters ： ', params, this);
// }

export const ActionCom = (props,  ) => {
  const {edit, remove, extra, record, onRemove,    } = props
  // console.log(' ActionCom props ： ', props,  )//
  return (
    <span>
      <a onClick={() => edit({action: 'edit', record})}>编辑</a>
      <a onClick={() => remove({action: 'remove', record})}>删除</a>
      {extra}
    </span>
  );
}  //





class SmartTable extends PureComponent {
  constructor(props) {
    super(props);
    const { total, size = SIZE } = this.props;
    const pagination = {
      // current: 10,
      // pageSize: 6,
      // showSizeChanger: true,
      // showTotal: showTotal,
      position: ['bottomCenter'],  
      pageSize: Number(size),
      total,
    };
    this.state = {
      pagination,

      searchText: '',
      searchKey: '',
      filtered: false,
      filterDropdownVisible: false,

      showResultModal: false,  

      datas,

      selectionType: 'checkbox',  
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
            className="m-r-10"
          >
            关闭
          </Button>
          <Button onClick={() => this.reset(key)}>
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
    const { dataSource, noMock, rowLength,   } = this.props; //

    if (noMock) {
      return []
    }
    
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
      if (rowLength) {
        const sliceData = data.slice(0, rowLength);
        console.log('  sliceData ：', sliceData,  )// 
         
        return sliceData
      }
      
      return data;
    }
  };

  renderCol = (text, record, index, config) => {
    // console.log('    renderCol ： ', text, record, index, config,  )
    // if (config.render) {
    //   return config.render
    // }

    if (config.link) {
      return <a>{text}</a>;
    }

    return <span>{text}</span>;

  };


  onRemove = (e,  ) => {
    console.log('    onRemove ： ', e, this.state, this.props,   )
    const {remove,  } = this.props// 
    this.setState({
      showResultModal: true,
    })
  }


  onChange = (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }

  getCheckboxProps = record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  })

  
  onResultModalOk = (e,  ) => {
    console.log(' onResultModalOk   e,  ,   ： ', e,    )
    tips('删除成功！')
    this.setState({
      showResultModal: false,
    })
  }

  onResultModalCancel = (e, ) => {
    console.log(' onResultModalCancel   e, ,   ： ', e,   )
    this.setState({
      showResultModal: false,
    })
  }


  render() {
    const { pagination, searchText, searchKey, selectionType, showResultModal,   } = this.state;
    const { dataSource, columns, loading, rowKey, className, edit, remove, extra, actionConfig, noActionCol,  } = this.props;

    const col = columns.map((v, i) => ({
      // render: v.render ? v.render : this.renderCol,
      render: (...rest) => this.renderCol(...rest, v),
      dataIndex: `field${i}`,
      ...v,
      // ...(v.noFilter ? null : this.autoFilter(v.dataIndex)),
    }));
    

    const actionCol = {
      title: '操作',
      className: 'actionCol',
      render: (text, record, index) => {
        // console.log(' text, record, index ： ', text, record, index,  )//
      // render: (...rest) => {
      //   console.log(' rest ： ', rest,  )// 
        const props = {
          // ...rest,
          text, record, index, 
          edit, 
          remove: this.onRemove,
          extra,
          ...actionConfig, 
        }
        
        return <ActionCom {...props}   ></ActionCom>
        // return <ActionCom text={text} record={record} index={index} edit={edit} remove={remove}  ></ActionCom>
      },
    }  // 


    const cols = [
      ...col,
    ]
    // console.log('  对吗  !noActionCol ', !noActionCol, actionCol,    )
    if (!noActionCol) {
      cols.push(actionCol)
    }
    
    const rowSelection = {
      onChange: this.onChange,
      getCheckboxProps: this.getCheckboxProps,
    };


    console.log(
      ' %c SmartTable 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    ); //


    const title = '删除电站'

    const modalProps = {
      title: title,
      show: showResultModal,
      onOk: this.onResultModalOk,
      onCancel: this.onResultModalCancel,
    }
    const resProps = {
      // okFn: this.handleOk, 
      // offFn: this.handleOff, 
      okFn: this.onResultModalOk, 
      offFn: this.onResultModalCancel, 
    }
    


    return (
      <div className="">
        <Table
          // bordered
          // showQuickJumper
          // showSizeChanger
          // size={'small'}
          // loading={loading}
          // scroll={{ x: 800,  }}
          // rowKey={rowKey}

          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}

          pagination={pagination}
          rowClassName={(record, i) => ANIMATE.bounceIn}
          // rowClassName={(record, i) => ANIMATE.slideInRight}

          {...this.props}
          // dataSource={dataSource}
          dataSource={this.dataFilter()}
          // dataSource={dataFilter(this, dataSource, searchText, searchKey, )}
          // dataSource={filters(dataSource, searchText, searchKey, ).bind(this)}
          // dataSource={filters(dataSource, searchText, searchKey, )}
          // dataSource={() => filters(dataSource, searchText, searchKey, )()}
          // dataSource={this.filters(dataSource, searchText, searchKey, )}
          columns={cols}
          className={`smartTable ${className} `}
        />

        <RemoveModal 
          modalProps={modalProps} 
          resProps={resProps}
          
        >
          {/* <div className="dfc">
            {okText && <Button key="buy">{okText}</Button>}
            {okText && <Button type="primary" >{okText}</Button>}
          </div> */}
        </RemoveModal>

      </div>
    );
  }
}


SmartTable.defaultProps = {
  className: '',
  columns: [],
  // dataSource: [],
  dataSource: datas,
  rowKey: 'key',

  edit: () => {}, 
  remove: () => {}, 
  actionConfig: {},
  extra: null, 
  noActionCol: false,


};

SmartTable.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  rowKey: PropTypes.string,
  edit: PropTypes.func,
  remove: PropTypes.func,
  actionConfig: PropTypes.object,
  noActionCol: PropTypes.bool,

}




export default SmartTable; //
