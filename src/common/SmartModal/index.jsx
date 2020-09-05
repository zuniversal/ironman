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
import { Table, Icon, notification, Modal, Button, Tag } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

class SmartModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  onShow = e => {
    console.log('    onShow ： ', e);
    this.setState({
      show: true,
    });
  };
  handleOk = e => {
    const { customShow, handleOk } = this.props; //
    console.log('  handleOk  customShow ', customShow, this.state, this.props);
    handleOk && handleOk();

    // if (customShow) {
    //   console.log(' 自定义 ： ',    )//
    //   return
    // }
    // console.log(' 自定义2 ： ',    )//

    // this.setState({
    //   show: false,
    // })
  };
  handleClose = e => {
    const { customShow, onClose } = this.props; //
    console.log(
      '  handleClose  customShow ',
      customShow,
      this.state,
      this.props,
    );
    onClose && onClose();

    // if (customShow) {
    //   console.log(' 自定义 ： ',    )//
    //   return
    // }
    // console.log(' 自定义2 ： ',    )//

    // this.setState({
    //   show: false,
    // })
  };

  render() {
    const {
      children,
      title,
      width,
      className,
      noJustify,
      isHideOk,
      okTxt,
      extra,
      cancelTxt,
      maskClosable,
      show,
    } = this.props;

    // const {show,  } = this.state//

    console.log(
      ' %c SmartModal 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    ); //

    return (
      <Modal
        className={`${className} ${noJustify ? '' : 'textJustify'}`}
        title={title}
        width={width != undefined ? width : '60%'}
        visible={show}
        // onShow={this.onShow}
        onOk={this.handleOk}
        onCancel={this.handleClose}
        maskClosable={maskClosable}
        footer={[
          <Button key="cancel" onClick={this.handleClose}>
            {cancelTxt != undefined ? cancelTxt : '取消'}
          </Button>,
          extra != undefined ? extra : null,
          !isHideOk ? (
            <Button
              key="sure"
              onClick={this.handleOk}
              type="primary"
              icon={<SmileOutlined />}
            >
              {okTxt != undefined ? okTxt : '確認'}
            </Button>
          ) : null,
        ]}
      >
        {show ? children : null}
      </Modal>
    );
  }
}

SmartModal.defaultProps = {
  title: '默认标题',
  className: '',
  customShow: false,
};

export default SmartModal;
