import React, { PureComponent } from 'react';
import './style.less';
import { Button, Row, Col, Divider } from 'antd';
import RingPieEchart from '@/components/Echarts/RingPieEchart';
import ClientPortraitSearchForm from '@/components/Form/ClientPortraitSearchForm';
// import ClientPortraitForm from '@/components/Form/ClientPortraitForm';
// import ClientPortraitTable from '@/components/Table/ClientPortraitTable';
import SmartFormModal from '@/common/SmartFormModal';
import { actions, mapStateToProps } from '@/models/client';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { clientPortraitSpreadConfig } from '@/configs';

const TITLE = '';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
};

const detailFormMap = {};

// const mapStateToProps = ({ houseNo, }) => houseNo;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class ClientPortrait extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }
  renderFormBtn = params => {
    return (
      <div className={'btnWrapper'}>
        <Button
          type="primary"
          onClick={() => this.props.showFormModal({ action: 'add' })}
          disabled={this.props.authInfo.create !== true}
        >
          新增{TITLE}
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <ClientPortraitSearchForm
      // formBtn={this.renderFormBtn}
      ></ClientPortraitSearchForm>
    );
  };
  onFieldChange = params => {
    console.log(' onFieldChange,  , ： ', params);
    this.props.getListAsync(params.formData);
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
          ></DetailForm>
        )}
      </SmartFormModal>
    );
  };

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props);
    const { action, itemDetail } = this.props;
    const { form, init } = props;
    if (['other'].includes(action)) {
      this.props.onCancel({});
      return;
    }
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
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps);
    // return <ClientPortraitForm {...formComProps}></ClientPortraitForm>;
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

  renderEcharts = params => {
    return (
      <div className={`clientPortraitEchartsWrapper`}>
        <Row gutter={[24, 16]}>
          {clientPortraitSpreadConfig.map((v, i) => (
            <Col span={12} {...v} key={v.value}>
              <div className={`homeTitle`}>{v.label}</div>
              <Divider />
              <RingPieEchart />
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  render() {
    return (
      <div className="clientPortrait">
        {this.renderSearchForm()}

        {this.renderEcharts()}

        {this.renderSmartFormModal()}

        {this.renderCommonModal()}
      </div>
    );
  }
}

export default ClientPortrait;
