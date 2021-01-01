import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SmartFormModal from '@/common/SmartFormModal'; //
import BussniessRecordSearchForm from '@/components/Form/BussniessRecordSearchForm'; //
import BussniessRecordForm from '@/components/Form/BussniessRecordForm'; //
import BussniessRecordPowerForm from '@/components/Form/BussniessRecordPowerForm'; //
import BussniessRecordTable from '@/components/Table/BussniessRecordTable'; //
import { actions, mapStateToProps } from '@/models/bussniessRecord'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { missionsTypeMap, missionsStatusMap } from '@/configs';

const TITLE = '业务记录';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `抢修详情`,
  powerDetail: `电力施工详情（同电气试验详情）`,
  upload: `文件上传`,
  down: `文件下载`,
};

// const mapStateToProps = ({ bussniessRecord, }) => bussniessRecord;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: BussniessRecordForm,
})
class BussniessRecord extends PureComponent {
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
      <BussniessRecordSearchForm
        formBtn={this.renderFormBtn}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
      ></BussniessRecordSearchForm>
    );
  };
  onFieldChange = params => {
    console.log(' onFieldChange,  , ： ', params);
    const { date } = params.formData;
    const searchParams = {
      ...params.formData,
    };
    if (params.value.date) {
      searchParams.start_time = date[0].format('YYYY-MM-DD');
      searchParams.end_time = date[1].format('YYYY-MM-DD');
    }
    this.props.getListAsync(searchParams);
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
    };

    return <BussniessRecordTable {...tableProps}></BussniessRecordTable>;
  };
  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { action, itemDetail } = this.props; //
    const { form, init } = props; //
    console.log(
      ' itemDetail, itemDetail.confirm ： ',
      itemDetail,
      itemDetail.confirm,
    ); //
    if (
      (action === 'detail' || action === 'powerDetail') &&
      !itemDetail.confirm
    ) {
      this.props.confirmAsync({
        d_id: itemDetail.id,
      });
      return;
    }
    if (action === 'detail' || action === 'powerDetail') {
      this.props.onCancel({});
      return;
    }
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action); //
      if (action === 'setting') {
        return <BussniessRecordForm {...formComProps}></BussniessRecordForm>;
      }
    } catch (error) {
      console.log(' error ： ', error); //
    }
  };

  // 任务状态已完成 - completed 确认按钮
  get hideOk() {
    console.log(' get 取属 hideOk ： ', this.state, this.props);
    const { status } = this.props.itemDetail;
    console.log(' statusstatus ： ', status, this.props.itemDetail); //
    return status && status === 'completed';
  }

  renderModalContent = e => {
    const { action } = this.props; //
    const formComProps = {
      action,
    };
    if (action !== 'add') {
      formComProps.init = {
        ...this.props.itemDetail,
        type: missionsTypeMap[this.props.itemDetail.type],
        status: missionsStatusMap[this.props.itemDetail.status],
      };
    }

    if (action === 'powerDetail') {
      return (
        <BussniessRecordPowerForm {...formComProps}></BussniessRecordPowerForm>
      );
    }

    if (action === 'detail') {
      return <BussniessRecordForm {...formComProps}></BussniessRecordForm>;
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
        // hideCancel
        hideOk={this.hideOk}
      >
        {this.renderModalContent()}
      </SmartFormModal>
    );
  };

  render() {
    return (
      <div className="bussniessRecord">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default BussniessRecord;
