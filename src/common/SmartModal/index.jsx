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
import { Table, Icon, notification, Modal, Button, Tag } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import { isDev } from '@/constants';

export const SMALL_WIDTH = '400px';

// 封装带默认属性的 模态框

class SmartModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      disabled: true,
      // disabled: false,
    };
  }
  onShow = e => {
    this.setState({
      show: true,
    });
  };
  onOk = e => {
    const { customShow, onOk } = this.props;
    onOk && onOk();
  };
  onCancel = e => {
    const { customShow, onCancel } = this.props;
    onCancel && onCancel();
  };
  getCls = e => {
    const { width, size } = this.props;
    if (size === 'default') {
      return 'commonModal';
    }
    if (size === 'small') {
      return 'smallModal';
    }
  };
  getWidth = e => {
    const { width, size } = this.props;
    if (size === 'small') {
      return SMALL_WIDTH;
    }
    return width;
  };
  // 根据属性得出 title
  getTitle = e => {
    const { titleMap, action, title } = this.props;
    const actionTitle = titleMap[action];
    const content = actionTitle ? actionTitle : title;
    return (
      <div
        style={{
          width: '100%',
          cursor: 'move',
        }}
        onMouseOver={() => {
          if (this.state.disabled) {
            this.setState({
              disabled: false,
            });
          }
        }}
        onMouseOut={() => {
          this.setState({
            disabled: true,
          });
        }}
      >
        {content}
      </div>
    );
  };

  render() {
    const {
      children,
      title,
      width,
      className,
      hideOk,
      hideCancel,
      okTxt,
      extra,
      cancelTxt,
      maskClosable = false,
      show,
      size,
      extraBtn,
    } = this.props;

    const widths = this.getWidth();
    return (
      <Modal
        destroyOnClose
        wrapClassName={`smartModal ${className} ${this.getCls()}   `}
        // width={width != undefined ? width : '60%'}
        visible={show}
        // onShow={this.onShow}
        // onOk={this.onOk}
        // onCancel={this.onCancel}
        maskClosable={isDev ? true : maskClosable}
        modalRender={modal => (
          <Draggable disabled={this.state.disabled}>{modal}</Draggable>
        )}
        footer={[
          !hideCancel ? (
            <Button key="cancel" onClick={this.onCancel}>
              {cancelTxt}
            </Button>
          ) : null,
          !hideOk ? (
            <Button
              key="sure"
              onClick={this.onOk}
              type="primary"
              // icon={<SmileOutlined />}
              disabled={this.props.isOkDisabled}
            >
              {okTxt}
            </Button>
          ) : null,
          extraBtn(this.props),
        ]}
        {...this.props}
        width={widths}
        title={this.getTitle()}
      >
        {show ? children : null}
        {/* {children} */}
      </Modal>
    );
  }
}

// 默认属性
SmartModal.defaultProps = {
  title: '弹框标题',
  okTxt: '确定',
  cancelTxt: '取消',
  className: '',
  width: '800px',
  customShow: false,
  show: false,
  hideCancel: false,
  hideOk: false,
  titleMap: {}, // 模态框的标题映射 自动根据 相应actions 类型 自动获取标题
  size: 'default',
  extraBtn: () => {},
  isOkDisabled: false,
};

SmartModal.propTypes = {
  title: PropTypes.string,
  okTxt: PropTypes.string,
  cancelTxt: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.string,
  customShow: PropTypes.bool,
  show: PropTypes.bool,
  hideCancel: PropTypes.bool,
  hideOk: PropTypes.bool,
  titleMap: PropTypes.object,
  size: PropTypes.string,
};

export default SmartModal;
