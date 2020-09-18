import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types'
import './style.less';
import { Table, Icon, Switch, Radio, Form, Divider, Button, Input, Tooltip,    } from 'antd';
import SmartModal from '@/common/SmartModal'; //
import QRCodeCom from '@/common/QRCodeCom'; //
import { RemoveModal } from '@/components/Modal/ResultModal';
import { SIZE, ANIMATE, INPUT_TXT } from '@/constants'; //
// import { showTotal, dataFilter, customFilter } from '@/utils'; //
import { tips, mockTbData,  } from '@/utils'; //
import { Link,  } from 'umi'; //

// export const showTotal = (total) => `總共 ${total} 條`

// const filters = (params, ) => {
//   console.log(' filters   params, ,   ： ', params, this,  )

// }

// function filters(params) {
//   console.log(' filters ： ', params, this);
// }



const NUM_LEN = 9
const WORD_LEN = 10
const LETTER_LEN = 20

const lengthMap = {
  num: NUM_LEN,
  word: WORD_LEN,
  letter: LETTER_LEN,
}

const textType = (text,  ) => {
  let textLength = `${text}`.length
  if (isNaN(text)) {
    textLength = lengthMap.num
  } else if (/^[a-zA-Z]+$/.test(text)) {
    textLength = lengthMap.letter
  } else if (/^[\u4e00-\u9fa5]+$/.test(text)) {
    textLength = lengthMap.word
  }
  console.log(' textLength ： ', text, textLength,  )// 
  return textLength 
}




export const ActionCom = (params,  ) => {
  const {edit, remove, extra, record, onRemove, showQRCode, noDefault, props,  } = params
  // console.log(' ActionCom props ： ', props,  )//
  return (
    <span>
      {!props.noDefault && <>
        <a onClick={() => edit({action: 'edit', record})}>编辑</a>
        {/* <a onClick={() => remove({action: 'remove', record})}>删除</a> */}
        <a onClick={() => remove(record)}>删除</a>
      </>}
      {(!props.noDefault || !props.noQRCode) && <a onClick={() => showQRCode({action: 'QRCode', record})}>生成二维码</a>}
      {extra}
    </span>
  );
}  //




