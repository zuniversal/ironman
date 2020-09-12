import React from 'react';
// import the core library.
import ReactEchartsCore from 'echarts-for-react/lib/core';
// then import echarts modules those you have used manually.
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';

import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/timeline';

import Pie from '@/component/Echarts/option/Pie'
import Bar from '@/component/Echarts/option/Bar'
import TabBar from '@/component/Echarts/option/TabBar'
const typeArr = {
    bar: Bar,
    tabBar: TabBar,
    pie: Pie,
}

let onEvents = {
    'click': this.onChartClick,
    'legendselectchanged': this.onChartLegendselectchanged
}
class Echarts extends React.Component {
    render() {
        const {data, type, legend, tabData, myExpenseBarTxt, } = this.props
        // console.log('typeArr[type] ：', typeArr[type](data));
        // console.log('echarts ：', this.props);
        // typeArr[type](data, legend)
        // const option = type === 'bar' ? typeArr[type](data) : typeArr[type](data, legend)
        console.log(' @@@@ echarts myExpenseBar ：', type, this.props, tabData, );
        // const option = type === 'bar' ? 
        //     type === 'tabBar' ? typeArr[type](data, tabData, ) : typeArr[type](data) 
        //     : typeArr[type](data, legend)
        const option = type === 'tabBar' ? typeArr[type](data, tabData, myExpenseBarTxt, ) : type === 'bar' ? typeArr[type](data) 
            : typeArr[type](data, legend)
        console.log(' ##### echarts myExpenseBar ：', type, this.props, typeArr,option, tabData, );
        
        return (
            <ReactEchartsCore
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

export default Echarts;