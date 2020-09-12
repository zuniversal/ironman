


import intl from 'react-intl-universal'

const option = (data) => {
    return {
        color: ['#f50', '#108ee9', '#13CE66', '#006699', '#e5323e', '#4cabce'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            feature: {
                dataView: { show: true, title: intl.get('DATA_VIEW'), readOnly: false, lang: [intl.get('DATA_VIEW'), intl.get('CLOSE'), intl.get('REFRESH'),  ]},
                magicType: { show: true, title: intl.get('SAVE_AS_IMG'), type: ['line', 'bar'], },
                restore: { show: true, title: intl.get('RESTORE'), },
                saveAsImage: { show: true, title: intl.get('SAVE_AS_IMG'),   }
            }
        },
        legend: {
            data: ['Year Expense', 'Expense Trend', '平均温度']
        },
        xAxis: [
            {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: 'Amount',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: 'Expense Trend',
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name: 'Year Expense',
                type: 'bar',
                barWidth: 25,
                data
            },
            // {
            //     name:'降水量',
            //     type:'bar',
            //     data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            // },
            {
                name: 'Expense Trend',
                type: 'line',
                yAxisIndex: 1,
                data
            }
        ]
    }
};

export default option;