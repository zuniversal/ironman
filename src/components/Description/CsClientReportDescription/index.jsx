import React, { useState, useEffect, useRef } from 'react';
import './style.less';
import { Descriptions, Button } from 'antd';
import CsClientReportPie from '@/components/Echarts/CsClientReportPie'; //
import useExportPdf from '@/hooks/useExportPdf'; //
import CsHomeLine from '@/components/Echarts/CsHomeLine'; //
import SmartEcharts from '@/common/SmartEcharts'; //
import stamp from '@/static/assets/stamp.png'; //
import powerHZ from '@/static/assets/powerHZ.png'; //
import gzh from '@/static/assets/gzh.png'; //

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

const legend = ['趋势'];

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
      {v.label}
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
          <div className={`item`}>占 {v.label}%</div>
        </div>
      ))}
    </div>
  );
};

const coverConfig = [
  {
    label: `户号`,
    key: '',
  },
  {
    label: `户名`,
    key: '',
  },
  {
    label: `地址`,
    key: '',
  },
  {
    label: `联系人`,
    key: '',
  },
  {
    label: `电话`,
    key: '',
  },
  {
    label: `报告月份`,
    key: '',
  },
];
const ReportCover = props => {
  return (
    <div className="reportCoverWrapper">
      {/* {coverConfig.map((v, i) => <div className={`rowItem`}  key={i} >
      <div className={`item f1`} >{v.label}:</div>
      <div className={`item f3`} >{v.label}</div>
    </div>)} */}
      {/* <div className={`rowItem`} >
      户&nbsp;&nbsp;&nbsp;&nbsp;号：:
      <div className={`item f3`} >xxxx</div>
    </div> */}
      <div className="df infoWrapper">
        {coverConfig.map((v, i) => (
          <div className={`rowItem`} key={i}>
            <div className={`label item f2`}>{v.label}</div>
            <div className={`item f3`}>：{v.label}</div>
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
  console.log(' MonthPowerReport ：', props); //
  const { formBtn, ...rest } = props; //
  // const headerCom = (
  //   <Descriptions title="" className="headerWrapper " layout="vertical" colon={false} column={1}>
  //     <DescItem label={'月度用电分析报告'} className="noPadding ant-descriptions-item pdfTitle">
  //       <Descriptions column={2}>
  //         <DescItem label={'户 号'}>{'xxx'}</DescItem>
  //         <DescItem label={'电源编号'}>{'xxx'}</DescItem>
  //       </Descriptions>
  //     </DescItem>
  //   </Descriptions>
  // );

  const config1 = [
    {
      label: `峰 31728 千瓦时`,
      key: '',
    },
    {
      label: `平 41772 千瓦时`,
      key: '',
    },
    {
      label: `谷 20312 千瓦时`,
      key: '',
    },
    {
      label: `其他 0 千瓦时`,
      key: '',
    },
  ];

  const config2 = [
    {
      label: `总电费 元`,
      key: '',
    },
    {
      label: `总电费 元`,
      key: '',
    },
    {
      label: `总电费 元`,
      key: '',
    },
    {
      label: `总电费 元`,
      key: '',
    },
  ];

  const domRef = useRef();

  const [pieUrl, setPieUrl] = useState('');
  // console.log(' ExportPdf pieUrl ： ', pieUrl,  )//
  const pieCom = (
    <CsClientReportPie
      props={props}
      // ref={ref => domRef = ref}
      // ref={domRef}
      onChartReady={e => {
        const url = e.getDataURL();
        // console.log('ExportPdf  e ： ', e, url )//
        setPieUrl(url);
      }}
      // className="pie posHidden hidden "></CsClientReportPie>
      className={`pie ${pieUrl ? 'hidden' : ''}`}
    ></CsClientReportPie>
  );
  console.log(' pieCom ： ', pieCom, domRef); //

  const headerCom = (
    <div className="headerWrapper">
      <div className={`pdfTitle`}>月度用电分析报告</div>
      <Descriptions column={2}>
        <DescItem label={'户 号'}>{'xxx'}</DescItem>
        <DescItem label={'电源编号'}>{'xxx'}</DescItem>
      </Descriptions>
    </div>
  );

  const footerCom = (
    <Descriptions column={2} className="footerWrapper">
      <DescItem label={'报告人'}>
        <div className="signLine">{'xxx'}</div>
      </DescItem>
      <DescItem label={'审核人'}>
        <div className="signLine">{'xxx'}</div>
      </DescItem>
      <DescItem label={'报告时间'}>
        <div className="signLine">{'xxx'}</div>
      </DescItem>
      <DescItem label={'报告提供方'}>
        <div className="signLine">{'xxx'}</div>
      </DescItem>
    </Descriptions>
  );

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
            <Descriptions title="" bordered layout="vertical">
              <DescItem label={'总电度数(千瓦时)：'}>{'xxx'}</DescItem>
              <DescItem label={'总容量：(KVA)'}>{'aaac'}</DescItem>
              <DescItem label={'总金额：(元)'}>{'xxx'}</DescItem>
            </Descriptions>
          </DescItem>
          <DescItem label={'MD'} className="label noPadding ">
            <Descriptions title="" bordered layout="vertical">
              <DescItem label={'本月申报MD：(千瓦)'}>{'xxx'}</DescItem>
              <DescItem label={'本月实际MD：(千瓦)'}>{'xxx'}</DescItem>
            </Descriptions>
            <Descriptions title="" bordered layout="vertical" column={4}>
              <DescItem label={'电价分类'}>{'aaac'}</DescItem>
              <DescItem label={'计费(千瓦)'}>{'xxx'}</DescItem>
              <DescItem label={'单价(元)'}>{'xxx'}</DescItem>
              <DescItem label={'合计(元)'}>{'xxx'}</DescItem>
            </Descriptions>
          </DescItem>
          <DescItem label={'功率因数'} className="label noPadding ">
            <Descriptions title="" bordered layout="vertical" column={4}>
              <DescItem label={'cosφ标准：'}>{'xxx'}</DescItem>
              <DescItem label={'cosφ实际：'}>{'xxx'}</DescItem>
              <DescItem label={'cosφ调整：'}>{'xxx'}</DescItem>
              <DescItem label={'cosφ奖惩：'}>{'xxx'}</DescItem>
            </Descriptions>
          </DescItem>
          <DescItem
            label={'峰平谷用电分析'}
            bordered={false}
            className="label noPadding "
          >
            {/* <Descriptions title="" column={2}>
              <DescItem label={`峰 31728 千瓦时`}>{`占 0.00%`}</DescItem>
              <DescItem label={`平 41772 千瓦时`}>{`占 0.00%`}</DescItem>
              <DescItem label={`谷 20312 千瓦时`}>{`占 0.00%`}</DescItem>
              <DescItem label={`其他 0 千瓦时`}>{`占 0.00%`}</DescItem>
            </Descriptions>
            <Descriptions title="" column={2}>
              <DescItem label={`总电费 元`}>{`占 0.00%`}</DescItem>
              <DescItem label={`总电费 元`}>{`占 0.00%`}</DescItem>
              <DescItem label={`总电费 元`}>{`占 0.00%`}</DescItem>
              <DescItem label={`总电费 元`}>{`占 0.00%`}</DescItem>
            </Descriptions> */}

            <div className="columns">
              {/* <div className="f1">
                <SmartEcharts
                  data={[]}
                  type="bar"
                  type="line"
                  legend={legend}
                  xAxis={xAxis}
                  noToolBox
                  {...props}
                ></SmartEcharts> 
              </div> */}
              {/* <div className="f1">
                <CsHomeLine props={props}></CsHomeLine>
              </div> */}
              <div className="f1 ">
                {/* <CsClientReportPie props={props}  className="f1 pie"></CsClientReportPie> */}
                {/* {pieCom} */}
                <img src={pieUrl} className={`pie`} />
                {renderDescCol(props.data, config1)}
              </div>
              <div className="f1 ">
                {/* <CsClientReportPie props={props}  className="f1 pie"></CsClientReportPie> */}
                <img src={pieUrl} className={`pie`} />
                {pieCom}
                {renderDescCol(props.data, config2)}
              </div>
            </div>
            <div className="columns">
              <div className="f1 "></div>
              <div className="f1 "></div>
              {/* {renderDescCol(props.data, config1)}
              {renderDescCol(props.data, config2)} */}
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
                <DescItem label={'xxx'}>{'上月'}</DescItem>
                <DescItem label={'本月'}>{'同比增(减)'}</DescItem>
                <DescItem label={'用电总容量'}>{'xxx'}千瓦时</DescItem>
                <DescItem label={`千瓦时`}>{'xxx'}%</DescItem>
                <DescItem label={'平均单位电价'}>{'xxx'}元/千瓦</DescItem>
                <DescItem label={'元/千瓦时'}>{'xxx'}%</DescItem>
                <DescItem label={'总金额'}>{'xxx'}元</DescItem>
                <DescItem label={`元`}>{'%'}</DescItem>
              </Descriptions>
            </DescItem>
            <DescItem label={'售电'} className="label noPadding ">
              <Descriptions title="" bordered layout="vertical" column={3}>
                <DescItem label={'售电电量(千瓦时)'}>{'xxx'}</DescItem>
                <DescItem label={'售电电量占比(%)'}>{'xxx'}</DescItem>
                <DescItem label={'节约电费(元)'}>{'xxx'}</DescItem>
              </Descriptions>
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
      <img src={stamp} className="stamp " />
    </div>
  );
};

const MonthStationReport = props => {
  console.log(' MonthStationReport ：', props); //
  const { formBtn, ...rest } = props; //
  const headerCom = (
    <div className="headerWrapper">
      <div className={`pdfTitle`}>变(配)电站月度运行报告</div>
      <Descriptions column={4}>
        <DescItem label={'户 号'}>{'xxx'}</DescItem>
        <DescItem label={'装接/实际容量'}>{'xxx'}</DescItem>
        <DescItem label={'天 气'}>{'xxx'}</DescItem>
        <DescItem label={'温/湿度'}>{'xxx'}</DescItem>
      </Descriptions>
    </div>
  );

  const footerCom = (
    <Descriptions column={2} className="footerWrapper">
      <DescItem label={'巡检组长'}>
        <div className="signLine">{'xxx'}</div>
      </DescItem>
      <DescItem label={'审核人'}>
        <div className="signLine">{'xxx'}</div>
      </DescItem>
      <DescItem label={'巡检时间'}>
        <div className="signLine">{'xxx'}</div>
      </DescItem>
      <DescItem label={'xxx'}>
        <div className="">{'xxx'}</div>
      </DescItem>
    </Descriptions>
  );

  const config1 = [
    {
      label: '倍率',
      key: '',
    },
    {
      label: '总有功(02)',
      key: '总有功()',
    },
    {
      label: '峰(03)',
      key: '峰()',
    },
    {
      label: '平1(41)',
      key: '平1()',
    },
    {
      label: '平2(42)',
      key: '平2()',
    },
    {
      label: '谷(05)',
      key: '谷()',
    },
    {
      label: '峰MD(61)',
      key: '峰MD()',
    },
  ];
  const config2 = [
    {
      label: '平1MD(62)',
      key: '平1MD()',
    },
    {
      label: '平2MD(63)',
      key: '平2MD()',
    },
    {
      label: '谷MD(64)',
      key: '谷MD()',
    },
    {
      label: '最大MD',
      key: '',
    },
    {
      label: '实际功率因数',
      key: '',
    },
    {
      label: '无功1(07)',
      key: '无功1()',
    },
    {
      label: '无功2(08)',
      key: '无功2()',
    },
  ];
  const config3 = [
    {
      label: '电压表AB',
      key: '',
    },
    {
      label: '电压表BC',
      key: '',
    },
    {
      label: '电压表CA',
      key: '',
    },
    {
      label: '带电显示器A',
      key: '',
    },
    {
      label: '带电显示器B',
      key: '',
    },
    {
      label: '带电显示器C',
      key: '',
    },
  ];
  const config4 = [
    {
      label: '电流表AB',
      key: '',
    },
    {
      label: '电流表BC',
      key: '',
    },
    {
      label: '电流表CA',
      key: '',
    },
    {
      label: '显示器A',
      key: '',
    },
    {
      label: '显示器B',
      key: '',
    },
    {
      label: '显示器C',
      key: '',
    },
  ];
  const config5 = [
    {
      label: '风扇运行',
      key: '',
    },
    {
      label: '运行声音',
      key: '',
    },
    {
      label: '油位及渗油',
      key: '',
    },
    {
      label: '温度',
      key: '',
    },
    {
      label: '干燥剂',
      key: '',
    },
    {
      label: '有无异常',
      key: '',
    },
  ];
  const config6 = [
    {
      label: '电压表AB',
      key: '',
    },
    {
      label: '电压表BC',
      key: '',
    },
    {
      label: '电压表CA',
      key: '',
    },
    {
      label: '电流表A',
      key: '',
    },
    {
      label: '电流表B',
      key: '',
    },
    {
      label: '电流表',
      key: '',
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
        <DescItem label={'电费信息'} className="label noPadding ">
          <Descriptions title="" bordered layout="vertical" column={4}>
            <DescItem label={'表号：'}>{'xxx'}</DescItem>
            <DescItem label={'电源编号：'}>{'xxx'}</DescItem>
            <DescItem label={'容量：'}>{'xxx'}</DescItem>
            <DescItem label={'电压等级：'}>{'xxx'}</DescItem>
          </Descriptions>
        </DescItem>

        {/* <DescItem label={'：'}>{'xxx'}</DescItem>
        <DescItem label={'：'}>{'xxx'}</DescItem> */}
        <Descriptions title="" bordered className=" " column={1}>
          <DescItem label={'电表读数'} className="label noPadding ">
            <Descriptions title="" bordered layout="vertical" column={7}>
              {/* <DescItem label={'倍率：'}>{'xxx'}</DescItem>
              <DescItem label={'总有功(02)：'}>{'xxx'}</DescItem>
              <DescItem label={'峰(03)：'}>{'xxx'}</DescItem>
              <DescItem label={'平1(41)：'}>{'xxx'}</DescItem>
              <DescItem label={'平2(42)：'}>{'xxx'}</DescItem>
              <DescItem label={'谷(05)：'}>{'xxx'}</DescItem>
              <DescItem label={'峰MD(61)：'}>{'xxx'}</DescItem>
              <DescItem label={'平1MD(62)：'}>{'xxx'}</DescItem>
              <DescItem label={'平2MD(63)：'}>{'xxx'}</DescItem>
              <DescItem label={'谷MD(64)：'}>{'xxx'}</DescItem>
              <DescItem label={'最大MD：'}>{'xxx'}</DescItem>
              <DescItem label={'实际功率因数：'}>{'xxx'}</DescItem>
              <DescItem label={'无功1(07)：'}>{'xxx'}</DescItem>
              <DescItem label={'无功2(08)：'}>{'xxx'}</DescItem> */}
              {renderDescItem(props.data, config1)}
              {renderDescItem(props.data, config2)}
            </Descriptions>
          </DescItem>
          <DescItem label={'高压进线侧'} className="label noPadding ">
            <Descriptions title="" bordered layout="vertical" column={6}>
              {/* <DescItem label={'电压表AB：'}>{'xxx'}</DescItem>
              <DescItem label={'电压表BC：'}>{'xxx'}</DescItem>
              <DescItem label={'电压表CA：'}>{'xxx'}</DescItem>
              <DescItem label={'带电显示器A：'}>{'xxx'}</DescItem>
              <DescItem label={'带电显示器B：'}>{'xxx'}</DescItem>
              <DescItem label={'带电显示器C：'}>{'xxx'}</DescItem> */}
              {renderDescItem(props.data, config3)}
            </Descriptions>
          </DescItem>
          <DescItem label={'高压出线侧'} className="label noPadding ">
            <Descriptions title="" bordered layout="vertical" column={6}>
              {/* <DescItem label={'电流表AB：'}>{'xxx'}</DescItem>
              <DescItem label={'电流表BC：'}>{'xxx'}</DescItem>
              <DescItem label={'电流表CA：'}>{'xxx'}</DescItem>
              <DescItem label={'显示器A：'}>{'xxx'}</DescItem>
              <DescItem label={'显示器B：'}>{'xxx'}</DescItem>
              <DescItem label={'显示器C：'}>{'xxx'}</DescItem> */}
              {renderDescItem(props.data, config4)}
            </Descriptions>
          </DescItem>
          <DescItem label={'变压器编号'} className="label noPadding ">
            <Descriptions title="" bordered layout="vertical" column={6}>
              {/* <DescItem label={'风扇运行：'}>{'xxx'}</DescItem>
              <DescItem label={'运行声音：'}>{'xxx'}</DescItem>
              <DescItem label={'油位及渗油：'}>{'xxx'}</DescItem>
              <DescItem label={'温度：'}>{'xxx'}</DescItem>
              <DescItem label={'干燥剂：'}>{'xxx'}</DescItem>
              <DescItem label={'有无异常：'}>{'xxx'}</DescItem> */}
              {renderDescItem(props.data, config5)}
            </Descriptions>
          </DescItem>
          <DescItem label={'0.4KV总开关'} className="label noPadding ">
            <Descriptions title="" bordered layout="vertical" column={6}>
              {/* <DescItem label={'电压表AB：'}>{'xxx'}</DescItem>
              <DescItem label={'电压表BC：'}>{'xxx'}</DescItem>
              <DescItem label={'电压表CA：'}>{'xxx'}</DescItem>
              <DescItem label={'电流表A：'}>{'xxx'}</DescItem>
              <DescItem label={'电流表B：'}>{'xxx'}</DescItem>
              <DescItem label={'电流表C：'}>{'xxx'}</DescItem> */}
              {renderDescItem(props.data, config6)}
            </Descriptions>
          </DescItem>
        </Descriptions>
      </DescItem>
    </Descriptions>
  );

  const houseConfig = [
    {
      label: '电缆沟及盖板',
      key: '电缆沟及盖板',
    },
    {
      label: '电缆夹层空洞',
      key: '电缆夹层空洞',
    },
    {
      label: '护网是否完好',
      key: '护网是否完好',
    },
    {
      label: '地面裂缝',
      key: '地面裂缝',
    },
    {
      label: '门窗是否完好',
      key: '门窗是否完好',
    },
    {
      label: '房屋渗水情况',
      key: '房屋渗水情况',
    },
  ];

  const safeToolConfig = [
    {
      label: '电缆沟及盖板',
      key: '电缆沟及盖板',
    },
    {
      label: '电缆夹层空洞',
      key: '电缆夹层空洞',
    },
    {
      label: '护网是否完好',
      key: '护网是否完好',
    },
    {
      label: '地面裂缝',
      key: '地面裂缝',
    },
    {
      label: '门窗是否完好',
      key: '门窗是否完好',
    },
    {
      label: '房屋渗水情况',
      key: '房屋渗水情况',
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
              <Descriptions title="" bordered layout="vertical" column={6}>
                {/* {houseConfig.map((v, i) => <DescItem label={'电压表AB：'} key={v.key} >{'xxx'}</DescItem>)} */}
                {renderDescItem(props.data, houseConfig)}
              </Descriptions>
            </DescItem>
            <DescItem label={'安全工器具'} className="label noPadding ">
              <Descriptions title="" bordered layout="vertical" column={6}>
                {/* {safeToolConfig.map((v, i) => <DescItem label={'电压表AB：'} key={v.key} >{'xxx'}</DescItem>)} */}
                {renderDescItem(props.data, safeToolConfig)}
              </Descriptions>
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
      {facilityCom}
      {footerCom}
      <img src={stamp} className="stamp " />
    </div>
  );
};

const CsClientReportDescription = props => {
  console.log(' CsClientReportDescription ：', props); //

  // useEffect(() => {
  //   console.log(' ExportPdf useEffect ： ', ); //
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

  const com1 = <MonthPowerReport></MonthPowerReport>;
  const com2 = <MonthStationReport></MonthStationReport>;

  return (
    <div className={`csClientReportDescription ${props.className}`}>
      {/* <div className={'fje  '}>
        <Button
          type="primary"
          onClick={() => {
            console.log(' xxxxx ： ', ); //
            window.print();
          }}
        >
          导出PDF
        </Button>
      </div> */}
      {props.top}
      <ReportCover></ReportCover>
      {com1}
      {com2}
      {/* <MonthStationReport></MonthStationReport> */}
    </div>
  );
};

CsClientReportDescription.defaultProps = {};

export default CsClientReportDescription;
