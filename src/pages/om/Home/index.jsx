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
import HomeSettingForm from '@/components/Form/HomeSettingForm'; //
import HomeInspectMissionTable from '@/components/Table/HomeInspectMissionTable';
import HomeWorkOrderTable from '@/components/Table/HomeWorkOrderTable';
import DropDownBtn from '@/common/DropDownBtn'; //
import HomeStatBox from '@/components/Widgets/HomeStatBox';
import HomeStatEcharts from '@/components/Widgets/HomeStatEcharts';
import HomeTitleRow, {
  HomeSettingBtn,
} from '@/components/Widgets/HomeTitleRow';

import { actions, mapStateToProps } from '@/models/home'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

export const TITLE = '首页';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  newRelated: `关联新增`,
  upload: `文件上传`,
  down: `文件下载`,
  setting: `${TITLE}设置`,
};

// const mapStateToProps = ({ client, }) => client;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  // modalForm: HomeSettingForm,
})
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  goPage = page => {
    console.log(' goPage,  , ： ', page, this.state, this.props);
    const { history } = this.props; //
    history.push(page);
  };

  renderHomeStatBox = params => {
    console.log(' renderHomeStatBox ： ', params, this.state, this.props);

    return <HomeStatBox></HomeStatBox>;
  };
  renderHomeStatEcharts = params => {
    console.log(' renderHomeStatEcharts ： ', params, this.state, this.props);

    return <HomeStatEcharts></HomeStatEcharts>;
  };
  renderHomeInspectMissionTable = params => {
    console.log(
      ' renderHomeInspectMissionTable ： ',
      params,
      this.state,
      this.props,
    );

    return (
      <div className="">
        <div className="homeTitle">待巡检任务</div>
        <HomeInspectMissionTable></HomeInspectMissionTable>
      </div>
    );
  };
  renderHomeWorkOrderTable = params => {
    console.log(
      ' renderHomeWorkOrderTable ： ',
      params,
      this.state,
      this.props,
    );

    return (
      <div className="">
        <div className="homeTitle">待处理工单</div>
        <HomeWorkOrderTable></HomeWorkOrderTable>
      </div>
    );
  };
  get pageTitle() {
    console.log(' get 取属 pageTitle ： ', this.state, this.props);
    const { title } = this.props.route; //
    return title;
  }
  showSetting = e => {
    console.log('    showSetting ： ', e);
    this.props.showFormModal({
      action: 'setting',
    });
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
    console.log('    renderModalContent ： ', e, this.state, this.props);
    const { action } = this.props; //
    const formComProps = {
      action,
    };
    return <HomeSettingForm {...formComProps}></HomeSettingForm>;
  };
  renderSmartFormModal = params => {
    console.log(' renderSmartFormModal ： ', params, this.state, this.props);

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
      ' %c Home 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );

    return (
      <div className="omHome">
        <HomeTitleRow
          {...this.props}
          title={this.pageTitle}
          showSetting={this.showSetting}
          // right={<HomeSettingBtn showSetting={this.showSetting} ></HomeSettingBtn>}
        ></HomeTitleRow>

        {this.renderHomeStatBox()}
        {this.renderHomeStatEcharts()}
        {this.renderHomeInspectMissionTable()}
        {this.renderHomeWorkOrderTable()}
        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default Home;
