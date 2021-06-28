import React, { useEffect } from 'react';
import './style.less';
import SmartTable from '@/common/SmartTable';
import { Button } from 'antd';
import useHttp from '@/hooks/useHttp';
import { getList as getMonitorPointList } from '@/services/monitorManage';
import { getAlarmCurveList } from '@/services/smartMonitor';
import { formatSelectList } from '@/utils';
import SmartForm, { SearchForm } from '@/common/SmartForm';
import { editPowerInfo } from '@/services/powerStation';

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
      dataIndex: 'p_d',
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
      title: '温度（柜体）',
      dataIndex: 'tc',
    },

    {
      title: '环境温度',
      dataIndex: 't',
    },
    {
      title: '环境湿度',
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

const formatParams = params => {
  console.log(' formatParams   params,   ： ', params);
  // const query = fields.map(item => `&value=${item.value}`).join('');
  const query = '';
  const queryParams = `?alarm=1&point_id=${params.point_id}&start_time=${
    params.startTime
  }&end_time=${'2021-06-29 00:00:00'}${query}`;
  console.log(' query ： ', query, queryParams); //
  return queryParams;
};

export const RealDataTableCom = props => {
  const { data: alarmCurveList, req: getAlarmCurveListAsync } = useHttp(
    getAlarmCurveList,
    {
      format: res => formatSelectList(res),
      noMountFetch: true,
    },
  );
  const { data: monitorPointList, req: getMonitorPointListAsync } = useHttp(
    () =>
      getMonitorPointList({
        station_id: props.stationId,
        station_id: 5831,
      }),
    {
      format: res => {
        console.log('  副作用 对吗  res.length ', res);
        if (res.length > 0) {
          getAlarmCurveListAsync(() =>
            getAlarmCurveList(
              formatParams({
                ...props,
                point_id: res[0].id,
              }),
            ),
          );
        }
        return formatSelectList(res);
      },
    },
  );

  useEffect(() => {
    console.log(' 副作用 ： ', props, monitorPointList); //
    // getAlarmCurveListAsync(() => getAlarmCurveList({

    // }))
  }, [monitorPointList]);

  console.log(' RealDataTableCom 副作用 ： ', props, monitorPointList);

  const onFieldChange = params => {
    console.log(
      ' onFieldChange,  , ： ',
      params,
      params.value,
      params.formData,
      props,
    );
    const { time = [], point_id } = params.formData;
    console.log('  对吗  time.length ', time.length);
    if (time.length > 0) {
      const [day1, day2] = time;
      const startTime = day1.format('YYYY-MM-DD HH:mm:ss');
      const endTime = day2.format('YYYY-MM-DD HH:mm:ss');
      console.log(' startTime ： ', time, point_id, startTime, endTime);
      if (point_id && startTime && endTime) {
        getAlarmCurveListAsync(() =>
          getAlarmCurveList(
            formatParams({
              ...props,
              startTime,
              endTime,
              point_id,
            }),
          ),
        );
      }
    }
  };

  const config = [
    {
      formType: 'RangePicker',
      itemProps: {
        label: '日期',
        name: 'time',
      },
    },
    {
      noRule: true,
      formType: 'Search',
      selectData: monitorPointList,
      itemProps: {
        label: '检测点',
        name: 'point_id',
      },
    },
  ];

  const tableProps = {
    // dataSource: [
    //   {
    //     ua: 'ua',
    //     ub: 'ub',
    //     uc: 'uc',
    //     ia: 'ia',
    //     ib: 'ib',
    //     ic: 'ic',
    //     pa: 'pa',
    //     pb: 'pb',
    //     pc: 'pc',
    //     psum: 'psum',
    //     qa: 'qa',
    //     qb: 'qb',
    //     qc: 'qc',
    //     qsum: 'qsum',
    //     pfa: 'pfa',
    //     pfb: 'pfb',
    //     pfc: 'pfc',
    //     pfsum: 'pfsum',
    //     fr: 'fr',
    //     px: 'px',
    //     eq1: 'eq1',
    //     eq2: 'eq2',
    //     ep: 'ep',
    //     tc: 'tc',
    //   },
    // ],
    dataSource: alarmCurveList,
    // count: props.count,
    title: () => (
      <div className={'fsb'}>
        <SearchForm
          config={config}
          // init={this.props.searchInfo}
          onFieldChange={onFieldChange}
        ></SearchForm>
        {/* <Button
          type="primary"
          // onClick={() => this.props.exportData()}
        >
          导出Excel
        </Button> */}
      </div>
    ),
  };

  return (
    <div>
      <RealDataTable {...tableProps}></RealDataTable>
    </div>
  );
};

RealDataTableCom.defaultProps = {};
