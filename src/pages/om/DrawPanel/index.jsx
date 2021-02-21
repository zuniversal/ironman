import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SmartFormModal from '@/common/SmartFormModal'; //
// import DrawPanels from '@/components/Widgets/DrawPanel'; //
import DrawPanels from '@/components/Widgets/DrawPanels'; //

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

  saveDraw = params => {
    console.log(
      ' saveDraw,  , ： ',
      params,
      this.props,
      this.props.location.query.powerstation_id,
    );
    this.props.addCircuitItemAsync({
      power_station_id: this.props.location.query.powerstation_id,
      // d_id: this.props.location.query.powerstation_id,
      draw: params,
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
      ></DrawPanels>
    );
  };

  render() {
    return (
      <div className="drawPanel">
        {/* {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()} */}

        {this.renderDrawPanel()}
      </div>
    );
  }
}

export default DrawPanel;
