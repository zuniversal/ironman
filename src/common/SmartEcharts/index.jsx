
import React from 'react';

// 注意 依赖于 echarts 需要安装 
// Module not found: Can't resolve 'echarts' in 'C:\zyb\code\new-react-pj\ironman\node_modules\echarts-for-react\lib'
import ReactEcharts from "echarts-for-react"
import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';

import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/timeline';

import Pie from '@/common/SmartEcharts/charts/Pie'
import Bar from '@/common/SmartEcharts/charts/Bar'
import TabBar from '@/common/SmartEcharts/charts/TabBar'
import Radar from '@/common/SmartEcharts/charts/Radar'


const optionMap = {
    bar: Bar,
    tabBar: TabBar,
    pie: Pie,
    radar: Radar,
}


class SmartEcharts extends React.PureComponent {
    
    onChartClick = (e,  ) => {
        console.log('    onChartClick ： ', e,   )
        
    }
    onChartLegendselectchanged = (e,  ) => {
        console.log('    onChartLegendselectchanged ： ', e,   )
        
    }

    render() {
        const {data, type, legend, tabData, myExpenseBarTxt, } = this.props

        let onEvents = {
            'click': this.onChartClick,
            'legendselectchanged': this.onChartLegendselectchanged
        }

        const option = type === 'tabBar' ? optionMap[type](data, tabData, myExpenseBarTxt, ) : type === 'bar' ? optionMap[type](data) 
            : optionMap[type](data, legend)
        console.log(' SmartEcharts myExpenseBar ：', type, this.props, optionMap,option, tabData, );
        
        // return null

        return (
            <ReactEcharts
                echarts={echarts}
                option={option}
                notMerge={true}
                lazyUpdate={true}
                theme={"theme_name"}
                onChartReady={this.onChartReadyCallback}
                onEvents={onEvents}

            />
        )
    }
}

export default SmartEcharts;