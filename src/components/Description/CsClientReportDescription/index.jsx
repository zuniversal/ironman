import React, { useState, useEffect, useRef } from 'react';
import './style.less';
import { Descriptions, Button } from 'antd';
import CsClientReportPie from '@/components/Echarts/CsClientReportPie';
import useExportPdf from '@/hooks/useExportPdf';
import CsHomeLine from '@/components/Echarts/CsHomeLine';
import SmartEcharts from '@/common/SmartEcharts';
import stamp from '@/static/assets/stamp.png';
import powerHZ from '@/static/assets/powerHZ.png';
import gzh from '@/static/assets/gzh.png';
import { voltageLevelMap } from '@/configs';

const coverImgConfig = [
  {
    label: `电管家50赫兹app`,
    img: powerHZ,
    key: 'powerHZ',
  },
  {
    label: `电管家公众号`,
    img: gzh,
    key: 'gzh',
  },
];

const legend = ['工单数'];

const xAxis = [
  '10月',
  '11月',
  '12月',
  '01月',
  '02月',
  '03月',
  '04月',
  '05月',
  '06月',
  '07月',
  '08月',
  '09月',
];

const DescItem = Descriptions.Item;

const renderDescItem = (data = {}, config = []) => {
  // console.log(' renderDescItem   ,   ： ', props,  )
  return config.map((v, i) => (
    <DescItem label={v.label} key={i}>
      {/* {v.label} */}
      {/* {v.key} */}
      {data[v.key]}
    </DescItem>
  ));
};
const renderDescCol = (data = {}, config = []) => {
  // console.log(' renderDescCol   ,   ： ', props,  )
  return (
    <div className="colWrapper">
      {config.map((v, i) => (
        <div className={`rowItem`} key={i}>
          <div className={`item`}>{v.label}</div>
          {/* <div className={`item`}>占 {v.key}%</div> */}
        </div>
      ))}
    </div>
  );
};

const ColBlock = props => {
  // console.log(' ColBlock   ,   ： ', props,  )
  const { data = {}, config = [], unit = '', ...rest } = props;
  return (
    <div className="colWrapper">
      {config.map((v, i) => (
        <div className={`rowItem`} key={i}>
          <div className={`item`}>
            {v.label} {data[v.key]} {unit}
          </div>
        </div>
      ))}
    </div>
  );
};

const billConfig = [
  {
    label: '总电度数(千瓦时)：',
    // key: ['bill', 'volume'],
    key: 'volume',
  },
  {
    label: '总容量：(KVA)',
    key: 'capacity',
  },
  {
    label: '总金额：(元)',
    // key: ['bill', 'amount'],
    key: 'amount',
  },
];

const mdConfig1 = [
  {
    label: '本月申报MD：(千瓦)',
    key: 'report_md',
  },
  {
    label: '本月实际MD：(千瓦)',
    key: 'max_md',
  },
];

const mdConfig2 = [
  {
    label: '电价分类',
    key: 'basic_price',
    key: 'fixed',
  },
  {
    label: '计费(千瓦)',
    key: 'max_md',
  },
  {
    label: '单价(元)',
    key: 'basic_price',
  },
  {
    // 计费 * 单价
    label: '合计(元)',
    key: 'calcAll',
  },
];

const capcityConfig = [
  {
    label: 'cosφ标准：',
    key: 'power_factor',
  },
  {
    label: 'cosφ实际：',
    key: 'power_factor_real',
  },
  {
    label: 'cosφ调整：',
    key: 'power_factor_adjust',
  },
  {
    label: 'cosφ奖惩：',
    key: 'amount_adjust',
  },
];

// 空着
const powerAnaysisConfig = [
  {
    label: '售电电量(千瓦时)',
    key: '',
  },
  {
    label: '售电电量占比(%)',
    key: '',
  },
  {
    label: '节约电费(元)',
    key: '',
  },
];

