import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SearchKwForm from '@/components/Form/SearchKwForm';
import MonitorApprovalTable from '@/components/Table/MonitorApprovalTable';
import MonitorApprovalForm from '@/components/Form/MonitorApprovalForm';
import { MonitorApprovalRemarkForm } from '@/components/Form/MonitorApprovalActionForm';
import SmartFormModal from '@/common/SmartFormModal';

import {
  actions,
  // mapStateToProps
} from '@/models/monitorApproval';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { tips, getItem } from '@/utils';
import { monitorApprovalImgConfig, PASS_APPROVAL } from '@/configs';
import { PowerStationDetailTable } from '@/components/Table/PowerStationInfoTable';
import HouseNoForm from '@/components/Form/HouseNoForm';
import ClientForm from '@/components/Form/ClientForm';
import MeterForm from '@/components/Form/MeterForm';
import RealDataImei from '@/pages/om/SmartMonitor/RealDataImei';

const TITLE = '监控审批单';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  approval: `监控审批单`,
  approvalPass: `审批通过`,
  getRealDataAsync: `监控数据`,
  clientDetailAsync: `客户详情`,
  houseNoDetailAsync: `户号详情`,
  PowerStationDetailAsync: `电站详情`,
  powerNumberDetailAsync: `电源编号详情`,
  meterNumberDetailAsync: `电表号详情`,
  monitorApprovalDetailAsync: `${TITLE}详情`,
  monitorApprovalRemarkAsync: `监控审备注`,
};

const detailFormMap = {
  meterNumberDetailAsync: () => <div></div>,
  monitorApprovalRemarkAsync: MonitorApprovalRemarkForm,
  meterNumberDetailAsync: MeterForm,
  monitorApprovalDetailAsync: MonitorApprovalForm,
  clientDetailAsync: ClientForm,
  houseNoDetailAsync: HouseNoForm,
  powerNumberDetailAsync: PowerStationDetailTable,
};

