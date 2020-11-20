import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SmartFormModal from '@/common/SmartFormModal'; //
import HomeSettingForm from '@/components/Form/HomeSettingForm'; //
import HomeInspectMissionTable from '@/components/Table/HomeInspectMissionTable';
import HomeWorkOrderTable from '@/components/Table/HomeWorkOrderTable';
import HomeStatBox from '@/components/Widgets/HomeStatBox';
import HomeStatEcharts from '@/components/Widgets/HomeStatEcharts';
import HomeTitleRow, {
  HomeSettingBtn,
} from '@/components/Widgets/HomeTitleRow';

import { actions, mapStateToProps } from '@/models/home'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { SettingOutlined } from '@ant-design/icons';

export const TITLE = '首页';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
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

  renderPageTitle = params => {
    return (
      <HomeTitleRow
        {...this.props}
        title={this.pageTitle}
        showSetting={this.showSetting}
        right={
          <div className="settingWrapper dfc" onClick={this.showSetting}>
            {/* <Icon icon={'setting'} ></Icon> */}
            {/* <Icon icon={'home'} className={'setting'}></Icon> */}
            <SettingOutlined className={'setting'} />
            <div className="settingText">首页设置</div>
          </div>
        }
      ></HomeTitleRow>
    );
  };
  renderHomeStatBox = params => {
    return <HomeStatBox></HomeStatBox>;
  };
  renderHomeStatEcharts = params => {
    return <HomeStatEcharts></HomeStatEcharts>;
  };
  renderHomeInspectMissionTable = params => {
    return (
      <div className="">
        <div className="homeTitle">待巡检任务</div>
        <HomeInspectMissionTable></HomeInspectMissionTable>
      </div>
    );
  };
  renderHomeWorkOrderTable = params => {
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
    const { action } = this.props; //
    const formComProps = {
      action,
    };
    return <HomeSettingForm {...formComProps}></HomeSettingForm>;
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
      ' %c Home 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );

    return (
      <div className="omHome">
        {this.renderPageTitle()}
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
