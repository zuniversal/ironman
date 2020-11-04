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
import { getMonthWeekDaysSimple, nowYear, tips, filterArr } from '@/utils';

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
class ShiftsArrangeDetail extends PureComponent {
  constructor(props) {
    super(props);
    const items = { title: '班组一', start: '2020-10-08' };
    const calendarEvents = [
      items,
      { title: '班组一', start: '2020-10-09' },
      { title: '班组一', start: '2020-10-10' },
      { title: '班组一', start: '2020-10-11' },
    ];
    console.log(
      ' %c ShiftsArrangeDetail 组件 初始化 ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    this.state = {
      titleMap,
      isQuickArrange: false,
      calendarEvents,
      calendarEvents: [],
      selectData: this.props.dayList,
    };
  }
  // static getDerivedStateFromProps(nextProps, prevState, ) {
  //   console.log(' ShiftsArrangeDetail 组件getDerivedStateFromProps 数据变化 ： ', nextProps, prevState,   )//
  //   if (nextProps.dayList.length !== prevState.selectData.length) {
  //     return {
  //       selectData: nextProps.dayList,
  //     }
  //   }
  //   return null//
  // }

  // formatArrangeData = data => {
  //   console.log(' formatArrangeData,  , ： ', data, this.state, this.props);
  //   const { selectData } = this.state; //
  //   const { location } = this.props; //
  //   return selectData.map(v => ({
  //     team: location.query.team,
  //     schedule_date: `${location.query.schedule_date}-${v}`,
  //   }));
  // };
  // handleArrangeOk = params => {
  //   console.log('    handleArrangeOk ： ', params, this.state, this.props);
  //   const res = this.formatArrangeData();
  //   console.log('  res ：', res); //
  //   if (res.length) {
  //     // this.props.dispatch(actions.addItemAsync({ teamschedule_list: res }));
  //     this.props.addItemAsync({ teamschedule_list: res })
  //   } else {
  //     tips('请先对班组进行排班！', 1)
  //   }
  // };

  // formatParams = (params,  ) => {
  //   return {...params, schedule_date: params.schedule_date.format('YYYY-MM'), }
  // }
  // search = async params => {
  //   console.log('    search ： ', params);
  //   const { form } = params;
  //   try {
  //     const res = await form.validateFields();
  //     console.log('  search res await 结果  ：', res); //
  //     const searchParams = this.formatParams(res)
  //     console.log(' searchParams ： ', searchParams,  )//
  //     this.props.dispatch(actions.getListAsync(searchParams));
  //   } catch (error) {
  //     console.log(' error ： ', error); //
  //   }
  // };

  handleCancel = e => {
    console.log('    handleCancel ： ', e);
  };
  onFieldChange = params => {
    console.log(' onFieldChange,  , ： ', params);
    this.props.getListAsync(params.formData);
  };
  renderFormBtn = params => {
    console.log(' renderFormBtn ： ', params, actions); //
    return (
      <div className={'btnWrapper'}>
        {/* <Button type="primary" htmlType="submit"   >保存</Button> */}
        {/* <Button type="primary" onClick={this.showModal}>show</Button> */}
        {/* <Button type="primary" onClick={() => this.search(params)}>搜索</Button> */}
        {/* <Button type="primary" onClick={() => this.props.dispatch(actions.getItemAsync(params))}> */}
        <Button type="primary" onClick={() => this.props.search(params)}>
          {/* <Button type="primary" onClick={() => this.search(params)}> */}
          搜索
        </Button>
        <Button onClick={() => this.handleCancel()}>取消</Button>
        {/* <Button type="primary" onClick={() => this.handleArrangeOk()}> */}
        <Button
          type="primary"
          // onClick={params => this.props.dispatch(actions.addItemAsync(params))}
          onClick={this.props.addItemAsync}
        >
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
        // getTeam={params => this.props.dispatch(actions.getTeamAsync(params))}
        getTeam={this.props.getTeamAsync}
        teamList={this.props.teamList}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
        // onSubmit={this.onSubmit}
        // onFail={this.onFail}
      ></ShiftsArrangeSearchForm>
    );
  };
  // onFieldChange = params => {
  //   console.log('    onFieldChange ： ', params);
  //   this.props.setSearchInfo(params.value);
  // };
  onSelectChange = e => {
    console.log(
      ' onSelectChange   ,   ： ',
      e,
      e.target,
      this.state,
      this.props,
    );
    const { checked, day } = e.target;
    const { selectData } = this.state; //
    const datas = checked
      ? [...selectData, day]
      : selectData.filter(v => v != day);
    console.log('  datas ：', datas); //
    this.setState({
      selectData: datas,
    });
  };
  onChoiceRadio = e => {
    console.log(' onChoiceRadio   e, ,   ： ', e, this.state, this.props);
    const { calendarEvents, selectData } = this.state; //
    this.setState({
      isQuickArrange: !this.state.isQuickArrange,
      calendarEvents: calendarEvents.map(v => ({ ...v, isChecked: true })),
      selectData: filterArr([
        ...selectData,
        ...(e.target.value ? getMonthWeekDaysSimple : []),
      ]),
    });
  };
  renderChoiceRadio = params => {
    // console.log(' renderChoiceRadio ： ', params,  )
    const { isQuickArrange } = this.state; //
    return (
      <div className="choiceRadioWrapper">
        <div className="label">按法定工作日快速排班</div>{' '}
        <ChoiceRadio
          // onChange={this.onChoiceRadio}
          // value={isQuickArrange}
          value={this.props.isQuickArrange}
          // onChange={params => this.props.dispatch({
          //   type: 'shiftsArrange/onChoiceRadio',
          //   payload: params,
          // })}
          onChange={this.props.onChoiceRadio}
        ></ChoiceRadio>
      </div>
    );
  };

  renderShiftsArrangeDetailCalendar = params => {
    console.log(
      ' renderShiftsArrangeDetailCalendar ： ',
      params,
      this.state.selectData,
      this.state,
      this.props,
    );
    const { isQuickArrange, calendarEvents, selectData } = this.state; //
    return (
      <ShiftsArrangeDetailCalendar
        // isQuickArrange={isQuickArrange}
        // data={this.props.dataList}
        // selectData={selectData}
        // onSelectChange={this.onSelectChange}
        isQuickArrange={this.props.isQuickArrange}
        selectData={this.props.dayList}
        // onSelectChange={params => this.props.dispatch({
        //   type: 'shiftsArrange/onSelectChange',
        //   payload: params,
        // })}
        onCheck={this.props.onCheck}
      ></ShiftsArrangeDetailCalendar>
    );
  };
  componentDidMount() {
    this.props.getTeamAsync();
  }

  render() {
    return (
      <div className="shiftsArrangeDetail">
        {/* <PageTitle {...this.props} title={'新增/编辑排班'}></PageTitle> */}

        {this.renderSearchForm()}

        {this.renderChoiceRadio()}

        {this.renderShiftsArrangeDetailCalendar()}
      </div>
    );
  }
}

export default ShiftsArrangeDetail;
