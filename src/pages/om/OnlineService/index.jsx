import React, { PureComponent } from 'react';
import './style.less';
import { Button, Radio } from 'antd';
import SmartFormModal from '@/common/SmartFormModal'; //
import ChatWindow from '@/components/Widgets/ChatWindow'; //
import { actions, mapStateToProps } from '@/models/onlineService'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '回访';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  complete: `处理回访`,
};

// const mapStateToProps = ({ onlineService, }) => onlineService;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class OnlineService extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  // renderSmartFormModal = params => {
  //   return (
  //     <SmartFormModal
  //       show={this.props.isShowModal}
  //       action={this.props.action}
  //       titleMap={this.state.titleMap}
  //       onOk={this.onOk}
  //       onCancel={this.props.onCancel}
  //       size={this.size}
  //     >
  //       {this.renderModalContent()}
  //     </SmartFormModal>
  //   );
  // };

  render() {
    console.log(
      ' %c OnlineService 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    ); //
    return (
      <div className="OnlineService">
        <ChatWindow></ChatWindow>
        {/* {this.renderSmartFormModal()} */}
      </div>
    );
  }
}

export default OnlineService;
