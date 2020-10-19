import React from 'react';

// 注意 依赖于 echarts 需要安装
// Module not found: Can't resolve 'echarts' in 'C:\zyb\code\new-react-pj\ironman\node_modules\echarts-for-react\lib'
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/map';

import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/timeline';

import Pie from '@/common/SmartEcharts/charts/Pie';
import Bar from '@/common/SmartEcharts/charts/Bar';
import Line from '@/common/SmartEcharts/charts/Line';
import TabBar from '@/common/SmartEcharts/charts/TabBar';
import Radar from '@/common/SmartEcharts/charts/Radar';
import Maps from '@/common/SmartEcharts/charts/Map';

import china from 'echarts/map/json/china.json';
echarts.registerMap('china', china);

/* 
    通用 Echarts 组件 
    
*/

// https://github.com/hustcc/echarts-for-react/blob/master/demo/src/charts/Map.jsx

const optionMap = {
  bar: Bar,
  bar: Bar,
  line: Line,
  pie: Pie,
  radar: Radar,
  map: Maps,
};

class SmartEcharts extends React.PureComponent {
  onChartClick = e => {
    console.log('    onChartClick ： ', e);
  };
  onChartLegendselectchanged = e => {
    console.log('    onChartLegendselectchanged ： ', e);
  };

  render() {
    const { data, type, legend, tabData, myExpenseBarTxt } = this.props;

    let onEvents = {
      click: this.onChartClick,
      legendselectchanged: this.onChartLegendselectchanged,
    };

    const option =
      type === 'tabBar'
        ? optionMap[type](this.props, tabData, myExpenseBarTxt)
        : type === 'bar'
        ? optionMap[type](this.props)
        : optionMap[type](this.props, legend);

    // const options = getOption(props.option)
    console.log(
      ' SmartEcharts myExpenseBar ：',
      type,
      this.props,
      optionMap,
      option,
      tabData,
    );

    // return null

    return (
      <ReactEcharts
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        theme={'theme_name'}
        onChartReady={this.onChartReadyCallback}
        onEvents={onEvents}
        {...this.props}
      />
    );
  }
}

export default SmartEcharts;
