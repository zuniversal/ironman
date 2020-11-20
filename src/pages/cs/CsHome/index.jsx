import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SearchForm from '@/common/SearchForm'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import CsHomeStationTable from '@/components/Table/CsHomeStationTable';
import CsHomeTabsTable from '@/components/Table/CsHomeTabsTable';
import CsHomeMonitor from '@/components/Widgets/CsHomeMonitor';
import CsHomeVideo from '@/components/Widgets/CsHomeVideo';
import CsHomeStatBox from '@/components/Widgets/CsHomeStatBox';
import CsHomeMonitorVideo from '@/components/Widgets/CsHomeMonitorVideo';
import CsHomeStatEcharts from '@/components/Widgets/CsHomeStatEcharts';
import HomeTitleRow from '@/components/Widgets/HomeTitleRow';
import SmartVideo from '@/common/SmartVideo'; //

import { actions, mapStateToProps } from '@/models/csHome'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { ANIMATE, MINI_POWER } from '@/constants'; //
import Icon from '@/components/Widgets/Icons'; //

export const TITLE = '排班';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
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
    return (
      <div className="monitorWrapper df">
        <div className={`left ${ANIMATE.bounceInLeft} `}>
          <CsHomeMonitor></CsHomeMonitor>
        </div>
        <div className={`center ${ANIMATE.zoomIn} `}>
          {/* <CsHomeVideo></CsHomeVideo> */}
          <div className="csHomeVideo ">
            <SmartVideo></SmartVideo>
          </div>
        </div>
        <div className={`right ${ANIMATE.bounceInRight} `}>
          <CsHomeMonitorVideo></CsHomeMonitorVideo>
        </div>
      </div>
    );
  };
  renderCsHomeStationTable = params => {
    return (
      <CsHomeStationTable
        showFormModal={this.props.showFormModal}
      ></CsHomeStationTable>
    );
  };
  renderSelectForm = params => {
    return (
      <div className="selectWrapper">
        <div className="label">站点</div>
        <SearchForm suffixIcon={null}></SearchForm>
      </div>
    );
  };
  renderPageTitle = params => {
    return (
      <HomeTitleRow
        {...this.props}
        title={this.props.route.title}
        right={
          <Icon
            icon={'miniPower'}
            className={'miniPower'}
            onClick={() => window.open(MINI_POWER)}
          ></Icon>
        }
      ></HomeTitleRow>
    );
  };
  renderCsHomeStatBox = params => {
    return <CsHomeStatBox></CsHomeStatBox>;
  };
  renderCsHomeStatEcharts = params => {
    return <CsHomeStatEcharts></CsHomeStatEcharts>;
  };
  renderCsHomeTabsTable = params => {
    return <CsHomeTabsTable></CsHomeTabsTable>;
  };
  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { action, itemDetail } = this.props; //
    const { form, init } = props; //
    if (action === 'weakDetail') {
      this.props.onCancel({});
      return;
    }
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
    return (
      <div className="csHome">
        {this.renderPageTitle()}
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
