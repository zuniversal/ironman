import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SearchKwForm from '@/components/Form/SearchKwForm';
import SmartFormModal from '@/common/SmartFormModal';
import PlatformConfigForm from '@/components/Form/PlatformConfigForm';
import PlatformConfigTable from '@/components/Table/PlatformConfigTable';
import FeedbackIcon from '@/components/Widgets/FeedbackIcon';

import { actions, mapStateToProps } from '@/models/platformConfig';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '平台';

const titleMap = {
  add: `新建${TITLE}信息`,
  edit: `编辑${TITLE}信息`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
};

// const mapStateToProps = ({ houseNo, }) => houseNo;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class PlatformConfig extends PureComponent {
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
        {/* <Button
          type="primary"
          onClick={() => this.props.showFormModal({ action: 'succ' })}
        >
          新增{TITLE}
        </Button>
        <Button
          type="primary"
          onClick={() => this.props.showFormModal({ action: 'fail' })}
        >
          新增{TITLE}
        </Button> */}
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <SearchKwForm
        formBtn={this.renderFormBtn}
        className={'fje'}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
        keyword={'keyword'}
        label={'关键字'}
        noLabel
      ></SearchKwForm>
    );
  };
  onFieldChange = params => {
    console.log(' onFieldChange,  , ： ', params);
    this.props.getListAsync(params.formData);
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

    return <PlatformConfigTable {...tableProps}></PlatformConfigTable>;
  };

  onRemove = params => {
    console.log(' onRemove    ： ', params);
    this.props.onRemove({
      d_id: `${params.record.id}`,
    });
  };
  onOk = async (props, extra) => {
    console.log(' onOkonOk ： ', props, extra, this.state, this.props);
    const { action, itemDetail } = this.props;
    const { form, init } = props;
    if (['succ'].includes(action)) {
      this.props.onCancel({});
      return;
    }
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
      if (action === 'add') {
        this.props.addItemAsync({
          ...res,
        });
      }
      if (action === 'edit') {
        this.props.editItemAsync({
          ...res,
          d_id: itemDetail.id,
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
      getUser: params => this.props.getUserAsync({ keyword: params }),
      userList: this.props.userList,
      getClientAsync: params => this.props.getClientAsync({ name: params }),
      clientList: this.props.clientList,
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    if (action === 'succ') {
      return (
        <FeedbackIcon icon={'ok'} feedbackContent={'验证成功'}></FeedbackIcon>
      );
    }
    if (action === 'fail') {
      return (
        <FeedbackIcon
          icon={'close'}
          feedbackContent={'登录失败，请检查账号信息'}
        ></FeedbackIcon>
      );
    }
    console.log(' formComProps ： ', formComProps);
    return <PlatformConfigForm {...formComProps}></PlatformConfigForm>;
  };
  get okTxt() {
    return ['add'].some(v => v === this.props.action) ? '直接确定' : '确定';
  }
  confirmHandle = async (params, type) => {
    console.log('    confirmHandle ： ', params, type, this.props);
    const { action } = this.props;
    const { form } = params;
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
      if (action === 'add') {
        this.props.addItemAsync({
          ...res,
        });
      }
    } catch (error) {
      console.log(' error ： ', error);
    }
  };
  renderExtraBtn = params => {
    console.log('    renderExtraBtn ： ', params);
    if (this.props.action === 'add') {
      return (
        <div className={`extraBtnWrapper`} key="extraBtn">
          {/* <Button
            key="loginValidate"
            // onClick={e => this.onOk(e, 'loginValidate')}
            onClick={e => this.confirmHandle(params, 'loginValidate')}
            type="primary"
          >
            账号登录验证
          </Button> */}
          <Button
            key="ok"
            onClick={e => this.confirmHandle(params, 'onOk')}
            type="primary"
          >
            直接确定
          </Button>
        </div>
      );
    }
    if (this.props.action === 'fail') {
      return (
        <Button
          key="previous"
          onClick={e => this.props.showFormModal({ action: 'add' })}
          type="primary"
        >
          返回上一步
        </Button>
      );
    }
    return null;
  };
  renderSmartFormModal = params => {
    return (
      <SmartFormModal
        show={this.props.isShowModal}
        action={this.props.action}
        titleMap={this.state.titleMap}
        onOk={this.onOk}
        onCancel={this.props.onCancel}
        hideOk={['add', 'fail'].some(v => v === this.props.action)}
        extraBtn={this.renderExtraBtn}
        className={`platformConfigModal`}
      >
        {this.renderModalContent()}
      </SmartFormModal>
    );
  };

  render() {
    return (
      <div className="platformConfig">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default PlatformConfig;