const anaysisConfig = [
  {
    label: '户 号',
    key: 'number',
    column: 1,
  },
  {
    label: '装接/实际容量',
    key: 'capacityRate',
    className: 'capacityRate',
    column: 2,
    colspan: 2,
    span: 2,
  },
  {
    label: '天 气',
    key: 'weather',
    column: 1,
  },
  {
    label: '温/湿度',
    // key: 'humidity',
    key: 'humidityTemp',
    column: 2,
  },
];

const sellPowerConfig = [];

const deviceStatusConfig = [
  {
    label: '表号：',
    key: 'meter_number',
  },
  {
    label: '电源编号：',
    key: 'power_number',
  },
  {
    label: '容量（KVA）：',
    key: 'real_capacity',
  },
  {
    label: '电压等级：',
    key: 'voltage_level',
    dataMap: voltageLevelMap,
  },
];

const RenderFooter = props => {
  console.log(' footerConfig RenderFooter   ,   ： ', props);
  const { data = {}, config = [], ...rest } = props;
  return config.map((v, i) => (
    <DescItem label={v.label} key={i}>
      <div className="signLine">{data[v.key]}</div>
    </DescItem>
  ));
};

const CsClientReportPieCom = props => (
  <CsClientReportPie
    // props={props}
    // ref={ref => domRef = ref}
    // ref={domRef}
    {...props}
    onChartReady={e => {
      const url = e.getDataURL();
      // console.log('ExportPdf  e ： ', e, url )//
      props.setPieUrl(url);
    }}
    // className="pie posHidden hidden "></CsClientReportPie>
    className={`pie ${props.pieUrl ? 'hidden' : ''}`}
  ></CsClientReportPie>
);

const DescBlock = props => {
  // console.log(' DescBlock   ,   ： ', props,  )
  const { data = {}, config = [], ...rest } = props;
  return (
    <Descriptions title="" bordered layout="vertical" {...rest}>
      {config.map((v, i) => (
        <DescItem label={v.label} key={i} {...v}>
          {v.dataMap ? v.dataMap[data[v.key]] : data[v.key]}
          {/* {v.label} */}
          {/* {v.key} */}
        </DescItem>
      ))}
    </Descriptions>
  );
};

const coverConfig = [
  {
    label: `户号`,
    key: 'number',
  },
  {
    label: `户名`,
    key: 'name',
  },
  {
    label: `地址`,
    key: 'address',
  },
  {
    label: `联系人`,
    key: 'contact_name',
  },
  {
    label: `电话`,
    key: 'contact_phone',
  },
  {
    label: `报告月份`,
    key: 'year_month',
  },
];

