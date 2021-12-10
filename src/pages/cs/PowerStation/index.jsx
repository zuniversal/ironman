import React, { PureComponent } from 'react';
import PowerStationForm from '@/components/Form/PowerStationForm';
import SmartFormModal from '@/common/SmartFormModal';

import { actions, mapStateToProps } from '@/models/powerStation';
import SmartHOC from '@/common/SmartHOC';
import { connect, history } from 'umi';
import SmartTable from '@/common/SmartTable';
import { getClientId } from '@/models/user';

const PowerStationTable = props => {
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
    },
    {
      title: '电站名称',
      dataIndex: 'name',
      // detailFn: record =>
      //   props.showItemAsync({
      //     action: 'powerStationDetailAsync',
      //     d_id: record.id,
      //   }),
    },
    {
      title: '电站地址',
      dataIndex: 'addr',
    },
    // {
    //   title: '巡检次数',
    //   dataIndex: 'inspections_number',
    //   className: 'textCenter',
    // },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() => {
          console.log('Received values of form: ', props);
          props.showItemAsync({
            action: 'powerStationDetailAsync',
            d_id: record.id,
          });
        }}
      >
        详情
      </a>
      <a
        onClick={() => {
          console.log('Received values of form: ', props);
          history.push(`/cs/powerStation/smartMonitor/${record.id}`);
        }}
      >
        智能监控
      </a>
    </>
  );

  return (
    <SmartTable
      columns={columns}
      extra={extra}
      isQRCode
      actionConfig={{ noDefault: true }}
      {...props}
    ></SmartTable>
  );
};

const TITLE = '电站';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
  exportDutyData: `导出巡检报告`,
  clientDetailAsync: `客户详情`,
  houseNoDetailAsync: `户号详情`,
  powerStationDetailAsync: `电站详情`,
  inspectDetailAsync: `巡检详情`,
};

const detailFormMap = {
  powerStationDetailAsync: PowerStationForm,
};

@connect(mapStateToProps)
@SmartHOC({
  noMountFetch: true,
  actions,
  titleMap,
})
class PowerStation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

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
    };

    return <PowerStationTable {...tableProps}></PowerStationTable>;
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
  componentDidMount() {
    // this.props.getPowerAsync();
    this.props.getListAsync({ customer: getClientId() });
    // this.props.getListAsync({ customer_name: userInfo.nickname });
  }

  render() {
    console.log(
      ' %c PowerStation 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    return (
      <div className="PowerStation">
        {this.renderTable()}

        {this.renderCommonModal()}
      </div>
    );
  }
}

export default PowerStation;
