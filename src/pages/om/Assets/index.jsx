import React, { PureComponent } from 'react';
import './style.less';
import { Button, Row, Col, Divider, Empty } from 'antd';
import AssetsSearchForm from '@/components/Form/AssetsSearchForm';
import AssetsDetailSearchForm from '@/components/Form/AssetsDetailSearchForm';
import SearchKwForm from '@/components/Form/SearchKwForm';
import ClientForm from '@/components/Form/ClientForm';
import AssetsForm from '@/components/Form/AssetsForm';
import PowerStationForm from '@/components/Form/PowerStationForm';
import HouseNoForm from '@/components/Form/HouseNoForm';
import SmartFormModal from '@/common/SmartFormModal';
import ClientSimpleTable from '@/components/Table/ClientSimpleTable';
import AssetsInfo from '@/pages/om/AssetsDetail/AssetsInfo';
import { ASSETS_DETAIL } from '@/constants';

import { actions, mapStateToProps } from '@/models/assets';
import SmartHOC from '@/common/SmartHOC';
import { connect, history } from 'umi';

export const TITLE = '资产';
export const DEVICE = '设备';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  powerStationDetailAsync: `电站详情`,
  houseNoDetailAsync: `户号详情`,
  assetsDetailAsync: `资产详情`,
  clientDetailAsync: `客户详情`,
};

const detailFormMap = {
  clientDetailAsync: ClientForm,
  assetsDetailAsync: AssetsForm,
  houseNoDetailAsync: HouseNoForm,
  powerStationDetailAsync: PowerStationForm,
};

// const mapStateToProps = ({ assets, }) => assets;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  noMountFetch: true,
})
class Assets extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }
  renderFormBtn = params => {
    const { customer_id, electricity_user_id } = this.props.assetsSearchInfo;
    return (
      <div className={'btnWrapper'}>
        <Button
          type="primary"
          onClick={() =>
            history.push(
              `${ASSETS_DETAIL}customer_id=${customer_id}&electricity_user_id=${electricity_user_id}`,
            )
          }
          disabled={!customer_id}
        >
          编辑客户资产
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <AssetsSearchForm
        formBtn={this.renderFormBtn}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
        houseNoList={this.props.houseNoList}
      ></AssetsSearchForm>
    );
    return (
      <SearchKwForm
        formBtn={this.renderFormBtn}
        className={'fje'}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
        keyword={'keyword'}
        label={'客户名称'}
        noLabel
      ></SearchKwForm>
    );
  };
  renderSearchForm = params => {
    return (
      <>
        <AssetsDetailSearchForm
          formBtn={this.renderFormBtn}
          init={this.props.searchInfo}
          init={this.props.assetsSearchInfo}
          // onFieldChange={this.onFieldChange}
          getListAsync={this.props.getListFilter}
          className={'assetsDetailSearchForm'}
        ></AssetsDetailSearchForm>
        <Divider />
      </>
    );
  };
  getListFilter = params => {
    console.log(' getListFilter,  , ： ', params);
    this.props.getListFilter(params);
  };
  onFieldChange = params => {
    console.log(' onFieldChange,  , ： ', params);
    this.props.getListFilter({ ...params.value });
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
    if (['uploadFile'].includes(action)) {
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
    const { action, itemDetail } = this.props;
    const formComProps = {
      action,
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps);
    return <AssetsForm {...formComProps}></AssetsForm>;
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

  renderAssets = params => {
    console.log(' AssetsInfoAssetsInfo ： ', params, this.props);
    const tableProps = {
      rowSelection: null,
      dataSource: this.props.clientListFilter,
      count: this.props.clientCount,
      getAssetListAsync: this.props.getAssetListAsync,
      // getListAsync: this.props.getClientRelativedAsync,
      rowClassName: (record, index) =>
        record.id == this.props.assetsSearchInfo?.customer_id
          ? 'activeRow'
          : '',
      paginationConfig: {
        showQuickJumper: false,
        showSizeChanger: false,
        size: 'small',
      },
    };
    return (
      <div className="assetInfoWrapper">
        <Row gutter={[16, 16]} className="w100">
          <Col span={8}>
            <ClientSimpleTable {...tableProps}></ClientSimpleTable>
          </Col>
          <Col span={16}>
            {!!this.props.assetList.length ? (
              <AssetsInfo
                assetList={this.props.assetList}
                subAssetList={this.props.subAssetList}
                subAssetTreeList={this.props.subAssetTreeList}
                selectItem={this.props.selectItem}
                assetDetail={this.props.assetDetail}
                getAssetDetailAsync={this.props.getAssetDetailAsync}
              ></AssetsInfo>
            ) : (
              <div className={`dfc fullfill`}>
                <Empty />
              </div>
            )}
          </Col>
        </Row>
      </div>
    );
  };
  componentDidMount() {
    this.props.getClientRelativedAsync();
  }

  render() {
    console.log(
      ' %c Assets 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );

    return (
      <div className="assets">
        {this.renderSearchForm()}

        {this.renderAssets()}

        {this.renderSmartFormModal()}

        {this.renderCommonModal()}
      </div>
    );
  }
}

export default Assets;
