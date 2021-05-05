import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SearchKwForm from '@/components/Form/SearchKwForm';
import ElectricInfoTable from '@/components/Table/ElectricInfoTable';
import PageTitle from '@/components/Widgets/PageTitle';
import TimeChoice from '@/components/Widgets/TimeChoice';
import Preview from '@/components/Widgets/DrawPanels/Preview';
import SmartFormModal from '@/common/SmartFormModal';
import SearchForm from '@/common/SearchForm';
import AssetsInfo from '@/pages/om/Assets/AssetsInfo';
import { actions, mapStateToProps } from '@/models/electricInfo';
import StatBox from './StatBox';
import LivePic from './LivePic';
import data from './data.json';
import SmartHOC from '@/common/SmartHOC';
import { connect, history } from 'umi';
import { DRAW_PANEL } from '@/constants';

const TITLE = '告警通知';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
};

const detailFormMap = {};

const powerStationInfoConfig = [
  { text: '电站1信息', type: 'week' },
  { text: '电站2信息', type: 'month' },
  { text: '电站3信息', type: 'year' },
];

// const mapStateToProps = ({ houseNo, }) => houseNo;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class ElectricInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }
  renderFormBtn = params => {
    return (
      <div className={'btnWrapper'}>
        <Button type="primary" onClick={() => this.props.search(params)}>
          查询
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <SearchKwForm
        // formBtn={this.renderFormBtn}
        className={'fje'}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
        label={'监控点名称、告警名，户号，客户名，imei'}
        keyword={'keyword'}
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
      title: () => <div className="title">IOT设备清单</div>,
    };

    return <ElectricInfoTable {...tableProps}></ElectricInfoTable>;
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
    if (['handleAlarm', 'notifyClient'].includes(action)) {
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
  };
  get size() {
    return [
      'handleAlarm',
      // 'notifyClient'
    ].some(v => v === this.props.action)
      ? 'small'
      : 'default';
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
      >
        {this.renderModalContent()}
      </SmartFormModal>
    );
  };
  renderPageTitle = params => {
    return (
      <PageTitle title={'用电户号'}>
        <SearchForm
          onChange={() => {
            console.log(' onChange ： '); //
          }}
        ></SearchForm>
      </PageTitle>
    );
  };
  renderStatBox = params => {
    return (
      <>
        <div className="title">户号22222信息</div>
        <StatBox></StatBox>
      </>
    );
  };
  renderLivePic = params => {
    return (
      <>
        <PageTitle title={'电站信息'}>
          <TimeChoice noPicker config={powerStationInfoConfig}></TimeChoice>
        </PageTitle>
        <div className="title">电站实景图</div>
        <LivePic></LivePic>
      </>
    );
  };
  renderDrawPic = params => {
    const formComProps = {
      data: this.props.canvasData,
      // show: this.props.isPreview,
      // togglePreview: this.props.togglePreview,
      realParams: this.props.location.query,
      data: data,
      realParams: { number: '0000727272', powerstation_id: '79730' },
      noPortal: true,
      noFitWindow: true,
    };
    return (
      <>
        <div className="titleRow fsb">
          <div className="title">一次性系统图</div>
          <div className="btnWrapper">
            <Button
              type="primary"
              onClick={() =>
                history.push(
                  `${DRAW_PANEL}?powerstation_id=${record.id}&number=${record.electricity_user.number}`,
                )
              }
              className={`m-r-10`}
            >
              进入编辑器
            </Button>
            <Button type="primary" onClick={() => this.props.search(params)}>
              清空
            </Button>
          </div>
        </div>
        <div className="drawWrapper">
          <Preview {...formComProps}></Preview>
        </div>
      </>
    );
  };
  renderAssets = params => {
    return <AssetsInfo></AssetsInfo>;
  };

  render() {
    return (
      <div className="electricInfo">
        {this.renderPageTitle()}

        {/* {this.renderSearchForm()} */}

        {this.renderStatBox()}

        {this.renderLivePic()}

        {this.renderDrawPic()}

        {this.renderSmartFormModal()}

        {this.renderTable()}

        {this.renderAssets()}
      </div>
    );
  }
}

export default ElectricInfo;
