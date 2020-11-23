import React, { PureComponent } from 'react';
import './style.less';
import { Button, Tag } from 'antd';
import SmartFormModal from '@/common/SmartFormModal'; //
import CsOrganizeForm from '@/components/Form/CsOrganizeForm'; //
import CsOrganizeTable from '@/components/Table/CsOrganizeTable'; //
import { actions, mapStateToProps } from '@/models/csOrganize'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { PRIMARY } from '@/constants';

const TITLE = '账户';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
};

// const mapStateToProps = ({ csOrganize, }) => csOrganize;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: CsOrganizeForm,
})
class CsOrganize extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  renderSearchForm = params => {
    return (
      <div className={'fsb '}>
        <div>
          <Tag color={PRIMARY}>
            最多支持创建3个账户，每个账户可在小程序接受通知
          </Tag>
        </div>
        <div className={'btnWrapper'}>
          <Button
            type="primary"
            onClick={() => this.props.showFormModal({ action: 'add' })}
          >
            新增{TITLE}
          </Button>
        </div>
      </div>
    );
  };

  renderTable = params => {
    const tableProps = {
      onSelectChange: this.props.onSelectChange,
      dataSource: this.props.dataList,
      count: this.props.count,
      searchInfo: this.props.searchInfo,
      getListAsync: this.props.getListAsync,
      showDetail: this.props.getItemAsync,
      edit: this.props.getItemAsync,
      remove: this.onRemove,
      showFormModal: this.props.showFormModal,
    };

    return <CsOrganizeTable {...tableProps}></CsOrganizeTable>;
  };

  onRemove = params => {
    console.log(' onRemove    ： ', params);
    // this.props.removeItemAsync({
    //   custom_id: `${params.record.customer_id}`,
    //   user_id: `${params.record.user_id}`,
    //   account_id: `${params.record.account_id}`,
    // });
    this.props.onRemove({
      custom_id: `${params.record.customer_id}`,
      user_id: `${params.record.user_id}`,
      account_id: `${params.record.account_id}`,
    });
  };

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { action, itemDetail } = this.props; //
    const { form, init } = props; //
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action); //
      if (action === 'add') {
        this.props.addItemAsync({
          ...res,
          customer: res.customer.join(','),
        });
      }
      if (action === 'edit') {
        this.props.editItemAsync({
          ...res,
          customer: res.customer.join(','),
        });
      }
    } catch (error) {
      console.log(' error ： ', error); //
    }
  };

  renderModalContent = e => {
    const { action } = this.props; //
    const formComProps = {
      action,
      userHouseNoList: this.props.userHouseNoList,
    };
    return <CsOrganizeForm {...formComProps}></CsOrganizeForm>;
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
  componentDidMount() {
    this.props.getUserHouseNoAsync();
  }

  render() {
    return (
      <div className="csOrganize">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default CsOrganize;
