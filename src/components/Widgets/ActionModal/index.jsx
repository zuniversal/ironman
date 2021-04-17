import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import SmartModal from '@/common/SmartModal';
import { RemoveModal } from '@/components/Modal/ResultModal';
import { SIZE, ANIMATE, INPUT_TXT } from '@/constants';
import { tips, mockTbData, foramtText } from '@/utils';

class SmartTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowResultModal: false,
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
    const { isShowResultModal } = this.state;
    const { title } = this.props;

    const modalProps = {
      title,
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
  };

  render() {
    return this.renderRemoveModal();
  }
}

SmartTable.defaultProps = {
  title: '默认删除标题',
};

SmartTable.propTypes = {
  title: PropTypes.string,
};

export default SmartTable;
