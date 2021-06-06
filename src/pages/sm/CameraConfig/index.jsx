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
import ClientForm from '@/components/Form/ClientForm';
import PowerStationForm from '@/components/Form/PowerStationForm';
import SmartVideo from '@/common/SmartVideo';
import SmartVideos from '@/common/SmartVideo/SmartVideos';
import FlvVideoPlayer from '@/components/Video/FlvVideoPlayer';

import { actions, mapStateToProps } from '@/models/cameraConfig';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { cameraTypeConfig, CAMERA1, CAMERA2 } from '@/configs';

const { TabPane } = Tabs;

const cameraTabsConfig = [
  // { label: '固定摄像头', value: 'FixedCameraConfigTable' },
  // { label: '头戴摄像头', value: 'HeadCameraConfigTable' },
  { label: '固定摄像头', value: '2' },
  { label: '头戴摄像头', value: '1' },
];

const TITLE = '摄像头';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  showCameraVideo: `摄像头视频`,
  clientDetailAsync: `客户详情`,
  powerStationDetailAsync: `电站详情`,
};

const detailFormMap = {
  clientDetailAsync: ClientForm,
  powerStationDetailAsync: PowerStationForm,
};

// const mapStateToProps = ({ houseNo, }) => houseNo;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  getListParams: {
    type: CAMERA1,
  },
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
      showItemAsync: this.props.showItemAsync,

      type: this.props.type,
      getCameraVideoAsync: this.props.getCameraVideoAsync,
    };

    const CameraConfigTable = {
      [CAMERA2]: FixedCameraConfigTable,
      [CAMERA1]: HeadCameraConfigTable,
    }[this.props.type];
    console.log(
      ' onCameraTabsChange this.props.type    ： ',
      this.props,
      this.props.type,
      CameraConfigTable,
      CAMERA1,
      CAMERA2,
    );

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
          type: this.props.type,
        });
      }
      if (action === 'edit') {
        this.props.editItemAsync({
          ...res,
          type: itemDetail.type,
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
      type: this.props.type,
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    if (action === 'showCameraVideo') {
      return (
        <div className={`dfc`}>
          {/* <SmartVideo
          className={`videoWrapper`} 
          src={
            'http://hls01open.ys7.com/openlive/cc9073571e0c471ca4224debb3ac5eca.m3u8'
          }
          src={this.props.videoUrl}
        ></SmartVideo> */}
          {/* <SmartVideos
          className={`videoWrapper`} 
          src={
            'http://hls01open.ys7.com/openlive/cc9073571e0c471ca4224debb3ac5eca.m3u8'
          }
          // src={this.props.videoUrl}
        ></SmartVideos> */}
          {this.props.videoUrl ? (
            <FlvVideoPlayer
              playKey={
                'at.3ktc2rfo1icq87uf9o9e1ena0tauvl98-708yyuhsby-0etlckc-7mjvgvihc'
              }
              src={'ezopen://open.ys7.com/D70019019/1.hd.live'}
              playKey={this.props.extraPayload.video_token}
              playKey={this.props.token}
              src={this.props.videoUrl}
              hasKey
            />
          ) : (
            <div className={`dfc`}>该设备暂无视频</div>
          )}
        </div>
      );
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

  onCameraTabsChange = type => {
    console.log('    onCameraTabsChange ： ', type);
    this.props.onCameraTabsChange({ type });
    this.props.getListAsync({
      type,
      page: 1,
    });
  };

  renderTabPanes = params => (
    <div className="w100">
      <Tabs defaultActiveKey="0" onChange={this.onCameraTabsChange}>
        {cameraTypeConfig.map((v, i) => (
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

        {this.renderCommonModal()}
      </div>
    );
  }
}

export default CameraConfig;
