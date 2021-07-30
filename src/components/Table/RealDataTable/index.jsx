import React, { useEffect } from 'react';
import './style.less';
import SmartTable from '@/common/SmartTable';
import { Button, Form } from 'antd';
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
      title: 'IMEI号',
      dataIndex: 'imei',
    },
    {
      title: '时间',
      dataIndex: 'tm',
      day: 'YYYY-MM-DD HH:mm:ss',
    },
    {
      title: 'A相电流',
      dataIndex: 'ua',
    },
    {
      title: 'B相电流',
      dataIndex: 'ub',
    },
    {
      title: 'C相电流',
      dataIndex: 'uc',
    },
    {
      title: 'AB线电压',
      dataIndex: 'uab',
    },
    {
      title: 'BC线电压',
      dataIndex: 'ubc',
    },
    {
      title: 'CA线电压',
      dataIndex: 'uca',
    },
    {
      title: 'A相电流',
      dataIndex: 'ia',
    },
    {
      title: 'B相电流',
      dataIndex: 'ib',
    },
    {
      title: 'C相电流',
      dataIndex: 'ic',
    },
    {
      title: '剩余电流',
      dataIndex: 'ir',
    },
    {
      title: 'A相有功功率',
      dataIndex: 'pa',
    },
    {
      title: 'B相有功功率',
      dataIndex: 'pb',
    },
    {
      title: 'C相有功功率',
      dataIndex: 'pc',
    },
    {
      title: '总有功功率',
      dataIndex: 'p',
    },
    {
      title: 'A相无功功率',
      dataIndex: 'qa',
    },
    {
      title: 'B相无功功率',
      dataIndex: 'qb',
    },
    {
      title: 'C相无功功率',
      dataIndex: 'qc',
    },
    {
      title: '总无功功率',
      dataIndex: 'q',
    },
    {
      title: 'A相视在功率',
      dataIndex: 'sa',
    },
    {
      title: 'A相视在功率',
      dataIndex: 'sb',
    },
    {
      title: 'A相视在功率',
      dataIndex: 'sc',
    },
    {
      title: 'A相视在功率',
      dataIndex: 's',
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
      dataIndex: 'pf',
    },
    {
      title: '电源频率',
      dataIndex: 'f',
    },
    {
      title: '总有功电能',
      dataIndex: 'ept',
    },
    {
      title: '正向无功电能',
      dataIndex: 'eqi',
    },
    {
      title: '反向无功电能',
      dataIndex: 'eqe',
    },
    {
      title: '总有功功率实时需量',
      dataIndex: 'p_d',
    },
    {
      title: '三相电压不平衡度',
      dataIndex: 'lvur',
    },
    {
      title: '三相电流不平衡度',
      dataIndex: 'iur',
    },
    {
      title: 'A相电压总谐波畸变率',
      dataIndex: 'ua_thd',
    },
    {
      title: 'B相电压总谐波畸变率',
      dataIndex: 'ub_thd',
    },
    {
      title: 'C相电压总谐波畸变率',
      dataIndex: 'uc_thd',
    },
    {
      title: 'A相电流总谐波畸变率',
      dataIndex: 'ia_thd',
    },
    {
      title: 'B相电流总谐波畸变率',
      dataIndex: 'ib_thd',
    },
    {
      title: 'C相电流总谐波畸变率',
      dataIndex: 'ic_thd',
    },
    {
      title: '温度1',
      dataIndex: 't1',
    },
    {
      title: '温度2',
      dataIndex: 't2',
    },
    {
      title: '温度3',
      dataIndex: 't3',
    },
    {
      title: '温度4',
      dataIndex: 't4',
    },
    {
      title: '负载率',
      dataIndex: 'p_rate',
    },
  ];

  return <SmartTable columns={columns} {...props} noActionCol></SmartTable>;
};

export default RealDataTable;

const formatParams = params => {
  console.log(' formatParams   params,   ： ', params);
  // const query = fields.map(item => `&value=${item.value}`).join('');
  const query = '';
  const queryParams = `?point_id=${params.point_id}&start_time=${params.startTime}&end_time=${params.endTime}${query}`;
  console.log(' query ： ', query, queryParams); //
  return queryParams;
};

export const RealDataTableCom = props => {
  const [form] = Form.useForm();

  const {
    data: alarmCurveList,
    isLoading,
    req: getAlarmCurveListAsync,
  } = useHttp(getAlarmCurveList, {
    format: res => formatSelectList(res),
    noMountFetch: true,
  });
  const { data: monitorPointList, req: getMonitorPointListAsync } = useHttp(
    () =>
      getMonitorPointList({
        station_id: props.stationId,
        // station_id: 5831,
      }),
    {
      format: res => {
        console.log('  副作用 对吗  res.length ', res);
        if (res.length > 0) {
          getAlarmCurveListAsync(() => {
            form.setFieldsValue({
              point_id: `${res[0].id}`,
            });
            return getAlarmCurveList(
              formatParams({
                ...props,
                point_id: res[0].id,
              }),
            );
          });
        }
        return formatSelectList(res);
      },
    },
  );

  // useEffect(() => {
  //   console.log(' 副作用 ： ', props, monitorPointList); //
  //   // getAlarmCurveListAsync(() => getAlarmCurveList({

  //   // }))
  // }, [monitorPointList]);

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
    loading: isLoading,
    title: () => (
      <div className={'fsb'}>
        <SearchForm
          config={config}
          init={{ time: props.time }}
          onFieldChange={onFieldChange}
          propsForm={form}
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
