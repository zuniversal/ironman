import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types'
import './style.less';
import { Table, Icon, notification, Modal, Button, Tag } from 'antd';
import { SmileOutlined } from '@ant-design/icons';


// 封装带默认属性的 模态框


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

  };

  // 根据属性得出 title 
  getTitle = (e,  ) => {
    const {title,  } = this.state// 
    const {titleMap, action,  } = this.props// 
    const actionTitle = titleMap[action]
    console.log('    getTitle ： ', e, this.state, this.props, actionTitle,   )
    if (actionTitle) {
      return actionTitle
    }
    return title 
  }

  render() {
    const {
      children,
      title,
      width,
      className,
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
        wrapClassName={`${className} smartModal  `}
        // width={width != undefined ? width : '60%'}
        width={width}
        visible={show}
        // onShow={this.onShow}
        onOk={this.onOk}
        onCancel={this.onCancel}
        maskClosable={maskClosable}
        footer={[
          <Button key="cancel" onClick={this.onCancel}>
            {cancelTxt}
          </Button>,
          !isHideOk ? (
            <Button
              key="sure"
              onClick={this.onOk}
              type="primary"
              // icon={<SmileOutlined />}
            >
              {okTxt}
            </Button>
          ) : null,
        ]}

        {...this.props} 
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
  title: '默认标题',
  okTxt: '确定',
  cancelTxt: '取消',
  className: '',
  width: '800px',
  customShow: false,
  show: false,
  isHideOk: false,
  titleMap: {},  // 模态框的标题映射 自动根据 相应actions 类型 自动获取标题

};

SmartModal.propTypes = {
  title: PropTypes.string,
  okTxt: PropTypes.string,
  cancelTxt: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.string,
  customShow: PropTypes.bool,
  show: PropTypes.bool,
  isHideOk: PropTypes.bool,
  titleMap: PropTypes.object,
  

}


export default SmartModal;
