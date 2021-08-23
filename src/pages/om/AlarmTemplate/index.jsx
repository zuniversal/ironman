import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SearchKwForm from '@/components/Form/SearchKwForm';
import SmartFormModal from '@/common/SmartFormModal';
import AlarmTemplateForm from '@/components/Form/AlarmTemplateForm';
import AlarmTemplateTable from '@/components/Table/AlarmTemplateTable';

import { actions, mapStateToProps } from '@/models/alarmTemplate';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '告警策略模板';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
};

// const mapStateToProps = ({ alarmTemplate, }) => alarmTemplate;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class AlarmTemplate extends PureComponent {
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
        {/* <Button type="primary" onClick={() => this.props.exportData()}> */}
        <Button type="primary">导出</Button>
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
        label={'名称'}
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

    return <AlarmTemplateTable {...tableProps}></AlarmTemplateTable>;
  };

  onRemove = params => {
    console.log(' onRemove    ： ', params);
    this.props.onRemove({
      d_id: `${params.record.id}`,
    });
  };

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props);
    const { action, itemDetail } = this.props;
    const { form, init } = props;
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
      const {
        // one,
        two,
        three,
      } = res.role;
      const role = [
        // res.role['0'],
        // res.role['1'],
        // res.role['2'],
        // {
        //   ...one,
        //   range: [one.range['0'], one.range['1']],
        //   send: one.send ? 1 : 0,
        // },
        {
          ...two,
          range: [two.range['0'], two.range['1']],
          send: two.send ? 1 : 0,
        },
        {
          ...three,
          send: three.send ? 1 : 0,
        },
      ];
      const data = {
        ...res,
        role,
      };
      console.log(' xxxxxxx ： ', role, data);
      // return;
      if (action === 'add') {
        this.props.addItemAsync(data);
      }
      if (action === 'edit') {
        this.props.editItemAsync({
          ...data,
          id: itemDetail.id,
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
    console.log(' formComProps ： ', formComProps);
    return <AlarmTemplateForm {...formComProps}></AlarmTemplateForm>;
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
      <div className="AlarmTemplate">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default AlarmTemplate;
