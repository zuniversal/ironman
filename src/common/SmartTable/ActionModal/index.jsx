import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import {
  Table,
  Icon,
  Switch,
  Radio,
  Form,
  Divider,
  Button,
  Input,
  Tooltip,
} from 'antd';
import SmartModal from '@/common/SmartModal'; //
import ActionCom from '@/components/Widgets/ActionCom'; //
import QRCodeContent from '@/components/Widgets/QRCodeContent'; //
import { RemoveModal } from '@/components/Modal/ResultModal';
import { SIZE, ANIMATE, INPUT_TXT } from '@/constants'; //
import { tips, mockTbData, foramtText } from '@/utils'; //
import { Link } from 'umi'; //

/* 
  封装的通用 表格组件 封装带有相关通用操作 

*/

// const isMockData = true
const isMockData = false;
const mixinData = true;

class SmartTable extends PureComponent {
  constructor(props) {
    super(props);
    const { total, size = SIZE } = this.props;
    const pagination = {
      // current: 10,
      // pageSize: 6,
      showSizeChanger: true,
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

      isShowResultModal: false,

      mockTbData: mockTbData(props.haveChildren),
      // mockTbData: [],

      selectionType: 'checkbox',

      title: '',
      show: false,
      modalContent: null,
    };
  }

  // 自动过滤相关方法
  onInputChange = (searchKey, e) => {
    console.log(' searchKey, e ： ', searchKey, e); //
    this.setState({ searchText: e.target.value, searchKey: searchKey });
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
          <Button onClick={() => this.reset(key)}>重置</Button>
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

  // 得到表格的真实数据源 支持单元格相关字段的自动过滤
  // 可关闭相关 mock 模拟数据
  dataFilter = () => {
    const { searchKey, searchText } = this.state; //
    const { dataSource, noMock, rowLength, newTbData, rowKey } = this.props; //

    // const mpckAddData = newTbData.filter((v) => typeof v !== 'object')
    const mpckAddData = {};
    if (newTbData[0]) {
      mpckAddData.key = Math.random();
      Object.keys(newTbData[0]).forEach((v, i) => {
        mpckAddData[v] = typeof newTbData[0][v] !== 'object' ? '' : v;
      });
    }

    if (noMock) {
      return [];
    }

    // const data = dataSource
    // const data = this.state.mockTbData;

    // const data = (dataSource ? dataSource : this.state.mockTbData).map((v, i) => ({...v, key: i}))
    // const realData = (dataSource ? dataSource : this.state.mockTbData).map((v, i) => ({...v, key: i}))
    // const data = mixinData ? [...realData, ...this.state.mockTbData, ] : realData

    const data = (dataSource.length > 0 ? dataSource : this.state.mockTbData)
      .map((v, i) => ({ ...v, key: i }))
      .map((v, i) => ({
        ...v,
        // d_id: v.d_id
        // d_id: v.d_id ? v.d_id
        d_id: v[rowKey] ? v[rowKey] : Math.random(),
      }));

    console.log(
      ' dataFilter ：',
      this.state,
      this.props,
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
        console.log('  sliceData ：', sliceData); //

        return sliceData;
      }
      console.log(
        ' isMockData ： ',
        mpckAddData,
        newTbData,
        data,
        isMockData,
        dataSource,
        this.state.mockTbData,
        this.state,
        this.props,
      ); //
      if (Object.keys(mpckAddData).length && isMockData) {
        return [mpckAddData, ...data];
      } else {
        return data;
      }
    }
  };

  // 根据参数 计算 处理 得出单元格显示的内容
  renderCol = (text, record, index, config) => {
    // console.log('    renderCol ： ', text, record, index, config,  )
    // if (config.render) {
    //   return config.render
    // }

    const { linkUrl, linkUrlFn, link, d_item, render } = config;

    const { showDetail, rowKey } = this.props; //

    const textLength = `${text}`.length;
    // const txt = foramtText(`${text}`)
    const txt = foramtText(text);
    // const txt = textLength > lengthLimit ? `${text}`.slice(0, lengthLimit) + '...' : text

    // console.log('  渲染=== ：', text, txt, )//

    let content = '';
    if (linkUrl) {
      content = (
        <Link to={linkUrl} className={``}>
          {txt}
        </Link>
      );
    } else if (linkUrlFn) {
      const path = linkUrlFn(text, record, index);
      // console.log('  path ：', path,  )//
      content = (
        <Link to={path} className={``}>
          {txt}
        </Link>
      );
    } else if (link) {
      content = <a className={``}>{txt}</a>;
    } else if (d_item) {
      content = (
        <a
          onClick={() =>
            showDetail({
              action: 'detail',
              // d_id: record[d_item],
              // [d_item]: record[d_item],
              d_id: record[rowKey],
              [d_item]: record[d_item],
              // record,
            })
          }
        >
          {txt}
        </a>
      );
      // } else if (detailFn) {
      //   content = (
      //     <a onClick={detailFn}>{txt}</a>
      //   );
    } else if (render) {
      content = render(text, record, index);
    } else {
      content = <span className={``}>{txt}</span>;
    }

    return <Tooltip title={text}>{content}</Tooltip>;
  };

  onRemove = e => {
    console.log('    onRemove ： ', e, this.state, this.props);
    const { remove } = this.props; //
    this.setState({
      isShowResultModal: true,
    });
  };

  onChange = (selectedRowKeys, selectedRows) => {
    console.log(
      ' onChange ： ',
      selectedRowKeys,
      selectedRows,
      this.state,
      this.props,
    ); //
    const { onSelectChange } = this.props; //
    if (onSelectChange) {
      onSelectChange(selectedRowKeys, selectedRows);
    }

    this.setState({
      selectedRowKeys,
    });
  };

