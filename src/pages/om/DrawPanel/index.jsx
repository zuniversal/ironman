import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SmartFormModal from '@/common/SmartFormModal'; //
// import DrawPanels from '@/components/Widgets/DrawPanel'; //
import DrawPanels from '@/components/Widgets/DrawPanels'; //
import Preview from '@/components/Widgets/DrawPanels/Preview'; //

import { actions, mapStateToProps } from '@/models/drawPanel'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { tips } from '@/utils';

const TITLE = '指标';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
  preview: `预览`,
};

// const mapStateToProps = ({ drawPanel, }) => drawPanel;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class DrawPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  renderModalContent = e => {
    const { action } = this.props; //
    const formComProps = {
      action,
      data: this.props.canvasData,
      show: this.props.isShowModal,
      realParams: this.props.location.query,
    };
    console.log(' formComProps ： ', formComProps, this.props); //

    if (action === 'preview') {
      return <Preview {...formComProps}></Preview>;
    }
  };

  renderSmartFormModal = params => {
    return (
      <SmartFormModal
        show={this.props.isShowModal}
        action={this.props.action}
        titleMap={this.state.titleMap}
        onOk={this.onOk}
        onCancel={this.props.onCancel}
      >
        {this.renderModalContent()}
      </SmartFormModal>
    );
  };

  saveDraw = params => {
    console.log(
      ' saveDraw,  , ： ',
      params,
      this.props,
      this.props.location.query.powerstation_id,
    );
    if (params.circuit_id) {
      this.props.editCircuitItemAsync({
        circuit_id: params.circuit_id,
        power_station_id: this.props.location.query.powerstation_id,
        draw: params.draw,
      });
    } else {
      this.props.addCircuitItemAsync({
        power_station_id: this.props.location.query.powerstation_id,
        draw: params.draw,
      });
    }
  };
  removeDraw = params => {
    console.log(' removeDraw,  , ： ', params);
    this.props.removeCircuitItemAsync({
      circuit_id: params,
      power_station_id: this.props.location.query.powerstation_id,
    });
  };
  renderDrawPanel = params => {
    console.log(' renderDrawPanel,  , ： ', params);
    return (
      <DrawPanels
        {...this.props}
        // saveDraw={(params, ) => {
        //   console.log(' saveDraw ： ', params   )//
        //   this.saveDraw(params)
        // }}
        saveDraw={this.saveDraw}
        showFormModal={this.props.showFormModal}
        circuitList={this.props.circuitList}
        powerPointList={this.props.powerPointList}
        clearCircurt={this.props.clearCircurt}
        removeDraw={this.removeDraw}
      ></DrawPanels>
    );
  };

  componentDidMount() {
    console.log(
      ' DrawPanel 组件componentDidMount挂载 ： ',
      this.state,
      this.props,
    ); //
    const { powerstation_id, number } = this.props.location.query;
    this.props.getCircuitItemAsync({
      power_station_id: powerstation_id,
    });
    this.props.getPowerPointListAsync({
      powerstation_id,
      number,
    });
    // this.props.getPowerPointListAsync({
    //   powerstation_id,
    //   number,
    // });
  }

  render() {
    return (
      <div className="drawPanel">
        {/* {this.renderSearchForm()}

        {this.renderTable()} */}

        {this.renderSmartFormModal()}

        {this.renderDrawPanel()}
      </div>
    );
  }
}

export default DrawPanel;
