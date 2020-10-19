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
import {
  UploadOutlined,
  PlusOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
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
      show: false,
      showResultModal: false,

      showModalCom: null,
      modalContent: null,

      action: '',
      title: '',

      titleMap,
    };
  }

  menuClick = params => {
    const { key, clickFn } = params;
    console.log(' menuClick,  , ： ', params, this.state.titleMap, params.key);
    if (clickFn) {
      this[clickFn](params);
      return;
    }
  };

  onSubmit = (e, rest) => {
    console.log('    onSubmit ： ', e, rest);
  };
  onFail = (e, rest) => {
    console.log('    onFail ： ', e, rest);
  };

  showModal = e => {
    console.log('    showModal ： ', e);
    this.setState({
      show: true,
    });
  };
  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { form } = props; //

    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res); //
      const { newTbData } = this.state; //
      this.setState({
        show: false,
        newTbData: [res, ...newTbData],
      });
    } catch (error) {
      console.log(' error ： ', error); //
    }

    // form
    // .validateFields()
    // .then(values => {
    //   console.log('  values await 结果  ：', values,  )//
    //   form.resetFields();
    //   // onCreate(values);
    // })
    // .catch(info => {
    //   console.log('Validate Failed:', info);
    // });
  };
  onCancel = e => {
    console.log(' onCancel ： ', e, this.state, this.props); //
    this.setState({
      show: false,
    });
  };

  goPage = page => {
    console.log(' goPage,  , ： ', page, this.state, this.props);
    const { history } = this.props; //
    history.push(page);
  };

  renderHomeStatBox = params => {
    console.log(' renderHomeStatBox ： ', params, this.state, this.props);
    const { show, title, action, titleMap } = this.state; //

    return <HomeStatBox></HomeStatBox>;
  };
  renderHomeStatEcharts = params => {
    console.log(' renderHomeStatEcharts ： ', params, this.state, this.props);
    const { show, title, action, titleMap } = this.state; //

    return <HomeStatEcharts></HomeStatEcharts>;
  };
  renderHomeInspectMissionTable = params => {
    console.log(
      ' renderHomeInspectMissionTable ： ',
      params,
      this.state,
      this.props,
    );
    const { show, title, action, titleMap } = this.state; //
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
    const { show, title, action, titleMap } = this.state; //
    return (
      <div className="">
        <div className="homeTitle">待处理工单</div>
        <HomeWorkOrderTable></HomeWorkOrderTable>
      </div>
    );
  };

  getPageTitle = e => {
    console.log('    getPageTitle ： ', e, this.state, this.props);
    const { title } = this.props.route; //
    return title;
  };
  showSetting = e => {
    console.log('    showSetting ： ', e);
    this.setState({
      show: true,
      action: 'setting',
      modalForm: HomeSettingForm,
    });
  };

  renderModalForm = e => {
    console.log('    renderModalForm ： ', e, this.state, this.props);
    const { modalForm } = this.state; //
    if (modalForm) {
      return modalForm;
    }
  };
  renderSmartFormModal = params => {
    console.log(' renderSmartFormModal ： ', params, this.state, this.props);
    const { show, title, action, titleMap } = this.state; //

    return (
      <SmartFormModal
        // width={'900px'}

        title={title}
        show={show}
        onOk={this.onOk}
        onCancel={this.onCancel}
        action={action}
        titleMap={titleMap}
        // formComProps={formComProps}
        FormCom={this.renderModalForm()}
      >
        {/* {this.renderFormModalContent()} */}
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
          title={this.getPageTitle()}
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
