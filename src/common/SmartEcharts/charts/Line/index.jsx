import { toolbox, splitLine, grid } from '../common';

const option = params => {
  const { data, tabData, myExpenseBarTxt } = params;

  console.log(
    ' $$$$$$$$$ myExpenseBar  选项 ： ',
    params,
    data,
    tabData,
    myExpenseBarTxt,
  );
  return {
    grid,
    color: [
      '#1CBB51',
      '#FD7D7D',
      '#f50',
      '#13CE66',
      '#006699',
      '#e5323e',
      '#108ee9',
      '#4cabce',
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    toolbox,
    legend: {
      data: ['数据源1', '数据源2', '平均温度'],
      // data: myExpenseBarTxt
    },
    // xAxis: [
    //   {
    //     type: 'category',
    //     // data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    //     // data: ["Airfare", "Hotel", "Meal", "Transportation", "Entertainment", "Purchase", "Other", "Visa", "Courier"],
    //     data: tabData,
    //     axisPointer: {
    //       type: 'shadow',
    //     },
    //     // https://www.echartsjs.com/zh/option.html#xAxis.axisLabel.rotate
    //     axisLabel: { rotate: -30 },
    //   },
    // ],
    xAxis: [
      {
        type: 'category',
        data: [
          '00:00',

          '01:00',
          '02:00',

          '03:00',
          '04:00',

          '05:00',
          '06:00',

          '07:00',
          '08:00',

          '09:00',
          '10:00',

          '11:00',
          '12:00',

          '13:00',
          '14:00',

          '15:00',
          '16:00',

          '17:00',
          '18:00',

          '19:00',
          '20:00',

          '21:00',
          '22:00',

          '23:00',
        ],
        axisPointer: {
          type: 'shadow',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '数据源1',
        axisLabel: {
          formatter: '{value}',
          // rotate: 30,
        },
        splitLine,
      },
      // {
      //   type: 'value',
      //   name: '数据源2',
      //   axisLabel: {
      //     formatter: '{value}',
      //     // rotate: 30,
      //   },
      //   splitLine,
      // },
    ],

    // series: myExpenseBarTxt.map((v, i) => {
    //     console.log(' myExpenseBarTxt v ： ', v,  )
    //     return {
    //         name: v,
    //         type: 'bar',
    //         barWidth: 25,
    //         data: data[i],
    //         rotate: 30,
    //     }
    // }),
    series: [
      {
        name: '数据源1',
        type: 'line',
        yAxisIndex: 0,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: '#1CBB51',
            borderWidth: 3,
            borderColor: '#1CBB51', //拐点边框颜色
          },
        },
        data: [
          121.6,
          151.9,
          191.0,
          201.7,
          231.4,
          261.7,
          281.6,
          221.2,
          284.3,
          321.7,
          371.0,
          351.8,

          353.6,
          323.9,
          283.0,
          213.4,
          253.7,
          243.7,
          213.6,
          253.2,
          113.7,
          183.8,
          133.0,
          163.3,
        ],
        data,
      },
      // {
      //   name: '数据源2',
      //   type: 'line',
      //   yAxisIndex: 1,
      //   symbol: 'circle',
      //   symbolSize: 8,
      //   itemStyle: {
      // normal: {
      //   color: '#FD7D7D',
      //   borderWidth: 5,
      //   borderColor: '#FD7D7D', //拐点边框颜色
      //     },
      //   },
      //   data: [
      //     51.6,
      //     751.9,
      //     891.0,
      //     261.4,
      //     281.7,
      //     70.7,
      //     151.6,
      //     121.2,
      //     481.7,
      //     181.8,
      //     61.0,
      //     152.3,
      //   ],
      // },
    ],
  };
};

export default option;
