import React, { PureComponent } from 'react';
import './style.less';
import { Button, Radio, Tabs } from 'antd';
import SearchKwForm from '@/components/Form/SearchKwForm';
import SmartFormModal from '@/common/SmartFormModal';
import CameraConfigForm from '@/components/Form/CameraConfigForm';
import {
  FixedCameraConfigTable,
  HeadCameraConfigTable,
} from '@/components/Table/CameraConfigTable';

import { actions, mapStateToProps } from '@/models/cameraConfig';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const { TabPane } = Tabs;

const cameraTabsConfig = [
  { label: '固定摄像头', value: 'FixedCameraConfigTable' },
  { label: '头戴摄像头', value: 'HeadCameraConfigTable' },
];

const TITLE = '摄像头';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
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
class CameraConfig extends PureComponent {
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
      <SearchKwForm
        formBtn={this.renderFormBtn}
        // className={'fje'}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
        keyword={'name'}
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

    const CameraConfigTable = {
      FixedCameraConfigTable,
      HeadCameraConfigTable,
    }[this.props.tableType];

    return <CameraConfigTable {...tableProps}></CameraConfigTable>;
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
      if (action === 'add') {
        this.props.addItemAsync({
          ...res,
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
    if (action === 'showVideoAsync') {
      return <div>showVideoAsync</div>;
    }
    console.log(' formComProps ： ', formComProps);
    return <CameraConfigForm {...formComProps}></CameraConfigForm>;
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

  onCameraTabsChange = params => {
    console.log('    onCameraTabsChange ： ', params);
    this.props.onCameraTabsChange({ tableType: params });
    this.props.getListAsync({
      page: 1,
    });
  };

  renderTabPanes = params => (
    <div className="w100">
      <Tabs defaultActiveKey="0" onChange={this.onCameraTabsChange}>
        {cameraTabsConfig.map((v, i) => (
          <TabPane tab={v.label} key={v.value}></TabPane>
        ))}
      </Tabs>
    </div>
  );

  render() {
    console.log(
      ' %c cameraConfig 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    ); //
    return (
      <div className="cameraConfig">
        {this.renderTabPanes()}

        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default CameraConfig;
