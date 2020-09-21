
import {toolbox, } from '../common'
import { PRIMARY,  } from '@/constants'//






const option = (radar = [], data = [],   ) => {
    console.log(' Map option radar, data ： ', radar, data,  )// 

    return {
        color: [PRIMARY, '#108ee9', '#f50', '#13CE66', '#006699', '#e5323e', '#4cabce'],
       
		tooltip: {
			trigger: 'item',
			backgroundColor: 'rgba(166, 200, 76, 0.82)',
			borderColor: '#FFFFCC',
			showDelay: 0,
			hideDelay: 0,
			enterable: true,
			transitionDuration: 0,
			extraCssText: 'z-index:100',
		},
		backgroundColor:"#013954",
		visualMap: { //图例值控制
			min: 0,
			max: 1,
			calculable: true,
			show: true,
			color: ['#f44336', '#fc9700', '#ffde00', '#ffde00', '#00eaff'],
			textStyle: {
				color: '#fff'
			}
		},
		geo: {
			map: 'china',//如果是省份，拼音不行可以尝试换成中文
			zoom: 1.2,
			label: {
				emphasis: {
					show: false
				}
			},
			roam: true, //是否允许缩放
			itemStyle: {
				normal: {
					color: 'rgba(51, 69, 89, .5)', //地图背景色
					borderColor: '#516a89', //省市边界线00fcff 516a89
					borderWidth: 1
				},
				emphasis: {
					color: 'rgba(37, 43, 61, .5)' //悬浮背景
				}
			},
        },

        // title : {
        //     text: 'iphone销量',
        //     subtext: '纯属虚构',
        //     left: 'center'
        // },
        // tooltip : {
        //     trigger: 'item'
        // },
        // legend: {
        //     orient: 'vertical',
        //     left: 'left',
        //     data:['iphone3','iphone4','iphone5']
        // },
        // visualMap: {
        //     min: 0,
        //     max: 2500,
        //     left: 'left',
        //     top: 'bottom',
        //     text:['高','低'],           // 文本，默认为数值文本
        //     calculable : true
        // },
        // toolbox: {
        //     show: true,
        //     orient : 'vertical',
        //     left: 'right',
        //     top: 'center',
        //     feature : {
        //         mark : {show: true},
        //         dataView : {show: true, readOnly: false},
        //         restore : {show: true},
        //         saveAsImage : {show: true}
        //     }
        // },
        //     geo: {//配置地图参数
        //       map: "china",
        //       label: {
        //         emphasis: {
        //           show: false
        //         }
        //       },
        //       itemStyle: {
        //         normal: {
        //           areaColor: "#058bd2",
        //           borderColor: "#111"
        //         },
        //         emphasis: {
        //           areaColor: "#1e67b2"
        //         }
        //       }
        //     },
        // series : [
        //     {
        //         name: 'iphone3',
        //         type: 'map',
        //         mapType: 'china',
        //         roam: false,
        //         label: {
        //             normal: {
        //                 show: false
        //             },
        //             emphasis: {
        //                 show: true
        //             }
        //         },
        //         data:[
        //             {name: '北京',value: Math.round(Math.random()*1000)},
        //             {name: '天津',value: Math.round(Math.random()*1000)},
        //             {name: '上海',value: Math.round(Math.random()*1000)},
        //             {name: '重庆',value: Math.round(Math.random()*1000)},
        //             {name: '河北',value: Math.round(Math.random()*1000)},
        //             {name: '河南',value: Math.round(Math.random()*1000)},
        //             {name: '云南',value: Math.round(Math.random()*1000)},
        //             {name: '辽宁',value: Math.round(Math.random()*1000)},
        //             {name: '黑龙江',value: Math.round(Math.random()*1000)},
        //             {name: '湖南',value: Math.round(Math.random()*1000)},
        //             {name: '安徽',value: Math.round(Math.random()*1000)},
        //             {name: '山东',value: Math.round(Math.random()*1000)},
        //             {name: '新疆',value: Math.round(Math.random()*1000)},
        //             {name: '江苏',value: Math.round(Math.random()*1000)},
        //             {name: '浙江',value: Math.round(Math.random()*1000)},
        //             {name: '江西',value: Math.round(Math.random()*1000)},
        //             {name: '湖北',value: Math.round(Math.random()*1000)},
        //             {name: '广西',value: Math.round(Math.random()*1000)},
        //             {name: '甘肃',value: Math.round(Math.random()*1000)},
        //             {name: '山西',value: Math.round(Math.random()*1000)},
        //             {name: '内蒙古',value: Math.round(Math.random()*1000)},
        //             {name: '陕西',value: Math.round(Math.random()*1000)},
        //             {name: '吉林',value: Math.round(Math.random()*1000)},
        //             {name: '福建',value: Math.round(Math.random()*1000)},
        //             {name: '贵州',value: Math.round(Math.random()*1000)},
        //             {name: '广东',value: Math.round(Math.random()*1000)},
        //             {name: '青海',value: Math.round(Math.random()*1000)},
        //             {name: '西藏',value: Math.round(Math.random()*1000)},
        //             {name: '四川',value: Math.round(Math.random()*1000)},
        //             {name: '宁夏',value: Math.round(Math.random()*1000)},
        //             {name: '海南',value: Math.round(Math.random()*1000)},
        //             {name: '台湾',value: Math.round(Math.random()*1000)},
        //             {name: '香港',value: Math.round(Math.random()*1000)},
        //             {name: '澳门',value: Math.round(Math.random()*1000)}
        //         ]
        //     },
        //     {
        //         name: 'iphone4',
        //         type: 'map',
        //         mapType: 'china',
        //         label: {
        //             normal: {
        //                 show: false
        //             },
        //             emphasis: {
        //                 show: true
        //             }
        //         },
        //         data:[
        //             {name: '北京',value: Math.round(Math.random()*1000)},
        //             {name: '天津',value: Math.round(Math.random()*1000)},
        //             {name: '上海',value: Math.round(Math.random()*1000)},
        //             {name: '重庆',value: Math.round(Math.random()*1000)},
        //             {name: '河北',value: Math.round(Math.random()*1000)},
        //             {name: '安徽',value: Math.round(Math.random()*1000)},
        //             {name: '新疆',value: Math.round(Math.random()*1000)},
        //             {name: '浙江',value: Math.round(Math.random()*1000)},
        //             {name: '江西',value: Math.round(Math.random()*1000)},
        //             {name: '山西',value: Math.round(Math.random()*1000)},
        //             {name: '内蒙古',value: Math.round(Math.random()*1000)},
        //             {name: '吉林',value: Math.round(Math.random()*1000)},
        //             {name: '福建',value: Math.round(Math.random()*1000)},
        //             {name: '广东',value: Math.round(Math.random()*1000)},
        //             {name: '西藏',value: Math.round(Math.random()*1000)},
        //             {name: '四川',value: Math.round(Math.random()*1000)},
        //             {name: '宁夏',value: Math.round(Math.random()*1000)},
        //             {name: '香港',value: Math.round(Math.random()*1000)},
        //             {name: '澳门',value: Math.round(Math.random()*1000)}
        //         ]
        //     },
        //     {
        //         name: 'iphone5',
        //         type: 'map',
        //         mapType: 'china',
        //         label: {
        //             normal: {
        //                 show: false
        //             },
        //             emphasis: {
        //                 show: true
        //             }
        //         },
        //         data:[
        //             {name: '北京',value: Math.round(Math.random()*1000)},
        //             {name: '天津',value: Math.round(Math.random()*1000)},
        //             {name: '上海',value: Math.round(Math.random()*1000)},
        //             {name: '广东',value: Math.round(Math.random()*1000)},
        //             {name: '台湾',value: Math.round(Math.random()*1000)},
        //             {name: '香港',value: Math.round(Math.random()*1000)},
        //             {name: '澳门',value: Math.round(Math.random()*1000)}
        //         ]
        //     }
        // ]




    }
};

export default option;