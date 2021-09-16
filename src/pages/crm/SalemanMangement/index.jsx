import React, { PureComponent } from 'react';
import { Button } from 'antd';
import SalemanMangementSearchForm from '@/components/Form/SalemanMangementSearchForm';
import {SalemanMangementImportForm} from '@/components/Form/SalemanMangementActionForm';
import SalemanMangementForm from '@/components/Form/SalemanMangementForm';
import SalemanMangementTable from '@/components/Table/SalemanMangementTable';
import SalemanMangementClientTable from '@/components/Table/SalemanMangementClientTable';
import SmartFormModal from '@/common/SmartFormModal';
import { actions, mapStateToProps } from '@/models/salemanMangement';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { tips } from '@/utils';

const TITLE = '营销人员';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  responsibleClientAsync: `负责客户详情`,
  importUser: `导入用户`,
};

const detailFormMap = {};

// const mapStateToProps = ({ houseNo, }) => houseNo;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class SalemanMangement extends PureComponent {
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
          onClick={() => this.props.showFormModal({ action: 'importUser' })}
        >
          从已有用户导入
        </Button>
        <Button
          type="primary"
          onClick={() => this.props.showFormModal({ action: 'add' })}
          // disabled={this.props.authInfo.create !== true}
        >
          新增{TITLE}
        </Button>
        <Button type="primary" onClick={() => this.props.exportData()}>
          导出Excel
        </Button>
        {/* <Button
          type="primary"
          disabled={this.props.authInfo.delete !== true}
          onClick={this.onBatchRemove}
        >
          删除
        </Button> */}
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <SalemanMangementSearchForm
        formBtn={this.renderFormBtn}
      ></SalemanMangementSearchForm>
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
      edit: this.props.getItemAsync,
      remove: this.onRemove,
      showFormModal: this.props.showFormModal,
      showItemAsync: this.props.showItemAsync,
    };

    return <SalemanMangementTable {...tableProps}></SalemanMangementTable>;
  };

  onRemove = params => {
    console.log(' onRemove    ： ', params);
    this.props.onRemove({
      d_id: `${params.record.id}`,
    });
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
    // if (['importUser'].includes(action)) {
    //   this.props.onCancel({});
    //   return;
    // }
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
      if (action === 'importUser') {
        if (this.props.importUserList.length) {
          this.props.importUserAsync({
            user_list: this.props.importUserList.map((v) => v.id),
          });
        } else {
          tips('请选择要导入的用户！', 2)
        } 
        return;
      }
      const formData = props.form.getFieldsValue();
      if (action === 'add' && formData.rePassword !== formData.password) {
        tips('2次密码不一致！', 2)
        return  
      }
      // if (action === 'changePasswordAsync') {
      //   this.props.changePasswordAsync({
      //     ...res,
      //     d_id: this.props.itemDetail.id,
      //   });
      //   return
      // }
      if (res.head_img && res.head_img.fileList && res.head_img.fileList.length > 0) {
        const fileList = res.head_img.fileList;
        console.log(' fileList ： ', fileList);
        res.head_img = fileList.map(v => v.response.url).join(',');
      } else {
        res.head_img = null;
      }
      res.join_date = res.join_date ? res.join_date.format('YYYY-MM-DD') : null

      delete res.rePassword

      if (action === 'add') {
        this.props.addItemAsync({
          ...res,
          role_ids: res.role_ids ? [res.role_ids] : [],
          tag_ids: res.tag_ids ? [res.tag_ids] : [],
          
          type: 'crm', 
        });
      }
      if (action === 'edit') {
        this.props.editItemAsync({
          ...itemDetail,
          ...res,
          role_ids: res.role_ids ? [res.role_ids] : [],
          tag_ids: res.tag_ids ? [res.tag_ids] : [],
          d_id: itemDetail.id,
          account: {
            ...itemDetail.account,
            username: res.username,
          },
          customer_id: null,
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
    };
    // if (action !== 'add') {
    formComProps.init = this.props.itemDetail;
    // }
    console.log(' formComProps ： ', this.props, formComProps);
    if (action === 'importUser') {
      return (
        <SalemanMangementImportForm
          {...formComProps}
          importUser={this.props.importUser}
          removeUser={this.props.removeUser}
          importUserList={this.props.importUserList}
        ></SalemanMangementImportForm>
      );
    }
    if (action === 'responsibleClientAsync') {
      return (
        <SalemanMangementClientTable
          {...formComProps}
        ></SalemanMangementClientTable>
      );
    }
    return <SalemanMangementForm {...formComProps}></SalemanMangementForm>;
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

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {this.renderCommonModal()}
      </div>
    );
  }
}

export default SalemanMangement;
