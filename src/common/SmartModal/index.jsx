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
  onOk = e => {
    const { customShow, onOk } = this.props; //
    console.log('  onOk  customShow ', customShow, this.state, this.props);
    onOk && onOk();

    // if (customShow) {
    //   console.log(' 自定义 ： ',    )//
    //   return
    // }
    // console.log(' 自定义2 ： ',    )//

    // this.setState({
    //   show: false,
    // })
  };
  onCancel = e => {
    const { customShow, onCancel } = this.props; //
    console.log(
      '  onCancel  customShow ',
      customShow,
      this.state,
      this.props,
    );
    onCancel && onCancel();

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
        wrapClassName={`${className} ${noJustify ? '' : 'textJustify'} smartModal `}
        title={title}
        // width={width != undefined ? width : '60%'}
        width={width != undefined ? width : '800px'}
        visible={show}
        // onShow={this.onShow}
        onOk={this.onOk}
        onCancel={this.onCancel}
        maskClosable={maskClosable}
        footer={[
          <Button key="cancel" onClick={this.onCancel}>
            {cancelTxt != undefined ? cancelTxt : '取消'}
          </Button>,
          !isHideOk ? (
            <Button
              key="sure"
              onClick={this.onOk}
              type="primary"
              // icon={<SmileOutlined />}
            >
              {okTxt != undefined ? okTxt : '确定'}
            </Button>
          ) : null,
        ]}

        {...this.props} 

      >
        {show ? children : null}
        {/* {children} */}
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
