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

import china from 'echarts/map/json/china.json';
echarts.registerMap('china', china);

/* 
    通用 Echarts 组件 
    
*/

// https://github.com/hustcc/echarts-for-react/blob/master/demo/src/charts/Map.jsx

import common from './common';

class SmartEcharts extends React.PureComponent {
  onChartClick = e => {
    console.log('    onChartClick ： ', e);
  };
  onChartLegendselectchanged = e => {
    console.log('    onChartLegendselectchanged ： ', e);
  };
  onChartReadyCallback = e => {
    console.log(
      '    onChartReadyCallback Com e.getImage() ： ',
      e,
      e.getDataURL(),
    );
  };

  render() {
    const { data, type, legend, tabData, option } = this.props;
    console.log(
      ' %c SmartEchart 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    let onEvents = {
      click: this.onChartClick,
      legendselectchanged: this.onChartLegendselectchanged,
    };

    const optionConfig = {
      ...common,
      ...option,
    };

    // const options = getOption(props.option)
    // console.log(
    //   ' SmartEchart myExpenseBar11 ：',
    //   common,
    //   type,
    //   this.props,
    //   option,
    //   tabData,
    //   optionConfig,
    // );

    // return null

    return (
      <ReactEcharts
        echarts={echarts}
        notMerge
        // lazyUpdate
        theme={'theme_name'}
        onChartReady={this.onChartReadyCallback}
        onEvents={onEvents}
        {...this.props}
        option={optionConfig}
        ref={ref => (this.echartsRef = ref)}
      />
    );
  }
}

export default SmartEcharts;
