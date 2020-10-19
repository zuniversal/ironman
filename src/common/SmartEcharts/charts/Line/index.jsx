import { toolbox } from '../common';

const option = params => {
  const { data, tabData, myExpenseBarTxt } = params;

  console.log(
    ' $$$$$$$$$ myExpenseBar  选项 ： ',
    params,
    data,
    tabData,
    myExpenseBarTxt,
  ); //
  return {
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
      trigger: 'item',
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
          '02:00',
          '04:00',
          '06:00',
          '08:00',
          '10:00',
          '12:00',
          '14:00',
          '16:00',
          '18:00',
          '20:00',
          '22:00',
        ],
        axisPointer: {
          type: 'shadow',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Amount',
        axisLabel: {
          formatter: '{value}',
          // rotate: 30,
        },
      },
      {
        type: 'value',
        name: 'Expense Trend',
        axisLabel: {
          formatter: '{value}',
          // rotate: 30,
        },
      },
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
        yAxisIndex: 1,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: '#FD7D7D',
            borderWidth: 10,
            borderColor: '#FD7D7D', //拐点边框颜色
          },
        },
        data: [
          92.6,
          5.9,
          9.0,
          26.4,
          28.7,
          70.7,
          175.6,
          182.2,
          48.7,
          18.8,
          6.0,
          82.3,
        ],
      },
      {
        name: '数据源2',
        type: 'line',
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: '#1CBB51',
            borderWidth: 10,
            borderColor: '#1CBB51', //拐点边框颜色
          },
        },
        data: [
          51.6,
          51.9,
          91.0,
          261.4,
          281.7,
          701.7,
          1751.6,
          1821.2,
          481.7,
          181.8,
          61.0,
          52.3,
        ],
      },
    ],
  };
};

export default option;
