import React from 'react';
import './style.less';
import SmartTable from '@/common/SmartTable';
import { Button } from 'antd';
import useHttp from '@/hooks/useHttp';
import {
  getManufacturerList,
  getList as getMonitorPointList,
} from '@/services/monitorManage';
import { formatSelectList } from '@/utils';
import SmartForm, { SearchForm } from '@/common/SmartForm';

const RealDataTable = props => {
  console.log(' RealDataTable ： ', props);

  const columns = [
    {
      title: 'A相电压V',
      dataIndex: 'ua',
    },
    {
      title: 'B相电压V',
      dataIndex: 'ub',
    },
    {
      title: 'C相电压V',
      dataIndex: 'uc',
    },
    {
      title: 'A相电流A',
      dataIndex: 'ia',
    },
    {
      title: 'B相电流A',
      dataIndex: 'ib',
    },
    {
      title: 'C相电流A',
      dataIndex: 'ic',
    },
    {
      title: 'A相有功',
      dataIndex: 'pa',
    },
    {
      title: 'B相有功',
      dataIndex: 'pb',
    },
    {
      title: 'C相有功',
      dataIndex: 'pc',
    },
    {
      title: '总有功功率',
      dataIndex: 'psum',
    },
    {
      title: 'A相无功',
      dataIndex: 'qa',
    },
    {
      title: 'B相无功',
      dataIndex: 'qb',
    },
    {
      title: 'C相无功',
      dataIndex: 'qc',
    },
    {
      title: '总无功功率',
      dataIndex: 'qsum',
    },
    {
      title: 'A相功率因数',
      dataIndex: 'pfa',
    },
    {
      title: 'B相功率因数',
      dataIndex: 'pfb',
    },
    {
      title: 'C相功率因数',
      dataIndex: 'pfc',
    },
    {
      title: '总功率因数',
      dataIndex: 'pfsum',
    },
    {
      title: '电网频率',
      dataIndex: 'fr',
    },
    {
      title: '有功需量',
      dataIndex: 'px',
    },

    {
      title: '感性无功电度',
      dataIndex: 'eq1',
    },
    {
      title: '容性无功电度',
      dataIndex: 'eq2',
    },
    {
      title: '总有功电度',
      dataIndex: 'ep',
    },
    {
      title: '温度（柜体）°C',
      dataIndex: 'tc',
    },

    {
      title: '环境温度°C',
      dataIndex: 't',
    },
    {
      title: '环境湿度%',
      dataIndex: 's',
    },
    // {
    //   title: '数据接收时间',
    //   dataIndex: '',
    // },
  ];

  return <SmartTable columns={columns} {...props} noActionCol></SmartTable>;
};

export default RealDataTable;

export const RealDataTableCom = props => {
  const { data: manufacturerList, req: getManufacturerListAsync } = useHttp(
    getManufacturerList,
    {
      format: res => formatSelectList(res, 'manufacturer'),
    },
  );

  console.log(' RealDataTableCom ： ', props, manufacturerList);

  const onFieldChange = params => {
    console.log(
      ' onFieldChange,  , ： ',
      params,
      params.value,
      params.formData,
      props,
    );
    const { time } = params.value;
    const [day1, day2] = time;
    const formatDay1 = day1.format('YYYY-MM-DD');
    const formatDay2 = day2.format('YYYY-MM-DD');
    console.log(' formatDay1 ： ', formatDay1, formatDay2);
    // getManufacturerListAsync({
    //   formatDay1, formatDay2,
    // })
  };

  const config = [
    {
      formType: 'RangePicker',
      itemProps: {
        label: '日期',
        name: 'time',
      },
    },
  ];

  const tableProps = {
    dataSource: [
      {
        ua: 'ua',
        ub: 'ub',
        uc: 'uc',
        ia: 'ia',
        ib: 'ib',
        ic: 'ic',
        pa: 'pa',
        pb: 'pb',
        pc: 'pc',
        psum: 'psum',
        qa: 'qa',
        qb: 'qb',
        qc: 'qc',
        qsum: 'qsum',
        pfa: 'pfa',
        pfb: 'pfb',
        pfc: 'pfc',
        pfsum: 'pfsum',
        fr: 'fr',
        px: 'px',
        eq1: 'eq1',
        eq2: 'eq2',
        ep: 'ep',
        tc: 'tc',
      },
    ],
    // count: props.count,
    title: () => (
      <div className={'fsb'}>
        <SearchForm
          config={config}
          // init={this.props.searchInfo}
          onFieldChange={onFieldChange}
        ></SearchForm>
        <Button
          type="primary"
          // onClick={() => this.props.exportData()}
        >
          导出Excel
        </Button>
      </div>
    ),
  };

  return (
    <div>
      <RealDataTable {...tableProps}></RealDataTable>
    </div>
  );
};
