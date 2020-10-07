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
import ShiftsArrangeForm from '@/components/Form/ShiftsArrangeForm'; //
import ShiftsArrangeSearchForm from '@/components/Form/ShiftsArrangeSearchForm'; //
import ResultModal from '@/components/Modal/ResultModal'; //
import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import DropDownBtn from '@/common/DropDownBtn'; //
import ErrorInfo from '@/components/Widgets/ErrorInfo';
import UploadFileCom from '@/components/Widgets/UploadFileCom'; //
import SuccResult from '@/components/Widgets/SuccResult'; //
import ShiftsArrangeCalendar from '@/components/Widgets/ShiftsArrangeCalendar';

import { actions, mapStateToProps } from '@/models/shiftsArrange'; //
import SmartHOC from '@/common/SmartHOC';
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

// const mapStateToProps = ({ shiftsArrange, }) => shiftsArrange;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class ShiftsArrange extends PureComponent {
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

      newTbData: [],
    };
  }

  showResultModal = e => {
    console.log('    showResultModal ： ', e);
    this.setState({
      showResultModal: true,
    });
  };
  onResultModalCancel = e => {
    console.log('    onResultModalCancel ： ', e);
    this.setState({
      showResultModal: false,
    });
  };

  onUploadChange = params => {
    console.log(' onUploadChange,  , ： ', params);
    if (params.file.status === 'done') {
      setTimeout(() => {
        console.log('  延时器 ： ');
        this.setState({
          modalContent: <SuccResult></SuccResult>,
        });
      }, 2000);
    }
  };
  showUploadModal = params => {
    console.log('    showUploadModal ： ', params);
    //   const {item,  } = this.props//
    const { action } = params;

    this.setState({
      show: true,
      action,
      modalContent: (
        <UploadFileCom
          onChange={this.onUploadChange}
          label={titleMap[action]}
        ></UploadFileCom>
      ),
    });
  };
  downloadFile = params => {
    console.log('    downloadFile ： ', params);
    this.props.downloadFile();
  };

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

  renderModalContent = e => {
    console.log('    renderModalContent ： ', e, this.state, this.props);
    const { modalContent } = this.state; //
    if (modalContent) {
      return modalContent;
    }

    // return null
  };

  goPage = page => {
    console.log(' goPage,  , ： ', page, this.state, this.props);
    const { history } = this.props; //
    history.push(page);
  };
  renderSearchForm = params => {
    // console.log(' renderSearchForm ： ', params,  )
    return (
      <div className={'fsb '}>
        <ShiftsArrangeSearchForm></ShiftsArrangeSearchForm>
        <div className={'btnWrapper'}>
          <Button
            type="primary"
            onClick={() => this.goPage('/om/shiftsArrangeDetail')}
          >
            {TITLE}
          </Button>
          <Button type="primary" onClick={() => this.props.exportData()}>
            导出{TITLE}数据
          </Button>
        </div>
      </div>
    );
  }

  renderShiftsArrangeCalendar = params => {
    // console.log(' renderShiftsArrangeCalendar ： ', params,  )
    return <ShiftsArrangeCalendar></ShiftsArrangeCalendar>;
  }

  renderSmartModal = params => {
    console.log(' renderSmartModal ： ', params, this.state, this.props);
    const { show, title, action, titleMap } = this.state; //

    return (
      <SmartModal
        show={show}
        onOk={this.onOk}
        onCancel={this.onCancel}
        action={action}
        titleMap={titleMap}
      >
        {this.renderModalContent()}
      </SmartModal>
    );
  }

  render() {
    console.log(
      ' %c ShiftsArrange 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );

    return <div className="ShiftsArrange">{this.renderSearchForm()}</div>;
  }
}

export default ShiftsArrange;
