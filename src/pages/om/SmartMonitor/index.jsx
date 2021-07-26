import React from 'react';
import { useRequest, history } from 'umi';
import { Tabs, DatePicker, Select, Button } from 'antd';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/legend';
import get from 'lodash/get';
import map from 'lodash/map';
import isNumber from 'lodash/isNumber';
import moment from 'moment';
import PageTitle from '@/components/Widgets/PageTitle';
import Container from '@/components/Container';
import EnergyChart from './EnergyChart';
import RealData from './RealData';
import ChartPeak from './ChartPeak';
import ChartLine from './ChartLine';
import ChartLine2 from './ChartLine2';
import * as services from '@/services/smartMonitor';
import { RealDataTableCom } from '@/components/Table/RealDataTable';
import styles from './index.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const HISTORY = 'HISTORY';
const REAL_DATA = 'REAL_DATA';
const ENERGY_CHART = 'ENERGY_CHART';
const toPercent = val => (isNumber(val) ? val * 100 : val);

const AlarmMonitor = React.memo(function SmartMonitor(props) {
  const {
    match: {
      params: { stationId },
    },
    location: {
      query: {
        type,
        point_id,
        day,
        duration,
        // startTime,
        // endTime,
      },
    },
  } = props;
  console.log(' propspropspropsprops ： ', props); //

  // const { data: points, loading: pointsLoading } = useRequest(
  //   () => services.getMonitorPoints({point_id}, ),
  //   {
  //     formatResult(res) {
  //       return get(res, 'list', []);
  //     },
  //     ready: !!number,
  //   },
  // );

  const [point, setPoint] = React.useState();
  const [tab, setTab] = React.useState('u');
  const [hackValue, setHackValue] = React.useState();
  const [date, setDate] = React.useState([
    moment(
      moment(day)
        // .subtract(1, 'days')
        .format('YYYY-MM-DD  HH:mm:ss'),
    ),
    moment(day).add(duration, 'seconds'),
    // .add(3000, 'seconds'),
  ]);

  const onChange = item => {
    setPoint(item);
  };

  // React.useEffect(() => {
  //   if (points && points.length) {
  //     setPoint(points[0].line);
  //   }
  // }, [points]);

  const paramProps = {
    // number,
    // stationId,
    // point,
    point_id,
    // startTime: date[0] ? `${date[0].format('YYYY-MM-DD')} 00:00:00` : null,
    // endTime: date[1] ? `${date[1].format('YYYY-MM-DD')} 23:59:59` : null,
    startTime: date[0]
      ? moment(date[0])
          .subtract(1, 'hours')
          .format('YYYY-MM-DD HH:mm:ss')
      : null,
    endTime: date[1]
      ? moment(date[1])
          .add(1, 'hours')
          .format('YYYY-MM-DD HH:mm:ss')
      : null,
  };
  console.log(
    ' hackValue || date ： ',
    hackValue,
    date,
    paramProps,
    moment('2021-05-17'),
    moment(day),
    moment(day)
      // .add(duration, 'seconds')
      .add(3000, 'seconds'),
  ); //
  const disabledDate = current => {
    const limit = 30;
    const tooLate = date[0] && current.diff(date[0], 'days') > limit;
    const tooEarly = date[1] && date[1].diff(current, 'days') > limit;

    return tooEarly || tooLate || current > moment().endOf('day');
  };

  const onOpenChange = open => {
    if (open) {
      setHackValue([]);
      setDate([]);
    } else {
      setHackValue(undefined);
    }
  };
  const hiddenDate = tab === REAL_DATA || tab === ENERGY_CHART;

  return (
    <div className={styles.container}>
      <Container emptyText="暂无电站信息，无法展示监控数据">
        <div className="fsb ">
          <PageTitle title="智能监控" />
          <div className=" dfc">
            <Button type="primary" onClick={history.goBack}>
              返回
            </Button>
          </div>
        </div>
        <div className={styles.subtitleBox}>
          <div className={styles.date}>
            <div>选择时间：</div>
            <RangePicker
              allowClear={false}
              onChange={setDate}
              onOpenChange={onOpenChange}
              onCalendarChange={val => setDate(val)}
              disabledDate={disabledDate}
              value={hackValue || date}
              dropdownClassName={styles.datepicker}
              showTime
              // bordered={false}
            />
          </div>
        </div>
        <Container
          // empty={!get(points, 'length')}
          emptyText="暂无监控点信息，无法展示监控数据"
        >
          <Tabs onChange={val => setTab(val)}>
            <TabPane tab="电压" key="u">
              {tab === 'u' ? (
                <ChartLine2
                  {...paramProps}
                  unit="V"
                  // min={200}
                  load={tab === 'u'}
                  fields={[
                    {
                      name: 'A相电压',
                      value: 'ua',
                    },
                    {
                      name: 'B相电压',
                      value: 'ub',
                    },
                    {
                      name: 'C相电压',
                      value: 'uc',
                    },
                  ]}
                />
              ) : null}
            </TabPane>
            <TabPane tab="电流" key="a">
              {tab === 'a' ? (
                <ChartLine2
                  {...paramProps}
                  unit="A"
                  load={tab === 'a'}
                  fields={[
                    {
                      name: 'A相电流',
                      value: 'ia',
                    },
                    {
                      name: 'B相电流',
                      value: 'ib',
                    },
                    {
                      name: 'C相电流',
                      value: 'ic',
                    },
                  ]}
                />
              ) : null}
            </TabPane>
            <TabPane tab="MD" key="md">
              {tab === 'md' ? (
                <ChartLine2
                  {...paramProps}
                  unit="KW"
                  load={tab === 'md'}
                  fields={[
                    {
                      name: '有功需量',
                      value: 'p_d',
                    },
                  ]}
                />
              ) : null}
            </TabPane>
            <TabPane tab="变压器负载率" key="lb">
              {tab === 'lb' ? (
                <ChartLine2
                  {...paramProps}
                  unit="%"
                  load={tab === 'lb'}
                  fields={[
                    {
                      name: '变压器负载率',
                      value: 'p_rate',
                    },
                  ]}
                  formatter={v => toPercent(v)}
                />
              ) : null}
            </TabPane>
          </Tabs>
        </Container>
      </Container>
    </div>
  );
});