  getCheckboxProps = record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  });

  onResultModalOk = e => {
    console.log(' onResultModalOk   e,  ,   ： ', e);
    tips('删除成功！');
    this.setState({
      isShowResultModal: false,
    });
  };

  onResultModalCancel = e => {
    console.log(' onResultModalCancel   e, ,   ： ', e);
    this.setState({
      isShowResultModal: false,
    });
  };

  actionCol = e => {
    console.log('    actionCol ： ', e, this.state, this.props);
    const { edit, remove, extra, actionConfig } = this.props;

    // 通用操作列
    const actionCol = {
      title: '操作',
      className: 'actionCol',
      render: (text, record, index) => {
        // console.log(' text, record, index ： ', text, record, index,  )//
        // render: (...rest) => {
        const props = {
          // ...rest,
          // tableProps: this.props,
          ...this.props,
          text,
          record,
          index,
          edit,
          // remove: this.onRemove,
          remove,
          showQRCode: this.showQRCode,
          extra,
          ...actionConfig,
        };

        //console.log(' restrest,  ： ', props);
        return <ActionCom {...props}></ActionCom>;
        // return <ActionCom text={text} record={record} index={index} edit={edit} remove={remove}  ></ActionCom>
      },
    }; //

    return actionCol;
  };

  renderRemoveModal = params => {
    console.log(' renderRemoveModal ： ', params);
    const { isShowResultModal } = this.state; //

    const modalProps = {
      title: '删除电站',
      show: isShowResultModal,
      onOk: this.onResultModalOk,
      onCancel: this.onResultModalCancel,
    };
    const resProps = {
      // okFn: this.handleOk,
      // offFn: this.handleOff,
      okFn: this.onResultModalOk,
      offFn: this.onResultModalCancel,
    };

    return (
      <RemoveModal modalProps={modalProps} resProps={resProps}>
        {/* <div className="dfc">
        {okText && <Button key="buy">{okText}</Button>}
        {okText && <Button type="primary" >{okText}</Button>}
      </div> */}
      </RemoveModal>
    );
  }

  showQRCode = params => {
    console.log('    showQRCode ： ', params);
    this.setState({
      show: true,
      // modalContent: <QRCodeCom value={params.record} ></QRCodeCom>,
      modalContent: <QRCodeContent {...params}></QRCodeContent>,
    });
  };
  onOk = e => {
    console.log('    onOk ： ', e);
    this.setState({
      show: false,
      modalContent: null,
    });
  };
  onCancel = e => {
    console.log('    onCancel ： ', e);
    this.setState({
      show: false,
      modalContent: null,
    });
  };
  renderModalContent = e => {
    console.log('    renderModalContent ： ', e);
    const { modalContent } = this.state;
    return modalContent;
  };
  renderQRCodeModal = params => {
    console.log(' renderQRCodeModal ： ', params);
    const { title, show } = this.state; //
    return (
      <SmartModal
        width={'400px'}
        show={show}
        onOk={this.onOk}
        onCancel={this.onCancel}
        title={title}
        footer={null}
        className={`qrCodeModal `}
      >
        {this.renderModalContent()}
      </SmartModal>
    );
  }

  render() {
    const {
      pagination,
      searchText,
      searchKey,
      selectionType,
      isShowResultModal,
      selectedRowKeys,
    } = this.state;
    const {
      dataSource,
      columns,
      loading,
      rowKey,
      className,
      edit,
      remove,
      extra,
      actionConfig,
      noActionCol,
    } = this.props;

    const col = columns.map((v, i) => ({
      // render: v.render ? v.render : this.renderCol,
      dataIndex: v.dataIndex ? v.dataIndex : `field${i}`,
      ...v,
      render: (...rest) => this.renderCol(...rest, v),
      // ...(v.noFilter ? null : this.autoFilter(v.dataIndex)),
    }));

    const cols = [...col];
    // console.log('  对吗  !noActionCol ', !noActionCol, actionCol,    )
    if (!noActionCol) {
      cols.push(this.actionCol());
    }

    const rowSelection = {
      onChange: this.onChange,
      getCheckboxProps: this.getCheckboxProps,
    };

    console.log(
      ' %c SmartTable 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      col,
      this.state,
      this.props,
    ); //

    const realData = this.dataFilter();
    console.log('  realData ：', realData); //

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

        {this.renderRemoveModal()}

        {this.renderQRCodeModal()}
      </div>
    );
  }
}

SmartTable.defaultProps = {
  className: '',
  columns: [],
  newTbData: [],
  // dataSource: [],
  dataSource: mockTbData(),
  // rowKey: 'key',
  // rowKey: 'd_id', //
  rowKey: 'id',

  // edit: () => {},
  remove: () => {},
  showDetail: () => {},
  actionConfig: {},
  // extra: null,
  extra: () => {}, // 操作列额外的内容
  noActionCol: false,
  noDefault: false, // 是否禁用默认的操作列
  isQRCode: false, // 是否显示默认的二维码按钮
};

SmartTable.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.array,
  newTbData: PropTypes.array,
  dataSource: PropTypes.array,
  rowKey: PropTypes.string,
  edit: PropTypes.func,
  remove: PropTypes.func,
  showDetail: PropTypes.func,
  actionConfig: PropTypes.object,
  noActionCol: PropTypes.bool,
  noDefault: PropTypes.bool,
  isQRCode: PropTypes.bool,
};

export default SmartTable; //