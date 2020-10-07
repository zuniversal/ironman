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


    return 
  }
}

SmartTable.defaultProps = {
};

SmartTable.propTypes = {
};

export default SmartTable; //
