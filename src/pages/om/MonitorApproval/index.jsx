import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SearchKwForm from '@/components/Form/SearchKwForm';
import MonitorApprovalTable from '@/components/Table/MonitorApprovalTable';
import MonitorApprovalForm from '@/components/Form/MonitorApprovalForm';
import SmartFormModal from '@/common/SmartFormModal';

import {
  actions,
  // mapStateToProps
} from '@/models/monitorApproval';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { tips } from '@/utils';
import { monitorApprovalImgConfig } from '@/configs';
import { PowerStationDetailTable } from '@/components/Table/PowerStationInfoTable';
import HouseNoForm from '@/components/Form/HouseNoForm';
import ClientForm from '@/components/Form/ClientForm';

const TITLE = '监控审批单';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  approval: `监控审批单`,
  approvalPass: `审批通过`,
  clientDetailAsync: `客户详情`,
  houseNoDetailAsync: `户号详情`,
  PowerStationDetailAsync: `电站详情`,
  powerNumberDetailAsync: `电源编号详情`,
};

const detailFormMap = {
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
          ></DetailForm>
        )}
      </SmartFormModal>
    );
  };

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props);
    const { action, itemDetail, d_id } = this.props;
    const { form, init } = props;
    if (['detail'].includes(action)) {
      this.props.onCancel({});
      return;
    }
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
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
          record_id: d_id,
        });
      }
      if (action === 'edit') {
        this.props.editItemAsync({
          ...res,
          d_id: d_id,
          record_id: d_id,
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
      userInfo: this.props.userInfo,
    };

    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps);
    if (action === 'approvalPass') {
      return <div className={`textCenter`}>确认审批通过？</div>;
    }
    return <MonitorApprovalForm {...formComProps}></MonitorApprovalForm>;
  };
  get okTxt() {
    return ['approval'].some(v => v === this.props.action) ? '上线完成' : null;
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
