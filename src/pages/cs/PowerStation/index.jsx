import React, { PureComponent } from 'react';
import './style.less';
import PowerStationForm from '@/components/Form/PowerStationForm';

import { actions, mapStateToProps } from '@/models/powerStation';
import SmartHOC from '@/common/SmartHOC';
import { connect, history } from 'umi';
import SmartTable from '@/common/SmartTable';
import { getItem } from '@/utils';

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

@connect(mapStateToProps)
@SmartHOC({
  noMountFetch: true,
  actions,
  titleMap,
  modalForm: PowerStationForm,
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
  componentDidMount() {
    // this.props.getPowerAsync();
    const userInfo = getItem('userInfo');
    this.props.getListAsync({ customer: userInfo.id });
    // this.props.getListAsync({ customer_name: userInfo.nickname });
  }

  render() {
    console.log(
      ' %c PowerStation 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    return <div className="PowerStation">{this.renderTable()}</div>;
  }
}

export default PowerStation;
