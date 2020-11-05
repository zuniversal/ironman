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
import ShiftsArrangeForm from '@/components/Form/ShiftsArrangeForm'; //
import ShiftsArrangeSearchForm from '@/components/Form/ShiftsArrangeSearchForm'; //
import ResultModal from '@/components/Modal/ResultModal'; //
import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import DropDownBtn from '@/common/DropDownBtn'; //
import ErrorInfo from '@/components/Widgets/ErrorInfo';
import UploadFileCom from '@/components/Widgets/UploadFileCom'; //
import SuccResult from '@/components/Widgets/SuccResult'; //
import ShiftsArrangeCalendar from '@/components/Calendar/ShiftsArrangeCalendar';

import { actions, mapStateToProps } from '@/models/shiftsArrange'; //
import SmartHOC from '@/common/SmartHOC';
import { tips } from '@/utils';
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
  noMountFetch: true,
  // isCheckQuery: true,
})
class ShiftsArrange extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  goPage = page => {
    console.log(' goPage,  , ： ', page, this.state, this.props);
    const { history, searchInfo } = this.props; //
    console.log(' searchInfo ： ', searchInfo); //
    if (searchInfo.team && searchInfo.schedule_date) {
      const path = `${page}?team=${
        searchInfo.team
      }&schedule_date=${searchInfo.schedule_date.format('YYYY-MM')}`;
      history.push(path);
    } else {
      tips('请先选择班组及月份！', 2);
    }
  };
  formatParams = params => {
    return { ...params, schedule_date: params.schedule_date.format('YYYY-MM') };
  };
  search = async params => {
    console.log('    search ： ', params);
    const { form } = params;
    try {
      const res = await form.validateFields();
      console.log('  search res await 结果  ：', res); //
      if (!res.schedule_date) {
        tips('搜索月份不能为空！', 2);
        return;
      }
      const searchParams = this.formatParams(res);
      console.log(' searchParams ： ', searchParams); //
      // this.props.dispatch(actions.getListAsync(searchParams));
      this.props.getListAsync(searchParams);
    } catch (error) {
      console.log(' error ： ', error); //
    }
  };

  onFieldChange = params => {
    console.log(' onFieldChange,  , ： ', params);
    this.props.getListAsync(params.formData);
  };
  renderFormBtn = params => {
    console.log(' renderFormBtn ： ', params); //
    return (
      <div className={'btnWrapper'}>
        <Button type="primary" onClick={() => this.props.search(params)}>
          {/* <Button type="primary" onClick={() => this.search(params)}> */}
          搜索
        </Button>
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
    );
  };
  renderSearchForm = params => {
    console.log(
      ' renderSearchForm ShiftsArrangeSearchForm ： ',
      params,
      this.state,
      this.props,
    );
    return (
      <ShiftsArrangeSearchForm
        formBtn={this.renderFormBtn}
        // getTeam={(params) => this.props.dispatch(actions.getTeamAsync(params))}
        getTeam={this.props.getTeamAsync}
        teamList={this.props.teamList}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
      ></ShiftsArrangeSearchForm>
    );
  };
  // onFieldChange = params => {
  //   console.log('    onFieldChange ： ', params);
  //   this.props.setSearchInfo(params.value);
  // };

  renderShiftsArrangeCalendar = params => {
    // console.log(' renderShiftsArrangeCalendar ： ', params,  )
    return (
      <ShiftsArrangeCalendar data={this.props.dataList}></ShiftsArrangeCalendar>
    );
  };
  componentDidMount() {
    this.props.getTeamAsync();
  }

  render() {
    return (
      <div className="ShiftsArrange">
        {this.renderSearchForm()}

        {this.renderShiftsArrangeCalendar()}
      </div>
    );
  }
}

export default ShiftsArrange;