export default React.memo(function SmartMonitor(props) {
  const {
    match: {
      params: { stationId },
    },
    location: {
      query: { type },
    },
  } = props;
  console.log(' propspropspropsprops ： ', props); //

  if (type === 'alarmRecord') {
    return <AlarmMonitor {...props}></AlarmMonitor>;
  }

  const { data: stationData, loading: stationLoading } = useRequest(
    () => services.getStationInfo(stationId),
    {
      formatResult(res) {
        return get(res, 'bean');
      },
    },
  );
  const number = get(stationData, 'electricity_user.number');
  console.log('stationData==', stationData, number);
  const { data: points, loading: pointsLoading } = useRequest(
    () => services.getMonitorPoints(number, stationId),
    {
      formatResult(res) {
        return get(res, 'list', []);
      },
      ready: !!number,
    },
  );

  const [point, setPoint] = React.useState();
  const [imei, setImei] = React.useState(null);

  const [tab, setTab] = React.useState(REAL_DATA);
  // const [tab, setTab] = React.useState(HISTORY);
  const [hackValue, setHackValue] = React.useState();
  const [date, setDate] = React.useState([
    moment(moment().format('YYYY-MM-DD HH:mm:ss')),
    moment(),
  ]);
  console.log(' date ： ', date); //

  const onChange = (item, rest) => {
    console.log(' onChange   ： ', item, rest); //
    setPoint(item);
    setImei(rest.imei);
  };

  React.useEffect(() => {
    if (points && points.length) {
      setPoint(points[0].line);
      setImei(points[0].imei);
    }
  }, [points]);

  const paramProps = {
    imei,
    number,
    stationId,
    point,
    startTime: date[0] ? `${date[0].format('YYYY-MM-DD HH:mm:ss')}` : null,
    endTime: date[1] ? `${date[1].format('YYYY-MM-DD HH:mm:ss')}` : null,
  };

  const disabledDate = current => {
    const limit = 30;
    const tooLate = date[0] && current.diff(date[0], 'days') > limit;
    const tooEarly = date[1] && date[1].diff(current, 'days') > limit;

    return tooEarly || tooLate || current > moment().endOf('day');
  };

  const onOpenChange = open => {
    if (open) {
      setHackValue([]);
      setDate([]);
    } else {
      setHackValue(undefined);
    }
  };
  const hiddenDate =
    tab === REAL_DATA || tab === ENERGY_CHART || tab === HISTORY;

  return (
    <div className={styles.container}>
      <Container
        loading={stationLoading}
        empty={!stationData}
        emptyText="暂无电站信息，无法展示监控数据"
      >
        <PageTitle title="智能监控" />
        <div className={styles.subtitleBox}>
          <div className={styles.subtitle}>
            电站名称：{get(stationData, 'name', '-')}
          </div>
          <div style={{ marginLeft: 30 }}>监控点：</div>
          <Select
            className={styles.select}
            onChange={onChange}
            notFoundContent="暂无监控点"
            options={map(points, item => ({
              label: item.name,
              value: item.line,
              imei: item.imei,
            }))}
            value={point}
          />
          <div
            className={styles.date}
            style={{
              visibility: hiddenDate ? 'hidden' : 'visible',
              marginLeft: 30,
            }}
          >
            <div>选择时间：</div>
            <RangePicker
              allowClear={false}
              onChange={setDate}
              onOpenChange={onOpenChange}
              onCalendarChange={val => setDate(val)}
              disabledDate={disabledDate}
              value={hackValue || date}
              dropdownClassName={styles.datepicker}
              // bordered={false}
              showTime
            />
          </div>
        </div>
        <Container
          loading={pointsLoading}
          empty={!get(points, 'length')}
          emptyText="暂无监控点信息，无法展示监控数据"
        >
          <Tabs onChange={val => setTab(val)}>
            <TabPane tab="实时监控数据" key={REAL_DATA}>
              <RealData {...paramProps} load={tab === REAL_DATA} />
            </TabPane>
            <TabPane tab="能耗曲线" key={ENERGY_CHART}>
              <EnergyChart {...paramProps} load={tab === ENERGY_CHART} />
            </TabPane>
            <TabPane tab="电压" key="u">
              <ChartLine
                {...paramProps}
                unit="V"
                // min={200}
                load={tab === 'u'}
                fields={[
                  {
                    name: 'A相电压',
                    value: 'ua',
                  },
                  {
                    name: 'B相电压',
                    value: 'ub',
                  },
                  {
                    name: 'C相电压',
                    value: 'uc',
                  },
                ]}
              />
            </TabPane>
            <TabPane tab="电流" key="a">
              <ChartLine
                {...paramProps}
                unit="A"
                load={tab === 'a'}
                fields={[
                  {
                    name: 'A相电流',
                    value: 'ia',
                  },
                  {
                    name: 'B相电流',
                    value: 'ib',
                  },
                  {
                    name: 'C相电流',
                    value: 'ic',
                  },
                ]}
              />
            </TabPane>
            <TabPane tab="MD" key="md">
              <ChartLine
                {...paramProps}
                unit="KW"
                load={tab === 'md'}
                fields={[
                  {
                    name: '有功需量',
                    value: 'px',
                  },
                ]}
              />
            </TabPane>
            <TabPane tab="负荷" key="payload">
              <ChartLine
                {...paramProps}
                unit="KW"
                load={tab === 'payload'}
                fields={[
                  {
                    name: '负荷',
                    value: 'psum',
                  },
                ]}
              />
            </TabPane>
            <TabPane tab="变压器负载率" key="lb">
              <ChartLine
                {...paramProps}
                unit="%"
                load={tab === 'lb'}
                fields={[
                  {
                    name: '变压器负载率',
                    value: 'p_rate',
                  },
                ]}
                formatter={v => toPercent(v)}
              />
            </TabPane>
            <TabPane tab="功率因数" key="num">
              <ChartLine
                {...paramProps}
                unit="A"
                load={tab === 'num'}
                fields={[
                  {
                    name: 'A相功率因数',
                    value: 'pfa',
                  },
                  {
                    name: 'B相功率因数',
                    value: 'pfb',
                  },
                  {
                    name: 'C相功率因数',
                    value: 'pfc',
                  },
                  {
                    name: '总功率因数',
                    value: 'pfsum',
                  },
                ]}
              />
            </TabPane>
            <TabPane tab="峰平谷" key="peak">
              <ChartPeak {...paramProps} load={tab === 'peak'} />
            </TabPane>
            <TabPane tab="历史" key={HISTORY}>
              <RealDataTableCom
                {...paramProps}
                load={tab === HISTORY}
                time={date}
              ></RealDataTableCom>
            </TabPane>
          </Tabs>
        </Container>
      </Container>
    </div>
  );
});
