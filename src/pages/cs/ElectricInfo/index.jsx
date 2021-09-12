import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import ElectricInfoTable from '@/components/Table/ElectricInfoTable';
import PageTitle from '@/components/Widgets/PageTitle';
import TimeChoice from '@/components/Widgets/TimeChoice';
import Preview from '@/components/Widgets/DrawPanels/Preview';
import SmartFormModal from '@/common/SmartFormModal';
import SearchForm from '@/common/SearchForm';
import AssetsInfo from '@/pages/om/AssetsDetail/AssetsInfo';

import RealDataImei from '@/pages/om/SmartMonitor/RealDataImei';
import MonitorManageDetailForm from '@/components/Form/MonitorManageForm/MonitorManageDetailForm';
import ClientForm from '@/components/Form/ClientForm';
import HouseNoForm from '@/components/Form/HouseNoForm';
import PowerStationForm from '@/components/Form/PowerStationForm';
import MonitorDeviceForm from '@/components/Form/MonitorDeviceForm';
import AssetsForm from '@/components/Form/AssetsForm';

import HouseNoSearch from './HouseNoSearch';
import StatBox from './StatBox';
import LivePic from './LivePic';
// import data from './data.json';

import { actions, mapStateToProps } from '@/models/electricInfo';
import SmartHOC from '@/common/SmartHOC';
import { connect, history } from 'umi';
import { DRAW_PANEL } from '@/constants';

const TITLE = '';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  monitorManageAsync: `监控详情`,
  getRealDataAsync: `监控数据`,
  clientDetailAsync: `客户详情`,
  houseNoDetailAsync: `户号详情`,
  powerStationDetailAsync: `电站详情`,
  assetsDetailAsync: `设备详情`,
  monitorDeviceDetailAsync: `监控设备详情`,
};

const detailFormMap = {
  monitorManageAsync: MonitorManageDetailForm,
  // getRealDataAsync: RealDataImei,
  clientDetailAsync: ClientForm,
  houseNoDetailAsync: HouseNoForm,
  powerStationDetailAsync: PowerStationForm,
  assetsDetailAsync: AssetsForm,
  monitorDeviceDetailAsync: MonitorDeviceForm,
};

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

  onOptionChange = params => {
    console.log('  onOptionChange  ：', params);
    this.props.showItemAsync({
      action: 'powerStationDetailAsync',
      d_id: params.id,
    });
  };

  renderTable = params => {
    const tableProps = {
      showFormModal: this.props.showFormModal,
      showItemAsync: this.props.showItemAsync,
      title: () => <div className="title">IOT设备清单</div>,
      houseNo: this.props.houseNo,
      noDefault: true,
    };

    return (
      <>
        <PageTitle title={'电站信息'}>
          <TimeChoice
            noPicker
            config={this.props.stationList}
            onOptionChange={this.onOptionChange}
          ></TimeChoice>
        </PageTitle>
        <div className="">
          <span className="m-r-30">
            电站温度：{this.props.stationInfo?.t} ℃
          </span>
          <span className="">电站湿度：{this.props.stationInfo?.h}</span>
        </div>
        <ElectricInfoTable {...tableProps}></ElectricInfoTable>
      </>
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
  renderPageTitle = params => {
    return (
      <HouseNoSearch
        value={this.props.houseNo}
        data={this.props.clientPowerList}
        onChange={this.props.setStationList}
      ></HouseNoSearch>
    );
    return (
      // <PageTitle title={'用电户号'}>
      <PageTitle title={'户号'}>
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
        {/* <div className="title">户号信息</div> */}
        <StatBox data={this.props.powerInfo}></StatBox>
      </>
    );
  };
  renderLivePic = params => {
    return (
      <>
        <div className="title">电站实景图</div>
        <LivePic></LivePic>
      </>
    );
  };
  handleAction = params => {
    console.log('    handleAction ： ', params, this.state, this.props);
    this.props.setData({
      isShowRemoveModal: true,
      removeParams: {
        noRemove: true,
        removeTitle: '提示',
        removeContent: '是否确认删除',
        okFn: e => {
          console.log(' 确认删除 ： ', e, params);
          this.props.removeCircuitItemAsync({
            circuit_id: this.props.canvasInfo.id,
            power_station_id: this.props.canvasInfo.power_station_id,
          });
          this.props.onResultModalCancel();
        },
      },
    });
  };
  renderDrawPic = params => {
    const formComProps = {
      // data: data,
      // realParams: { number: '0000727272', powerstation_id: '79730' },
      data: this.props.canvasData,
      noPortal: true,
      noFitWindow: true,
    };
    return (
      <>
        <div className="titleRow fsb">
          <div className="title">一次系统图</div>
          <div className="btnWrapper">
            <Button
              type="primary"
              onClick={() =>
                history.push(
                  `${DRAW_PANEL}?powerstation_id=${this.props.stationId}&number=${this.props.houseNo}`,
                )
              }
              className={`m-r-10`}
            >
              进入编辑器
            </Button>
            <Button
              type="primary"
              onClick={this.handleAction}
              disabled={!this.props.canvasInfo?.id}
            >
              清空
            </Button>
          </div>
        </div>
        <div className="drawWrapper">
          {this.props.canvasData ? (
            <Preview {...formComProps}></Preview>
          ) : (
            <div className="previewContainer dfc">该电站暂无系统图</div>
          )}
          {/* <Preview {...formComProps}></Preview> */}
        </div>
      </>
    );
  };
  renderAssets = params => {
    console.log(' AssetsInfoAssetsInfo ： ', params, this.props);
    return (
      <AssetsInfo
        assetList={this.props.assetList}
        subAssetList={this.props.subAssetList}
        subAssetTreeList={this.props.subAssetTreeList}
        selectItem={this.props.selectItem}
        assetDetail={this.props.assetDetail}
        getAssetDetailAsync={this.props.getAssetDetailAsync}
      ></AssetsInfo>
    );
  };

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props);
    const { action, itemDetail } = this.props;
    const { form, init } = props;
    if (['getRealDataAsync'].includes(action)) {
      this.props.onCancel({});
      return;
    }
  };
  renderModalContent = e => {
    const { action } = this.props;
    const formComProps = {
      action,
    };
    console.log(' formComProps ： ', formComProps, this.props);
    if (action === 'getRealDataAsync') {
      return <RealDataImei {...this.props.realDataParams}></RealDataImei>;
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
      >
        {this.renderModalContent()}
      </SmartFormModal>
    );
  };

  componentDidMount() {
    console.log(
      ' ElectricInfo 组件componentDidMount挂载 ： ',
      this.state,
      this.props,
    ); //
    // this.props.getPowerInfoAsync({
    //   ele_number: '0000727272',
    //   // ele_number: ,
    // });
    // this.props.getClientPowerAsync();
    // this.props.getMonitorDeviceListAsync();

    this.props.getRelativedAsync();
  }

  render() {
    console.log(
      ' %c ElectricInfo 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    ); //
    return (
      <div className="electricInfo">
        {this.renderPageTitle()}

        {/* {this.renderSearchForm()} */}

        {this.renderStatBox()}

        {this.renderTable()}

        {this.renderLivePic()}

        {this.renderDrawPic()}

        {this.renderAssets()}

        {this.renderSmartFormModal()}

        {this.renderCommonModal()}
      </div>
    );
  }
}

export default ElectricInfo;