const ReportCover = props => {
  const { data = {}, config = [] } = props;
  return (
    <div className="reportCoverWrapper">
      {/* {coverConfig.map((v, i) => <div className={`rowItem`}  key={i} >
      <div className={`item f1`} >{v.label}:</div>
      <div className={`item f3`} >{v.label}</div>
    </div>)} */}
      {/* <div className={`rowItem`} >
      户&nbsp;&nbsp;&nbsp;&nbsp;号：:
      <div className={`item f3`} >x</div>
    </div> */}
      <div className="df infoWrapper">
        {coverConfig.map((v, i) => (
          <div className={`rowItem`} key={i}>
            <div className={`label item f2`}>{v.label}</div>
            <div className={`item f3`}>：{data[v.key]}</div>
          </div>
        ))}
      </div>
      <div className={`imgWrapper`}>
        {coverImgConfig.map((v, i) => (
          <div className={`f1`} key={i}>
            <img src={v.img} className="coverImg " />
            <div className={`label `}>{v.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MonthPowerReport = props => {
  console.log(' MonthPowerReport ：', props);
  const { formBtn, data, ...rest } = props;
  // const headerCom = (
  //   <Descriptions title="" className="headerWrapper " layout="vertical" colon={false} column={1}>
  //     <DescItem label={'月度用电分析报告'} className="noPadding ant-descriptions-item pdfTitle">
  //       <Descriptions column={2}>
  //         <DescItem label={'户 号'}>{''}</DescItem>
  //         <DescItem label={'电源编号'}>{''}</DescItem>
  //       </Descriptions>
  //     </DescItem>
  //   </Descriptions>
  // );

  const config1 = [
    {
      label: `峰`,
      key: 'peak_volume',
    },
    {
      label: `平`,
      key: 'usual_volume',
    },
    {
      label: `谷`,
      key: 'valley_volume',
    },
    {
      label: `其他`,
      key: 'other_volume',
    },
  ];

  const config2 = [
    {
      label: `总电费`,
      key: 'peak_price',
    },
    {
      label: `总电费`,
      key: 'usual_price',
    },
    {
      label: `总电费`,
      key: 'valley_price',
    },
    {
      label: `总电费`,
      key: 'other_price',
    },
  ];

  const config3 = [
    {
      label: `占`,
      name: `峰`,
      key: 'peak_volume_b',
    },
    {
      label: `占`,
      name: `平`,
      key: 'usual_volume_b',
    },
    {
      label: `占`,
      name: `谷`,
      key: 'valley_volume_b',
    },
    {
      label: `占`,
      name: `其他`,
      key: 'other_volume_b',
    },
  ];

  const config4 = [
    {
      label: `占`,
      name: `峰`,
      key: 'peak_price_b',
    },
    {
      label: `占`,
      name: `平`,
      key: 'usual_price_b',
    },
    {
      label: `占`,
      name: `谷`,
      key: 'valley_price_b',
    },
    {
      label: `占`,
      name: `其他`,
      key: 'other_price_b',
    },
  ];

  const pieData1 = config3.map(v => ({
    ...v,
    value: props.data[v.key],
    name: `${v.name} ${props.data[v.key]} %`,
  }));
  const pieData2 = config4.map(v => ({
    ...v,
    value: props.data[v.key],
    name: `${v.name} ${props.data[v.key]} %`,
  }));
  console.log(' pieData1 ： ', pieData1, pieData2);
  const domRef = useRef();

  // const pieData2 = [
  //   { value: 335, name: '访问直接' },
  //   { value: 310, name: '邮件营销' },
  //   { value: 234, name: '联盟广告' },
  //   { value: 135, name: '视频广告' },
  //   { value: 1548, name: '搜索引擎' },
  // ]
  // const pieData1 = [
  //   { value: 335, name: '访问直接' },
  //   { value: 310, name: '邮件营销' },
  //   { value: 234, name: '联盟广告' },
  //   { value: 135, name: '视频广告' },
  //   { value: 1548, name: '搜索引擎' },
  // ]

  const [pieUrl1, setPieUrl1] = useState('');
  const [pieUrl2, setPieUrl2] = useState('');
  // console.log(' ExportPdf pieUrl ： ', pieUrl,  )//
  // console.log(' ExportPdf pieUrl ： ', pieUrl1, pieUrl2,  )//
  const pieCom1 = (
    <CsClientReportPieCom
      pieUrl={pieUrl1}
      data={pieData1}
      setPieUrl={setPieUrl1}
    ></CsClientReportPieCom>
  );
  const pieCom2 = (
    <CsClientReportPieCom
      pieUrl={pieUrl2}
      data={pieData2}
      setPieUrl={setPieUrl2}
    ></CsClientReportPieCom>
  );
  // console.log(' pieCom ： ', pieCom1, domRef);

  const headerCom = (
    <div className="headerWrapper">
      <div className={`pdfTitle`}>月度用电分析报告</div>
      <Descriptions column={2}>
        <DescItem label={'户 号'}>{data.number}</DescItem>
        <DescItem label={'电源编号'}>{data.power_number}</DescItem>
      </Descriptions>
    </div>
  );

  const footerConfig = [
    {
      label: `报告人`,
      key: 'repoter',
    },
    {
      label: `审核人`,
      key: 'reviewer',
    },
    {
      label: `报告时间`,
      key: 'reportTime',
    },
    {
      label: `报告提供方`,
      key: 'provider',
    },
  ];

  const billFooterData = {
    reportTime: props.reportTime,
    repoter: '夏瑞春',
    // reviewer: '华思明',
    reviewer: '王晓冬',
    provider: '电管家能源管理(上海)有限公司',
  };

  const footerCom = (
    <Descriptions column={2} className="footerWrapper">
      {footerConfig.map((v, i) => (
        <DescItem label={v.label} key={i}>
          <div className="signLine">{billFooterData[v.key]}</div>
          <img src={stamp} className="stamp " />
        </DescItem>
      ))}
    </Descriptions>
  );

  // const footerCom = <RenderFooter data={data} config={footerConfig} ></RenderFooter>

  const basePowerCom = (
    <Descriptions
      title=""
      bordered
      className=" "
      layout="vertical"
      // column={1}
    >
      <DescItem
        label={'基本用电情况'}
        className="noPadding descTitle"
        layout="vertical"
      >
        <Descriptions title="" bordered className=" " column={1}>
          <DescItem label={'电费信息'} className="label noPadding ">
            <DescBlock data={data} config={billConfig}></DescBlock>
          </DescItem>
          <DescItem label={'MD'} className="label noPadding ">
            <DescBlock data={data} config={mdConfig1}></DescBlock>
            <DescBlock data={data} config={mdConfig2} column={4}></DescBlock>
          </DescItem>
          <DescItem label={'功率因数'} className="label noPadding ">
            <DescBlock
              data={data}
              config={capcityConfig}
              column={4}
            ></DescBlock>
          </DescItem>
          <DescItem
            label={'峰平谷用电分析'}
            bordered={false}
            className="label noPadding "
          >
            <div className="columns">
              <div className="f1 ">
                {/* <CsClientReportPie props={props}  className="f1 pie"></CsClientReportPie> */}
                {/* {pieCom} */}
                <img src={pieUrl1} className={`pie`} />
                {pieCom1}
                <div className="df">
                  <ColBlock
                    data={data}
                    config={config1}
                    unit={'千瓦时'}
                  ></ColBlock>
                  <ColBlock data={data} config={config3} unit={'%'}></ColBlock>
                </div>
              </div>
              <div className="f1 ">
                {/* <CsClientReportPie props={props}  className="f1 pie"></CsClientReportPie> */}
                <img src={pieUrl2} className={`pie`} />
                {pieCom2}
                <div className="df">
                  <ColBlock data={data} config={config2} unit={'元'}></ColBlock>
                  <ColBlock data={data} config={config4} unit={'%'}></ColBlock>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="f1 "></div>
              <div className="f1 "></div>
            </div>
          </DescItem>
        </Descriptions>
      </DescItem>
    </Descriptions>
  );

  const appraisalCom = (
    <div className="appraisalWrapper">
      <Descriptions
        title=""
        bordered
        className=" "
        layout="vertical"
        column={1}
      >
        <DescItem label={'总评情况'} className="noPadding descTitle">
          <Descriptions title="" bordered className=" " column={1}>
            <DescItem label={'数据分析'} className="label noPadding ">
              <Descriptions title="" bordered column={2}>
                <DescItem label={''}>{'上月'}</DescItem>
                <DescItem label={'本月'} className={'bgw'}>
                  {'同比增(减)'}
                </DescItem>
                <DescItem label={'用电总容量'}>
                  {data['old_volume']} 千瓦时
                </DescItem>
                <DescItem label={`${data['volume']}千瓦时`} className={'bgw'}>
                  {data['volumeRate']} %
                </DescItem>
                <DescItem label={'平均单位电价'}>
                  {data['oldAvg']} 千瓦时
                </DescItem>
                <DescItem
                  label={`${data['nowAvg']} 元/千瓦时`}
                  className={'bgw'}
                >
                  {data['rate']}%
                </DescItem>
                <DescItem label={'总金额'}>{data['old_amount']} 元</DescItem>
                <DescItem label={`${data['amount']} 元`} className={'bgw'}>
                  {data['amountRate']}%
                </DescItem>
              </Descriptions>
            </DescItem>
            <DescItem label={'售电'} className="label noPadding ">
              <DescBlock
                data={data}
                config={powerAnaysisConfig}
                column={3}
              ></DescBlock>
            </DescItem>
          </Descriptions>
        </DescItem>
      </Descriptions>
    </div>
  );

  return (
    <div className="monthPowerReport descWrapper">
      {headerCom}
      {basePowerCom}
      {appraisalCom}
      {footerCom}
    </div>
  );
};

const MonthStationReport = props => {
  console.log(' MonthStationReport ：', props);
  const { formBtn, data, ...rest } = props;
  const headerCom = (
    <div className="headerWrapper">
      <div className={`pdfTitle`}>变(配)电站月度运行报告</div>
      {/* <DescBlock data={data?.inspect_in[0]} config={anaysisConfig} column={4} bordered={false} layout={'horizontal'} ></DescBlock> */}
      <DescBlock
        data={data}
        config={anaysisConfig}
        column={5}
        bordered={false}
        layout={'horizontal'}
      ></DescBlock>
    </div>
  );

  const footerConfig = [
    {
      label: `巡检组长：`,
      key: 'team_headman_name',
    },
    {
      label: `审核人：`,
      key: '',
      // val: '华思明',
      val: '王晓冬',
    },
    {
      label: `巡检时间：`,
      key: '',
      val: props.reportTime,
    },
    {
      label: ` `,
      key: '',
      val: '电管家能源管理(上海)有限公司',
    },
  ];

  const footerCom = (
    <Descriptions column={2} className="footerWrapper" colon={false}>
      {footerConfig.map((v, i) => (
        <DescItem label={v.label} key={i}>
          <div className="signLine">{v.val ?? data[v.key]}</div>
          <img src={stamp} className="stamp " />
        </DescItem>
      ))}
    </Descriptions>
  );
  console.log(' footerConfig ： ', footerConfig, footerCom);

  const config1 = [
    {
      label: '倍率',
      key: 'magnification',
    },
    {
      label: '总有功(02)',
      key: 'total_active_power',
    },
    {
      label: '峰(03)',
      key: 'peak',
    },
    {
      label: '平1(41)',
      key: 'flat_1',
    },
    {
      label: '平2(42)',
      key: 'flat_2',
    },
    {
      label: '谷(05)',
      key: 'valley',
    },
    {
      label: '峰MD(61)',
      key: 'peak_md',
    },
  ];
  const config2 = [
    {
      label: '平1MD(62)',
      key: 'flat_1_md',
    },
    {
      label: '平2MD(63)',
      key: 'flat_2_md',
    },
    {
      label: '谷MD(64)',
      key: 'valley_md',
    },
    {
      label: '最大MD',
      key: 'max_md',
    },
    {
      label: '实际功率因数',
      key: 'real_power_factor',
    },
    {
      label: '无功1(07)',
      key: 'reactive_power_1',
    },
    {
      label: '无功2(08)',
      key: 'reactive_power_2',
    },
  ];
  const config3 = [
    {
      label: '电压表AB',
      key: 'v_ab',
    },
    {
      label: '电压表BC',
      key: 'v_bc',
    },
    {
      label: '电压表CA',
      key: 'v_ca',
    },
    {
      label: '带电显示器A',
      key: 'i_ma',
    },
    {
      label: '带电显示器B',
      key: 'i_mb',
    },
    {
      label: '带电显示器C',
      key: 'i_mc',
    },
  ];

  // 出线侧
  const config4 = [
    {
      label: '电流表AB',
      key: 'o_ia',
    },
    {
      label: '电流表BC',
      key: 'o_ib',
    },
    {
      label: '电流表CA',
      key: 'o_ic',
    },
    {
      label: '显示器A',
      key: 'o_ma',
    },
    {
      label: '显示器B',
      key: 'o_mb',
    },
    {
      label: '显示器C',
      key: 'o_mc',
    },
  ];
  const config5 = [
    {
      label: '风扇运行',
      key: 'fan',
    },
    {
      label: '运行声音',
      key: 'voice',
    },
    {
      label: '油位及渗油',
      key: 'oil_leak',
    },
    {
      label: '温度',
      key: 'temperature3',
    },
    {
      label: '干燥剂',
      key: 'dry',
    },
    {
      label: '有无异常',
      key: 'abnormal',
    },
  ];
  const config6 = [
    {
      label: '电压表AB',
      key: 'switch_v_ab',
    },
    {
      label: '电压表BC',
      key: 'switch_v_bc',
    },
    {
      label: '电压表CA',
      key: 'switch_v_ca',
    },
    {
      label: '电流表A',
      key: 'switch_ia',
    },
    {
      label: '电流表B',
      key: 'switch_ib',
    },
    {
      label: '电流表C',
      key: 'switch_ic',
    },
  ];

  const deviceStatusCom = (
    <Descriptions
      title=""
      bordered
      className=" "
      layout="vertical"
      // column={1}
    >
      <DescItem
        label={'设备情况'}
        className="noPadding descTitle"
        layout="vertical"
      >
        {data?.inspect_in.map((v, i) => (
          <DescItem label={''} className="label noPadding noBreak " key={i}>
            <DescItem label={'电费信息'} className="label noPadding ">
              {/* <DescBlock data={data?.inspect} config={deviceStatusConfig} column={4} ></DescBlock> */}
              <DescBlock
                data={v}
                config={deviceStatusConfig}
                column={4}
              ></DescBlock>
              {/* {data?.inspect.map((v, i) => (<DescBlock data={v} config={deviceStatusConfig} column={4} ></DescBlock>))} */}
            </DescItem>
            <Descriptions
              title=""
              bordered
              className="inspectRowTitle "
              column={1}
            >
              <DescItem label={'电表读数'} className="label noPadding ">
                <Descriptions title="" bordered layout="vertical" column={7}>
                  {renderDescItem(v, config1)}
                  {renderDescItem(v, config2)}
                </Descriptions>
              </DescItem>
              <DescItem label={'高压进线侧'} className="label noPadding ">
                <DescBlock data={v} config={config3} column={6}></DescBlock>
              </DescItem>
            </Descriptions>
            {data?.spectOut[i].map((item, index) => (
              <Descriptions
                title=""
                bordered
                className="inspectRowTitle "
                column={1}
                key={index}
              >
                <DescItem
                  label={`高压出线侧${index + 1}`}
                  className="label noPadding "
                >
                  <DescBlock
                    data={item}
                    config={config4}
                    column={6}
                  ></DescBlock>
                </DescItem>
                <DescItem
                  label={`变压器编号${index + 1}`}
                  className="label noPadding "
                >
                  <DescBlock
                    data={item}
                    config={config5}
                    column={6}
                  ></DescBlock>
                </DescItem>
                <DescItem
                  label={`0.4KV总开关${index + 1}`}
                  className="label noPadding "
                >
                  <DescBlock
                    data={item}
                    config={config6}
                    column={6}
                  ></DescBlock>
                </DescItem>
              </Descriptions>
            ))}
          </DescItem>
        ))}
      </DescItem>
    </Descriptions>
  );

  const houseConfig = [
    {
      label: '电缆沟及盖板',
      key: 'cable_conduit_status',
    },
    {
      label: '电缆夹层空洞',
      key: 'cable_holes_status',
    },
    {
      label: '护网是否完好',
      key: 'frame_status',
    },
    {
      label: '地面裂缝',
      key: 'ground_status',
    },
    {
      label: '门窗是否完好',
      key: 'window_status',
    },
    {
      label: '房屋渗水情况',
      key: 'house_status',
    },
  ];

  const safeToolConfig = [
    {
      label: '高压验电笔',
      key: 'electroprobe_status',
    },
    {
      label: '接地线',
      key: 'ground_wire',
    },
    {
      label: '绝缘毯',
      key: 'insulating_mat',
    },
    {
      label: '高压绝缘手套',
      key: 'insulating_gloves',
    },
    {
      label: '高压绝缘靴',
      key: 'insulating_shoes',
    },
    {
      label: '灭火器压力情况',
      key: 'extinguisher',
    },
  ];

  const facilityCom = (
    <div className="appraisalWrapper">
      <Descriptions
        title=""
        bordered
        className=" "
        layout="vertical"
        column={1}
      >
        <DescItem label={'设施情况'} className="noPadding descTitle">
          <Descriptions title="" bordered className=" " column={1}>
            <DescItem label={'房屋土建'} className="label noPadding ">
              <DescBlock
                data={data}
                config={houseConfig}
                column={6}
              ></DescBlock>
            </DescItem>
            <DescItem label={'安全工器具'} className="label noPadding ">
              <DescBlock
                data={data}
                config={safeToolConfig}
                column={6}
              ></DescBlock>
            </DescItem>
          </Descriptions>
        </DescItem>
      </Descriptions>
    </div>
  );

  return (
    <div className="monthStationReport descWrapper">
      {headerCom}
      {deviceStatusCom}
      <div className="noBreak">
        {facilityCom}
        {footerCom}
      </div>
    </div>
  );
};

const CsClientReportDescription = props => {
  console.log(' CsClientReportDescription ：', props);

  // useEffect(() => {
  //   console.log(' ExportPdf useEffect ： ', );
  //   props.onChildLoad(true)
  // }, []);

  // const [ isExport, setIsExport ] = useState(false)
  // useExportPdf({
  //   isExportPDF: isExport,
  //   element: 'csClientReportDescription',
  //   // finish: () => setIsExport(!isExport),
  //   filename: '客户报告',
  // });
  // setTimeout(() => {
  //   console.log(' 打印完毕 ： ',    )
  //   // setIsExport(!isExport)
  //   setIsExport(true)
  // }, 2000)

  // useEffect(() => {
  //   console.log(' useEffectuseEffect ： ',    )
  //   setTimeout(() => {
  //     console.log(' 打印完毕 ： ',    )
  //     setIsExport(!isExport)
  //   }, 2000)
  // }, [])
  // setIsExport(!isExport)
  // setIsExport(!isExport)

  const com1 = props.data?.bill?.map((v, i) => (
    <MonthPowerReport
      data={v}
      key={i}
      reportTime={props.data?.year_month}
    ></MonthPowerReport>
  ));
  const com2 = props.data?.inspect?.map((v, i) => (
    <MonthStationReport
      data={v}
      key={i}
      reportTime={v.end_time?.split(' ')[0]}
    ></MonthStationReport>
  ));

  return (
    <div className={`csClientReportDescription ${props.className}`}>
      {/* <div className={'fje  '}>
        <Button
          type="primary"
          onClick={() => {
            console.log(' xx ： ', );
            window.print();
          }}
        >
          导出PDF
        </Button>
      </div> */}
      {props.top}
      <ReportCover data={props.data}></ReportCover>
      {com1}
      {com2}
      {/* <MonthStationReport></MonthStationReport> */}
    </div>
  );
};

CsClientReportDescription.defaultProps = {};

export default CsClientReportDescription;