const mapStateToProps = ({ monitorApproval, user }) => ({
  ...monitorApproval,
  userInfo: user.userInfo,
});
@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class MonitorApproval extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  renderFormBtn = params => {
    return <div className={'btnWrapper'}></div>;
  };
  renderSearchForm = params => {
    return (
      <SearchKwForm
        formBtn={this.renderFormBtn}
        className={'fje'}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
        label={'imei/审批人/工作人员/客户/电站/户号/工程编号'}
        keyword={'keyword'}
        noLabel
      ></SearchKwForm>
    );
  };
  onFieldChange = params => {
    console.log(
      ' onFieldChange,  , ： ',
      params,
      params.value,
      params.formData,
      this.props,
    );
    const { form } = params;
    this.props.getListAsync({ ...params.formData, page: 1 });
  };

  renderTable = params => {
    const tableProps = {
      onSelectChange: this.props.onSelectChange,
      dataSource: this.props.dataList,

      count: this.props.count,
      authInfo: this.props.authInfo,
      searchInfo: this.props.searchInfo,
      getListAsync: this.props.getListAsync,
      showDetail: this.props.getItemAsync,
      edit: this.props.getItemAsync,
      remove: this.onRemove,
      showFormModal: this.props.showFormModal,
      showItemAsync: this.props.showItemAsync,
      remarkAsync: this.props.remarkAsync,
    };

    return <MonitorApprovalTable {...tableProps}></MonitorApprovalTable>;
  };
  renderCommonModal = params => {
    const DetailForm = detailFormMap[this.props.common.action];
    return (
      <SmartFormModal
        show={this.props.common.isShowCommonModal}
        action={this.props.common.action}
        titleMap={titleMap}
        onOk={this.props.closeCommonModal}
        onCancel={this.props.closeCommonModal}
      >
        {DetailForm && (
          <DetailForm
            init={this.props.common.itemDetail}
            action={'detail'}
            {...this.props.common.extraData}
            showItemAsync={this.props.showItemAsync}
          ></DetailForm>
        )}
      </SmartFormModal>
    );
  };

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props);
    const { action, itemDetail, d_id } = this.props;
    const { form, init } = props;

    const worker_id = getItem('userInfo').user.id;
    if (action === 'approvalPass') {
      this.props.approvalPassAsync({
        ...this.props.itemDetail,
        status: PASS_APPROVAL,
        d_id: this.props.itemDetail.id,
        record_id: this.props.itemDetail.id,
        worker_id,
      });
    }
    if (['getRealDataAsync', 'monitorApprovalDetailAsync'].includes(action)) {
      this.props.onCancel({});
      return;
    }
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
      if (typeof res.other_img !== 'string') {
        if (res.other_img && res.other_img.fileList.length > 0) {
          const fileList = res.other_img.fileList;
          res.other_img = fileList[fileList.length - 1].response.url;
        } else {
          res.other_img = '';
        }
      }
      // return
      if (action === 'exportDutyData') {
        this.props.exportData({
          reqMethod: 'exportDutyDataAsync',
          // type: 'month',
          station_id: this.props.d_id,
          year_month: res.month.format('YYYY-MM'),
        });
        return;
      }
      const formatImg = () => {
        console.log(' formatImg   ,   ： ');
        monitorApprovalImgConfig.forEach(key => {
          if (typeof res[key] !== 'string') {
            if (res[key] && res[key].fileList.length > 0) {
              const fileList = res[key].fileList;
              res[key] = fileList[fileList.length - 1].response.url;
            } else {
              // tips('文件不能为空！', 2);
              // return;
              res[key] = '';
            }
          }
        });
      };
      formatImg();
      res.updated_time = res.updated_time
        ? res.updated_time.format('YYYY-MM-DD')
        : null;
      if (action === 'approval') {
        this.props.approvalAsync({
          ...res,
          d_id: d_id,
          id: this.props.itemDetail.id,
          record_id: this.props.itemDetail.id,
          worker_id,
        });
      }
      if (action === 'monitorApprovalRemarkAsync') {
        this.props.monitorApprovalRemarkAsync({
          ...res,
          d_id: this.props.itemDetail.id,
          record_id: this.props.itemDetail.id,
        });
      }
    } catch (error) {
      console.log(' error ： ', error);
    }
  };

  renderModalContent = e => {
    const { action } = this.props;
    const formComProps = {
      action,
      showItemAsync: this.props.showItemAsync,
      // userInfo: this.props.userInfo,
    };

    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps);
    if (action === 'approvalPass') {
      return <div className={`textCenter`}>确认审批通过？</div>;
    }
    if (action === 'getRealDataAsync') {
      return <RealDataImei {...this.props.realDataParams}></RealDataImei>;
    }
    if (action === 'monitorApprovalDetailAsync') {
      formComProps.action = 'detail';
    }
    if (action === 'monitorApprovalRemarkAsync') {
      return (
        <MonitorApprovalRemarkForm
          {...formComProps}
        ></MonitorApprovalRemarkForm>
      );
    }
    return <MonitorApprovalForm {...formComProps}></MonitorApprovalForm>;
  };
  get size() {
    // console.log(' get 取属 size ： ', this.state, this.props);
    return ['approvalPass', 'monitorApprovalRemarkAsync'].some(
      v => v === this.props.action,
    )
      ? 'small'
      : 'default';
  }
  get okTxt() {
    return ['approval'].some(v => v === this.props.action)
      ? '上线完成'
      : '确定';
  }
  renderSmartFormModal = params => {
    return (
      <SmartFormModal
        show={this.props.isShowModal}
        action={this.props.action}
        titleMap={this.state.titleMap}
        onOk={this.onOk}
        onCancel={this.props.onCancel}
        size={this.size}
        isNoForm={this.isNoForm}
        okTxt={this.okTxt}
      >
        {this.renderModalContent()}
      </SmartFormModal>
    );
  };
  componentDidMount() {
    // setTimeout(() => {
    //   console.log('  延时器 ： ',  )
    //   this.props.showFormModal({
    //     action: 'edit',
    //     d_id: 1,
    //   });
    // }, 2000)
  }

  render() {
    console.log(
      ' %c MonitorApproval 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    return (
      <div className="MonitorApproval">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {this.renderCommonModal()}
      </div>
    );
  }
}

export default MonitorApproval;
