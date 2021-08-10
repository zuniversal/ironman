import React, { PureComponent } from 'react';
import { Button } from 'antd';
import GroupReportSearchForm from '@/components/Form/GroupReportSearchForm';
import SmartFormModal from '@/common/SmartFormModal';

import { actions, mapStateToProps } from '@/models/groupReport';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { tips } from '@/utils';

const TITLE = '集团报告';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
};

// const mapStateToProps = ({ groupReport, }) => groupReport;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class GroupReport extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  renderFormBtn = params => {
    return (
      <div className={'btnWrapper'}>
        {/* <a href={'MONITOR_DEVICE_TPL'}> */}
        <Button type="primary">下载报告</Button>
        {/* </a> */}
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <GroupReportSearchForm
        formBtn={this.renderFormBtn}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
      ></GroupReportSearchForm>
    );
  };
  onFieldChange = params => {
    console.log(' onFieldChange,  , ： ', params);
    this.props.getListAsync(params.formData);
  };

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props);
    const { action, itemDetail } = this.props;
    const { form, init } = props;
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
    } catch (error) {
      console.log(' error ： ', error);
    }
  };

  renderModalContent = e => {
    const { action } = this.props;
    const formComProps = {
      action,
    };
    console.log(' formComProps ： ', formComProps);
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
      <div className="">
        {this.renderSearchForm()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default GroupReport;
