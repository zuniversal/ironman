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
import HomeInspectMissionTable from '@/components/Table/HomeInspectMissionTable';
import HomeWorkOrderTable from '@/components/Table/HomeWorkOrderTable';
import DropDownBtn from '@/common/DropDownBtn'; //
import HomeStatBox from '@/components/Widgets/HomeStatBox';
import HomeStatEcharts from '@/components/Widgets/HomeStatEcharts';

import { actions, mapStateToProps } from '@/models/client'; //
import { connect } from 'umi';

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

  renderHomeStatBox(params) {
    console.log(' renderHomeStatBox ： ', params, this.state, this.props);
    const { show, title, action, titleMap } = this.state; //

    return <HomeStatBox></HomeStatBox>;
  }
  renderHomeStatEcharts(params) {
    console.log(' renderHomeStatEcharts ： ', params, this.state, this.props);
    const { show, title, action, titleMap } = this.state; //

    return <HomeStatEcharts></HomeStatEcharts>;
  }
  renderHomeInspectMissionTable(params) {
    console.log(
      ' renderHomeInspectMissionTable ： ',
      params,
      this.state,
      this.props,
    );
    const { show, title, action, titleMap } = this.state; //
    return (
      <div className="">
        <div className="title">待巡检任务</div>
        <HomeInspectMissionTable></HomeInspectMissionTable>
      </div>
    );
  }
  renderHomeWorkOrderTable(params) {
    console.log(
      ' renderHomeWorkOrderTable ： ',
      params,
      this.state,
      this.props,
    );
    const { show, title, action, titleMap } = this.state; //
    return (
      <div className="">
        <div className="title">待处理工单</div>
        <HomeWorkOrderTable></HomeWorkOrderTable>
      </div>
    );
  }

  render() {
    console.log(
      ' %c Home 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );

    return (
      <div className="omHome">
        {this.renderHomeStatBox()}
        {this.renderHomeStatEcharts()}
        {this.renderHomeInspectMissionTable()}
        {this.renderHomeWorkOrderTable()}
      </div>
    );
  }
}

export default Home;
