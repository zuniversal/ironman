import React, { Component, PureComponent } from 'react';
import './style.less';

import {
  Form,
  Input,
  Button,
  Checkbox,
  Menu,
  Upload,
  Result,
  Typography,
  Divider,
} from 'antd';
import SearchForm from '@/common/SearchForm'; //
import ResultModal from '@/components/Modal/ResultModal'; //
import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import CsHomeStationTable from '@/components/Table/CsHomeStationTable';
import CsHomeTabsTable from '@/components/Table/CsHomeTabsTable';
import DropDownBtn from '@/common/DropDownBtn'; //
import CsHomeMonitor from '@/components/Widgets/CsHomeMonitor';
import CsHomeVideo from '@/components/Widgets/CsHomeVideo';
import CsHomeStatBox from '@/components/Widgets/CsHomeStatBox';
import CsHomeMonitorVideo from '@/components/Widgets/CsHomeMonitorVideo';
import CsHomeStatEcharts from '@/components/Widgets/CsHomeStatEcharts';

import { actions, mapStateToProps } from '@/models/csHome'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { ANIMATE } from '@/constants'; //

export const TITLE = '排班';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  newRelated: `关联新增`,
  upload: `文件上传`,
  down: `文件下载`,
};

// const mapStateToProps = ({ client, }) => client;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class CsHome extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  renderCsHomeMonitor = params => {
    console.log(' renderCsHomeMonitor ： ', params, this.state, this.props);

    return (
      <div className="monitorWrapper df">
        <div className={`left ${ANIMATE.bounceInLeft} `}>
          <CsHomeMonitor></CsHomeMonitor>
        </div>
        <div className={`center ${ANIMATE.zoomIn} `}>
          <CsHomeVideo></CsHomeVideo>
        </div>
        <div className={`right ${ANIMATE.bounceInRight} `}>
          <CsHomeMonitorVideo></CsHomeMonitorVideo>
        </div>
      </div>
    );
  };
  renderCsHomeStationTable = params => {
    console.log(
      ' renderCsHomeStationTable ： ',
      params,
      this.state,
      this.props,
    );

    return <CsHomeStationTable></CsHomeStationTable>;
  };
  renderSelectForm = params => {
    console.log(' renderSelectForm ： ', params, this.state, this.props);

    return (
      <div className="selectWrapper">
        <div className="label">站点</div>
        <SearchForm suffixIcon={null}></SearchForm>
      </div>
    );
  };
  renderCsHomeStatBox = params => {
    console.log(' renderCsHomeStatBox ： ', params, this.state, this.props);

    return <CsHomeStatBox></CsHomeStatBox>;
  };
  renderCsHomeStatEcharts = params => {
    console.log(' renderCsHomeStatEcharts ： ', params, this.state, this.props);

    return <CsHomeStatEcharts></CsHomeStatEcharts>;
  };
  renderCsHomeTabsTable = params => {
    console.log(' renderCsHomeTabsTable ： ', params, this.state, this.props);

    return <CsHomeTabsTable></CsHomeTabsTable>;
  };
  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { action, itemDetail } = this.props; //
    const { form, init } = props; //
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action); //
      if (action === 'setting') {
        // this.props.homeSetting({
        //   ...res,
        // });
      }
    } catch (error) {
      console.log(' error ： ', error); //
    }
  };

  renderModalContent = e => {
    const { action } = this.props; //
    const formComProps = {
      action,
    };
    if (action === 'weakDetail') {
      return (
        <CsHomeTabsTable
          showFormModal={this.props.showFormModal}
        ></CsHomeTabsTable>
      );
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

  render() {
    console.log(
      ' %c CsHome 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );

    return (
      <div className="csHome">
        {this.renderCsHomeStatBox()}
        {this.renderSelectForm()}
        {this.renderCsHomeMonitor()}
        {this.renderCsHomeStatEcharts()}
        {this.renderCsHomeStationTable()}
        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default CsHome;
