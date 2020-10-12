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
import ShiftsArrangeSearchForm from '@/components/Form/ShiftsArrangeSearchForm'; //
import ResultModal from '@/components/Modal/ResultModal'; //
import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import DropDownBtn from '@/common/DropDownBtn'; //
import ErrorInfo from '@/components/Widgets/ErrorInfo';
import UploadFileCom from '@/components/Widgets/UploadFileCom'; //
import SuccResult from '@/components/Widgets/SuccResult'; //
import ShiftsArrangeDetailCalendar from '@/components/Calendar/ShiftsArrangeDetailCalendar';
import ChoiceRadio from '@/components/Widgets/ChoiceRadio'; //
import PageTitle from '@/components/Widgets/PageTitle'; //

import { actions, mapStateToProps } from '@/models/shiftsArrange'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { getMonthWeekDaysSimple } from '@/utils';

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
class ShiftsArrangeDetail extends PureComponent {
  constructor(props) {
    super(props);
    const items = { title: '班组一', start: '2020-10-08' };
    const items2 = {
      title: '部门会议x',
      start: '2020-10-09',
      display: 'background',
    };
    const calendarEvents = [
      items, { title: '班组一', start: '2020-10-09' }, { title: '班组一', start: '2020-10-10' }, { title: '班组一', start: '2020-10-11' }, 
      // items2
    ];
    this.state = {
      show: false,
      showResultModal: false,

      showModalCom: null,
      modalContent: null,

      action: '',
      title: '',

      titleMap,

      newTbData: [],
      isQuickArrange: false,  
      calendarEvents,
      selectData: [],  
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

  handleCancel = e => {
    console.log('    handleCancel ： ', e);
  };
  handleOk = e => {
    console.log('    handleOk ： ', e);
  };
  search = async params => {
    console.log('    search ： ', params);
    const { form } = params;
    try {
      const res = await form.validateFields();
      console.log('  search res await 结果  ：', res); //
      actions.getItemAsync(res);
    } catch (error) {
      console.log(' error ： ', error); //
    }
  };

  renderFormBtn = params => {
    console.log(' renderFormBtn ： ', params, actions); //
    return (
      <div className={'btnWrapper'}>
        {/* <Button type="primary" htmlType="submit"   >保存</Button> */}
        {/* <Button type="primary" onClick={this.showModal}>show</Button> */}
        <Button type="primary" onClick={() => this.search(params)}>搜索</Button>
        {/* <Button type="primary" onClick={() => this.props.dispatch(actions.getItemAsync(params))}>
          搜索
        </Button> */}
        <Button onClick={() => this.handleCancel()}>取消</Button>
        <Button type="primary" onClick={() => this.handleOk()}>
          确定
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    // console.log(' renderSearchForm ： ', params,  )
    return (
      <ShiftsArrangeSearchForm
        formBtn={this.renderFormBtn}
        // onSubmit={this.onSubmit}
        // onFail={this.onFail}
      ></ShiftsArrangeSearchForm>
    );
  };
  onSelectChange = (e, ) => {
    console.log(' onSelectChange   ,   ： ', e, e.target, this.state, this.props,  )
    const {checked, day,  } = e.target 
    const {selectData,  } = this.state// 
    const datas = checked ? [...selectData, day, ] : selectData.filter((v) => v !== day)
    console.log('  datas ：', datas,  )//     
    this.setState({
      selectData: datas,
    })
  }
  onChoiceRadio = (e, ) => {
    console.log(' onChoiceRadio   e, ,   ： ', e, this.state, this.props,   )
    const {calendarEvents, selectData,   } = this.state// 
    this.setState({
      isQuickArrange: !this.state.isQuickArrange,
      calendarEvents: calendarEvents.map((v) => ({...v, isChecked: true,  })),
      selectData: [...getMonthWeekDaysSimple, ],
    })
  }
  renderChoiceRadio = params => {
    // console.log(' renderChoiceRadio ： ', params,  )
    const {isQuickArrange,  } = this.state// 
    return <div className="choiceRadioWrapper" >
      <div className="label" >按法定工作日快速排班</div> <ChoiceRadio onChange={this.onChoiceRadio} value={isQuickArrange} ></ChoiceRadio>
    </div>;
  };

  renderShiftsArrangeDetailCalendar = params => {
    // console.log(' renderShiftsArrangeDetailCalendar ： ', params,  )
    const {isQuickArrange, calendarEvents, selectData,  } = this.state// 
    return <ShiftsArrangeDetailCalendar 
      isQuickArrange={isQuickArrange} 
      data={calendarEvents} 
      selectData={selectData} 
      onSelectChange={this.onSelectChange} 
    ></ShiftsArrangeDetailCalendar>;
  };

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
  };

  render() {
    console.log(
      ' %c ShiftsArrangeDetail 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );

    return (
      <div className="shiftsArrangeDetail">
        <PageTitle {...this.props} title={'新增/编辑排班'} ></PageTitle>

        {this.renderSearchForm()}

        {this.renderChoiceRadio()}

        {this.renderShiftsArrangeDetailCalendar()}
      </div>
    );
  }
}

export default ShiftsArrangeDetail;