// const isMockData = true
const isMockData = false
const mixinData = true





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

      mockTbData: mockTbData(props.haveChildren, ),

      selectionType: 'checkbox',  

      title: '',  
      show: false,  
      modalContent: null,  


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
    const { dataSource, noMock, rowLength, newTbData,  } = this.props; //

    // const mpckAddData = newTbData.filter((v) => typeof v !== 'object')
    const mpckAddData = {
    }
    if (newTbData[0]) {
      mpckAddData.key = Math.random()
      Object.keys(newTbData[0]).forEach((v, i) => {
        mpckAddData[v] = typeof newTbData[0][v] !== 'object' ? '' : v
        
      })
      
    }
    
    

    if (noMock) {
      return []
    }
    
    // const data = dataSource
    // const data = this.state.mockTbData;

    // const data = (dataSource ? dataSource : this.state.mockTbData).map((v, i) => ({...v, key: i}))
    // const realData = (dataSource ? dataSource : this.state.mockTbData).map((v, i) => ({...v, key: i}))
    // const data = mixinData ? [...realData, ...this.state.mockTbData, ] : realData 

    const data = ((dataSource.length > 0 ? dataSource : this.state.mockTbData).map((v, i) => ({...v, key: i})))
    .map((v, i) => ({...v, d_id: v.d_id && v.d_id !== 0 ? v.d_id : Math.random()}))


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
      console.log(' isMockData ： ', mpckAddData, newTbData, data, isMockData, dataSource, this.state.mockTbData,  )// 
      if (Object.keys(mpckAddData).length && isMockData) {
        return [mpckAddData, ...data,  ];
      } else {
        return data
      }
    }
  };


  renderCol = (text, record, index, config) => {
    // console.log('    renderCol ： ', text, record, index, config,  )
    // if (config.render) {
    //   return config.render
    // }

    const {tdClick,  } = this.props// 

    const textLength = `${text}`.length
    // console.log('  textLength ：', textLength,  )//  
    const txt = textLength > WORD_LEN ? `${text}`.slice(0, 10) + '...' : text

    const txts = this.textType(`${text}`)
    
    let content = ''
    if (config.linkUrl) {
      content = <Link to={config.linkUrl} className={``}  >{txt}</Link>;
    } else if (config.link) {
      content = <a className={``}  >{txt}</a>;
    } else if (config.detail) {
      content = <a onClick={() => tdClick({action: 'detail', record,  })}  >{txt}</a>;
    } else {
      content = <span className={``}  >{txt}</span>;
    }

    return <Tooltip title={text} >
      {content}
    </Tooltip>

  };


  onRemove = (e,  ) => {
    console.log('    onRemove ： ', e, this.state, this.props,   )
    const {remove,  } = this.props// 
    this.setState({
      showResultModal: true,
    })
  }


  onChange = (selectedRowKeys, selectedRows) => {
    console.log(' onChange ： ', selectedRowKeys, selectedRows, this.state, this.props,    )// 
    const {onSelectChange,  } = this.props// 
    if (onSelectChange) {
      onSelectChange(selectedRowKeys, selectedRows)
    }
    
    this.setState({ 
      selectedRowKeys,
    });
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


  showQRCode = (params,  ) => {
    console.log('    showQRCode ： ', params,   )
    this.setState({
      show: true,
      modalContent: <QRCodeCom value={params.record} ></QRCodeCom>, 
    })
  }
  onOk = (e,  ) => {
    console.log('    onOk ： ', e,   )
    this.setState({
      show: false,
      modalContent: null,  
    })
  }
  onCancel = (e,  ) => {
    console.log('    onCancel ： ', e,   )
    this.setState({
      show: false,
      modalContent: null,  
    })
  }
  renderModalContent = (e,  ) => {
    console.log('    renderModalContent ： ', e,   )
    const { modalContent,  } = this.state;
    return modalContent
  }


  render() {
    const { pagination, searchText, searchKey, selectionType, showResultModal, title, show, selectedRowKeys,  } = this.state;
    const { dataSource, columns, loading, rowKey, className, edit, remove, extra, actionConfig, noActionCol,  } = this.props;

    const col = columns.map((v, i) => ({
      // render: v.render ? v.render : this.renderCol,
      render: (...rest) => this.renderCol(...rest, v),
      dataIndex: v.dataIndex ? v.dataIndex : `field${i}`,
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
          // remove: this.onRemove,
          remove,
          showQRCode: this.showQRCode,
          extra,
          props: this.props,
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



    const modalProps = {
      title: '删除电站',
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
    
    const realData = this.dataFilter()
    console.log('  realData ：', realData,  )// 

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
          dataSource={realData}
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


        <SmartModal 
          show={show} onOk={this.onOk} onCancel={this.onCancel}
          title={title}
          footer={null}
          className={`qrCodeModal `}
        >
          {this.renderModalContent()}
        </SmartModal> 


        

      </div>
    );
  }
}


SmartTable.defaultProps = {
  className: '',
  columns: [],
  newTbData: [],  
  dataSource: [],
  // dataSource: mockTbData(),
  // rowKey: 'key',
  rowKey: 'd_id',

  edit: () => {}, 
  remove: () => {}, 
  tdClick: () => {}, 
  actionConfig: {},
  extra: null, 
  noActionCol: false,
  noDefault: false,
  noQRCode: false,


};

SmartTable.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.array,
  newTbData: PropTypes.array,
  dataSource: PropTypes.array,
  rowKey: PropTypes.string,
  edit: PropTypes.func,
  remove: PropTypes.func,
  tdClick: PropTypes.func,
  actionConfig: PropTypes.object,
  noActionCol: PropTypes.bool,
  noDefault: PropTypes.bool,
  noQRCode: PropTypes.bool,

}




export default SmartTable; //
