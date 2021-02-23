import customIcons from './font/iconfont.json';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
  },
];

export const customIcon = {
  name: 'rectangle',
  icon: 'icon-rect',
  data: {
    rect: {
      width: 50,
      height: 50,
    },
    strokeStyle: 'transparent',
    // paddingLeft: 10,
    // paddingRight: 10,
    // paddingTop: 10,
    // paddingBottom: 10,
    name: 'rectangle',
    // icon: String.fromCharCode(+'58899'),
    iconFamily: 'topology',
    iconColor: '#2f54eb',
  },
};

export const CustomTools = {
  group: '自定义组件',
  children: customIcons.glyphs.map(v => ({
    name: 'rectangle',
    icon: `zybs icon-${v.font_class}`,
    data: {
      rect: {
        width: 50,
        height: 50,
      },
      strokeStyle: 'transparent',
      name: 'rectangle',
      icon: String.fromCharCode(+v.unicode_decimal),
      iconFamily: 'zyb',
    },
  })),
};

// export const Tools = []
// export const Tools = [CustomTools]

export const Tools = [
  // CustomTools,

  {
    group: '绑定监测点',
    children: [
      {
        name: '监测点',
        icon: 'icon-final',
        data: {
          isPoint: true,
          text: '监测点',
          rect: {
            width: 200,
            height: 80,
          },
          name: 'text',
        },
      },
      {
        name: '带图标监测点',
        icon: 'icon-final',
        data: {
          isPoint: true,
          text: '带图标监测点',
          rect: {
            width: 200,
            height: 80,
          },
          name: 'text',
          icon: '\ue61d',
          iconFamily: 'topology',
          iconSize: 10,
          iconColor: 'red',
          iconRect: {
            width: 20,
            height: 20,
          },
          fullIconRect: {
            width: 20,
            height: 20,
          },
          strokeStyle: 'transparent',
          name: 'rectangle',
        },
      },
    ],
  },

  {
    group: '基本形状',
    children: [
      {
        name: 'rectangle',
        icon: 'icon-rect',
        data: {
          text: 'xxxx',
          rect: {
            width: 50,
            height: 50,
          },
          strokeStyle: 'transparent',
          name: 'text',
          // icon: String.fromCharCode(+'58984'),
          // iconFamily: 'zyb',
          iconFamily: 'topology',
          // iconSize: '30',
        },
      },
      {
        name: 'rectangle',
        icon: 'icon-rect',
        data: {
          text: 'xxxx',
          rect: {
            width: 50,
            height: 50,
          },
          strokeStyle: 'transparent',
          name: 'rectangle',
          // icon: String.fromCharCode(+'58984'),
          // iconFamily: 'zyb',
          iconFamily: 'topology',
          // iconSize: '30',
        },
      },

      {
        name: 'rectangle',
        icon: 'icon-rect',
        data: {
          text: '',
          rect: {
            width: 50,
            height: 50,
          },
          strokeStyle: 'transparent',
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 5,
          paddingBottom: 5,
          name: 'rectangle',
          // icon: String.fromCharCode(+'58984'),
          // iconFamily: 'zyb',
          iconFamily: 'topology',
          // iconSize: '30',
        },
      },
      {
        name: 'rectangle',
        icon: 'icon-rect',
        data: {
          text: 'Topology',
          rect: {
            width: 100,
            height: 100,
          },
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
          name: 'rectangle',
          icon: '\ue64d',
          iconFamily: 'topology',
          iconColor: '#2f54eb',
        },
      },
      {
        name: 'rectangle',
        icon: 'icon-rectangle',
        data: {
          text: '圆角矩形',
          rect: {
            width: 200,
            height: 50,
          },
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
          borderRadius: 0.1,
          name: 'rectangle',
        },
      },
      {
        name: 'circle',
        icon: 'icon-circle',
        data: {
          text: '圆',
          rect: {
            width: 100,
            height: 100,
          },
          name: 'circle',
          textMaxLine: 1,
        },
      },
      {
        name: 'share2',
        icon: 'icon-share2',
        data: {
          text: '三角形',
          rect: {
            width: 100,
            height: 100,
          },
          name: 'share2',
        },
      },
      {
        name: 'diamond',
        icon: 'icon-diamond',
        data: {
          text: '菱形',
          rect: {
            width: 100,
            height: 100,
          },
          name: 'diamond',
        },
      },
      {
        name: 'pentagon',
        icon: 'icon-pentagon',
        data: {
          text: '五边形',
          rect: {
            width: 100,
            height: 100,
          },
          name: 'pentagon',
        },
      },
      {
        name: 'hexagon',
        icon: 'icon-hexagon',
        data: {
          text: '六边形',
          rect: {
            width: 100,
            height: 100,
          },
          paddingTop: 10,
          paddingBottom: 10,
          name: 'hexagon',
        },
      },
      {
        name: 'pentagram',
        icon: 'icon-pentagram',
        data: {
          text: '五角星',
          rect: {
            width: 100,
            height: 100,
          },
          name: 'pentagram',
        },
      },
      {
        name: 'leftArrow',
        icon: 'icon-arrow-left',
        data: {
          text: '左箭头',
          rect: {
            width: 200,
            height: 100,
          },
          name: 'leftArrow',
        },
      },
      {
        name: 'rightArrow',
        icon: 'icon-arrow-right',
        data: {
          text: '右箭头',
          rect: {
            width: 200,
            height: 100,
          },
          name: 'rightArrow',
        },
      },
      {
        name: 'twowayArrow',
        icon: 'icon-twoway-arrow',
        data: {
          text: '双向箭头',
          rect: {
            width: 200,
            height: 100,
          },
          name: 'twowayArrow',
        },
      },
      {
        name: 'line',
        icon: 'icon-line',
        data: {
          text: '直线',
          rect: {
            width: 100,
            height: 100,
          },
          name: 'line',
        },
      },
      {
        name: 'cloud',
        icon: 'icon-cloud',
        data: {
          text: '云',
          rect: {
            width: 100,
            height: 100,
          },
          name: 'cloud',
        },
      },
      {
        name: 'message',
        icon: 'icon-msg',
        data: {
          text: '消息框',
          rect: {
            width: 100,
            height: 100,
          },
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
          name: 'message',
        },
      },
      {
        name: 'file',
        icon: 'icon-file',
        data: {
          text: '文档',
          rect: {
            width: 80,
            height: 100,
          },
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
          name: 'file',
        },
      },
      {
        name: 'text',
        icon: 'icon-text',
        data: {
          text: 'le5le-topology / 乐吾乐',
          rect: {
            width: 160,
            height: 30,
          },
          name: 'text',
        },
      },
      {
        name: 'image',
        icon: 'icon-image',
        data: {
          text: '',
          rect: {
            width: 100,
            height: 100,
          },
          name: 'image',
          image: '/assets/img/logo.png',
        },
      },
      {
        name: 'cube',
        icon: 'icon-cube',
        data: {
          rect: {
            width: 50,
            height: 70,
          },
          is3D: true,
          z: 10,
          zRotate: 15,
          fillStyle: '#ddd',
          name: 'cube',
          icon: '\ue63c',
          iconFamily: 'topology',
          iconColor: '#777',
          iconSize: 30,
        },
      },
      {
        name: 'people',
        icon: 'icon-people',
        data: {
          rect: {
            width: 70,
            height: 100,
          },
          name: 'people',
        },
      },
      {
        name: '视频/网页',
        icon: 'icon-pc',
        data: {
          text: '视频/网页',
          rect: {
            width: 200,
            height: 200,
          },
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
          // strokeStyle: 'transparent',
          name: 'div',
        },
      },
    ],
  },
  {
    group: '流程图',
    children: [
      {
        name: '开始/结束',
        icon: 'icon-flow-start',
        data: {
          text: '开始',
          rect: {
            width: 120,
            height: 40,
          },
          borderRadius: 0.5,
          name: 'rectangle',
        },
      },
      {
        name: '流程',
        icon: 'icon-rectangle',
        data: {
          text: '流程',
          rect: {
            width: 120,
            height: 40,
          },
          name: 'rectangle',
        },
      },
      {
        name: '判定',
        icon: 'icon-diamond',
        data: {
          text: '判定',
          rect: {
            width: 120,
            height: 60,
          },
          name: 'diamond',
        },
      },
      {
        name: '数据',
        icon: 'icon-flow-data',
        data: {
          text: '数据',
          rect: {
            width: 120,
            height: 50,
          },
          name: 'flowData',
        },
      },
      {
        name: '准备',
        icon: 'icon-flow-ready',
        data: {
          text: '准备',
          rect: {
            width: 120,
            height: 50,
          },
          name: 'hexagon',
        },
      },
      {
        name: '子流程',
        icon: 'icon-flow-subprocess',
        data: {
          text: '子流程',
          rect: {
            width: 120,
            height: 50,
          },
          name: 'flowSubprocess',
        },
      },
      {
        name: '数据库',
        icon: 'icon-db',
        data: {
          text: '数据库',
          rect: {
            width: 80,
            height: 120,
          },
          name: 'flowDb',
        },
      },
      {
        name: '文档',
        icon: 'icon-pause',
        data: {
          text: '文档',
          rect: {
            width: 120,
            height: 100,
          },
          name: 'flowDocument',
        },
      },
      {
        name: '内部存储',
        icon: 'icon-internal-storage',
        data: {
          text: '内部存储',
          rect: {
            width: 120,
            height: 80,
          },
          name: 'flowInternalStorage',
        },
      },
      {
        name: '外部存储',
        icon: 'icon-extern-storage',
        data: {
          text: '外部存储',
          rect: {
            width: 120,
            height: 80,
          },
          name: 'flowExternStorage',
        },
      },
      {
        name: '队列',
        icon: 'icon-flow-queue',
        data: {
          text: '队列',
          rect: {
            width: 100,
            height: 100,
          },
          name: 'flowQueue',
        },
      },
      {
        name: '手动输入',
        icon: 'icon-flow-manually',
        data: {
          text: '手动输入',
          rect: {
            width: 120,
            height: 80,
          },
          name: 'flowManually',
        },
      },
      {
        name: '展示',
        icon: 'icon-flow-display',
        data: {
          text: '展示',
          rect: {
            width: 120,
            height: 80,
          },
          name: 'flowDisplay',
        },
      },
      {
        name: '并行模式',
        icon: 'icon-flow-parallel',
        data: {
          text: '并行模式',
          rect: {
            width: 120,
            height: 50,
          },
          name: 'flowParallel',
        },
      },
      {
        name: '注释',
        icon: 'icon-flow-comment',
        data: {
          text: '注释',
          rect: {
            width: 100,
            height: 100,
          },
          name: 'flowComment',
        },
      },
    ],
  },
  {
    group: '活动图',
    children: [
      {
        name: '开始',
        icon: 'icon-flow-start',
        data: {
          text: '',
          rect: {
            width: 30,
            height: 30,
          },
          name: 'circle',
          fillStyle: '#555',
          strokeStyle: 'transparent',
        },
      },
      {
        name: '结束',
        icon: 'icon-final',
        data: {
          text: '',
          rect: {
            width: 30,
            height: 30,
          },
          name: 'activityFinal',
        },
      },
      {
        name: '活动',
        icon: 'icon-action',
        data: {
          text: '活动',
          rect: {
            width: 120,
            height: 50,
          },
          borderRadius: 0.25,
          name: 'rectangle',
        },
      },
      {
        name: '决策/合并',
        icon: 'icon-diamond',
        data: {
          text: '决策',
          rect: {
            width: 120,
            height: 50,
          },
          name: 'diamond',
        },
      },
      {
        name: '垂直泳道',
        icon: 'icon-swimlane-v',
        data: {
          text: '垂直泳道',
          rect: {
            width: 200,
            height: 500,
          },
          name: 'swimlaneV',
        },
      },
      {
        name: '水平泳道',
        icon: 'icon-swimlane-h',
        data: {
          text: '水平泳道',
          rect: {
            width: 500,
            height: 200,
          },
          name: 'swimlaneH',
        },
      },
      {
        name: '垂直分岔/汇合',
        icon: 'icon-fork-v',
        data: {
          text: '',
          rect: {
            width: 10,
            height: 150,
          },
          name: 'forkV',
          fillStyle: '#555',
          strokeStyle: 'transparent',
        },
      },
      {
        name: 'xxx',
        icon: 'icon-home',
        data: {
          text: 'home',
          rect: {
            width: 66,
            height: 88,
          },
          name: 'home',
          fillStyle: 'cyan',
          strokeStyle: 'transparent',
        },
      },
      {
        name: '水平分岔/汇合',
        icon: 'icon-fork',
        data: {
          text: '',
          rect: {
            width: 150,
            height: 10,
          },
          name: 'forkH',
          fillStyle: '#555',
          strokeStyle: 'transparent',
        },
      },
    ],
  },
  {
    group: '时序图和类图',
    children: [
      {
        name: 'xx',
        icon: 'icon-class',
        data: {
          text: 'Topolgoy',
          rect: {
            width: 270,
            height: 200,
          },
          fillStyle: '#ccc',
          strokeStyle: '#7e1212',
          name: 'interfaceClass',
          children: [
            {
              text:
                '- name: 吾问无为谓无无无无无吾问无为谓无无无无无吾问无为谓无无无无无\n+ setName(name: string): void+ setName(name: string): void',
              name: 'text',
              rectInParent: {
                x: 0,
                y: 0,
                width: '100%',
                height: '100%',
              },
              font: {
                textAlign: 'left',
                textBaseline: 'top',
              },
            },
            {
              text: 'aaa',
              name: 'text',
              rectInParent: {
                x: 0,
                y: '50%',
              },
              font: {
                textAlign: 'left',
                textBaseline: 'top',
              },
            },
            {
              text: 'bbb',
              name: 'text',
              rectInParent: {
                x: 0,
                y: '75%',
              },
              font: {
                textAlign: 'left',
                textBaseline: 'top',
              },
            },
          ],
        },
      },

      {
        name: '生命线',
        icon: 'icon-lifeline',
        data: {
          text: '生命线',
          rect: {
            width: 150,
            height: 400,
          },
          name: 'lifeline',
        },
      },
      {
        name: '激活',
        icon: 'icon-focus',
        data: {
          text: '',
          rect: {
            width: 12,
            height: 200,
          },
          name: 'sequenceFocus',
        },
      },
      {
        name: '简单类',
        icon: 'icon-simple-class',
        data: {
          text: 'Topolgoy',
          rect: {
            width: 270,
            height: 200,
          },
          paddingTop: 40,
          font: {
            fontFamily: 'Arial',
            color: '#222',
            fontWeight: 'bold',
          },
          fillStyle: '#ffffba',
          strokeStyle: '#7e1212',
          name: 'simpleClass',
          children: [
            {
              text: '- name: string\n+ setName(name: string): void',
              name: 'text',
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 10,
              paddingBottom: 10,
              rectInParent: {
                x: 0,
                y: 0,
                width: '100%',
                height: '100%',
                rotate: 0,
              },
              font: {
                fontFamily: 'Arial',
                color: '#222',
                textAlign: 'left',
                textBaseline: 'top',
              },
            },
          ],
        },
      },
      {
        name: '类',
        icon: 'icon-class',
        data: {
          text: 'Topolgoy',
          rect: {
            width: 270,
            height: 200,
          },
          // paddingTop: 40,
          // font: {
          //   fontFamily: 'Arial',
          //   color: '#222',
          //   fontWeight: 'bold',
          // },
          fillStyle: '#ffffba',
          strokeStyle: '#7e1212',
          name: 'interfaceClass',
          children: [
            {
              text: '- name: string',
              name: 'text',
              // paddingLeft: 10,
              // paddingRight: 10,
              // paddingTop: 10,
              // paddingBottom: 10,
              rectInParent: {
                x: 0,
                y: 0,
                width: '100%',
                height: '50%',
                rotate: 0,
              },
              // font: {
              //   fontFamily: 'Arial',
              //   color: '#222',
              //   textAlign: 'left',
              //   textBaseline: 'top',
              // },
            },
            {
              text: '+ setName(name: string): void',
              name: 'text',
              // paddingLeft: 10,
              // paddingRight: 10,
              // paddingTop: 10,
              // paddingBottom: 10,
              rectInParent: {
                x: 0,
                y: '50%',
                width: '100%',
                height: '50%',
                rotate: 0,
              },
              // font: {
              //   fontFamily: 'Arial',
              //   color: '#222',
              //   textAlign: 'left',
              //   textBaseline: 'top',
              // },
            },
          ],
        },
      },
    ],
  },

  {
    group: '图表控件',
    children: [
      {
        name: '折线图',
        icon: 'icon-line-chart',
        data: {
          text: '折线图',
          rect: {
            width: 300,
            height: 200,
          },
          name: 'echarts',
          data: {
            echarts: {
              option: {
                xAxis: {
                  type: 'category',
                  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                },
                yAxis: {
                  type: 'value',
                },
                series: [
                  {
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                  },
                ],
              },
            },
          },
        },
      },
      {
        name: '柱状图',
        icon: 'icon-bar-chart',
        data: {
          text: '柱状图',
          rect: {
            width: 300,
            height: 200,
          },
          name: 'echarts',
          data: {
            echarts: {
              option: {
                color: ['#3398DB'],
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                  },
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true,
                },
                xAxis: [
                  {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                      alignWithLabel: true,
                    },
                  },
                ],
                yAxis: [
                  {
                    type: 'value',
                  },
                ],
                series: [
                  {
                    name: '直接访问',
                    type: 'bar',
                    barWidth: '60%',
                    data: [10, 52, 200, 334, 390, 330, 220],
                  },
                ],
              },
            },
          },
        },
      },
      {
        name: '饼图',
        icon: 'icon-pie-chart',
        data: {
          text: '饼图',
          rect: {
            width: 200,
            height: 200,
          },
          name: 'echarts',
          data: {
            echarts: {
              option: {
                tooltip: {
                  trigger: 'item',
                  formatter: '{a} <br/>{b}: {c} ({d}%)',
                },
                legend: {
                  orient: 'vertical',
                  x: 'left',
                  data: [
                    '直接访问',
                    '邮件营销',
                    '联盟广告',
                    '视频广告',
                    '搜索引擎',
                  ],
                },
                series: [
                  {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                      normal: {
                        show: false,
                        position: 'center',
                      },
                      emphasis: {
                        show: true,
                        textStyle: {
                          fontSize: '30',
                          fontWeight: 'bold',
                        },
                      },
                    },
                    labelLine: {
                      normal: {
                        show: false,
                      },
                    },
                    data: [
                      { value: 335, name: '直接访问' },
                      { value: 310, name: '邮件营销' },
                      { value: 234, name: '联盟广告' },
                      { value: 135, name: '视频广告' },
                      { value: 1548, name: '搜索引擎' },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
      {
        name: '仪表盘',
        icon: 'icon-dashboard-chart',
        data: {
          text: '仪表盘',
          rect: {
            width: 300,
            height: 300,
          },
          name: 'echarts',
          data: {
            echarts: {
              option: {
                tooltip: {
                  formatter: '{a} <br/>{b} : {c}%',
                },
                toolbox: {
                  feature: {
                    restore: {},
                    saveAsImage: {},
                  },
                },
                series: [
                  {
                    name: '业务指标',
                    type: 'gauge',
                    detail: { formatter: '{value}%' },
                    data: [{ value: 50, name: '完成率' }],
                  },
                ],
              },
            },
          },
        },
      },
    ],
  },

  {
    group: '电气元器件',
    children: [
      {
        name: 'image',
        icon: 'icon-image',
        type: 'img',
        data: {
          text: '',
          rect: {
            width: 50,
            height: 50,
          },
          name: 'image',
          // image: require('./machine.jpg')
          image: '/img/switch.png',
        },
      },
      {
        name: 'image',
        icon: 'icon-image',
        type: 'img',
        data: {
          text: '',
          rect: {
            width: 50,
            height: 50,
          },
          name: 'image',
          // image: require('./machine.jpg')
          image: '/img/switch2.png',
        },
      },
    ],
  },
  // {
  //   group: 'react组件',
  //   children: [
  //     {
  //       text: '按钮',
  //       icon: 'icon-rect',
  //       name: 'button',
  //       color: '#f50',
  //       data: {
  //         autoRect: true,
  //         strokeStyle: '#ccc',
  //         rect: {
  //           width: 50,
  //           height: 50,
  //         },
  //         hideAnchor: true,
  //         name: 'block',
  //         data: {
  //           // 组件属性配置
  //           props: {
  //             type: 'primary',
  //             children: '查询xx',
  //           },
  //           // 异步请求配置
  //           http: {
  //             api: '/api/topologies?',
  //             type: 'get',
  //             paramsGetStyle: 'subscribe',
  //             paramsArr: [],
  //           },
  //           // 绑定如图表图例id
  //           bind: [],
  //         },
  //         events: [
  //           {
  //             type: 'doFn',
  //             action: 'Function',
  //             value: `console.log(' xxxx ： ',  )//  `,
  //             params: 123,
  //             name: 'onClick',
  //           },
  //         ],
  //         // icon: String.fromCharCode(+'58883'),
  //         // iconFamily: 'zybs',
  //       },
  //     },

  //     {
  //       text: '按钮',
  //       icon: 'icon-rect',
  //       name: 'button',
  //       color: '#f50',
  //       data: {
  //         autoRect: true,
  //         strokeStyle: '#fff',
  //         rect: {
  //           x: 100,
  //           y: 200,
  //           width: 100,
  //           height: 35,
  //         },
  //         hideAnchor: true,
  //         name: 'button',
  //         data: {
  //           // 组件属性配置
  //           props: {
  //             type: 'primary',
  //             children: '查询',
  //             onClick: () => {
  //               console.log(' onClickonClick ： '); //
  //             },
  //           },
  //           // 异步请求配置
  //           http: {
  //             api: '/api/topologies?',
  //             type: 'get',
  //             paramsGetStyle: 'subscribe',
  //             paramsArr: [],
  //           },
  //           // 绑定如图表图例id
  //           bind: [],
  //         },
  //         events: [
  //           {
  //             type: 'doFn',
  //             action: 'Function',
  //             value: `let fun = (a) =>  params + a; fun(123); return 1231;  `,
  //             params: 123,
  //             name: 'onClick',
  //           },
  //         ],
  //         icon: String.fromCharCode(+'58883'),
  //         iconFamily: 'zybs',
  //       },
  //     },
  //     {
  //       text: '日期组件',
  //       icon: 'icon-rect',
  //       name: 'datePicker',
  //       data: {
  //         strokeStyle: '#fff',
  //         hideAnchor: true,
  //         rect: {
  //           x: 100,
  //           y: 200,
  //           width: 300,
  //           height: 30,
  //         },
  //         name: 'datePicker',
  //         data: {
  //           props: {
  //             allowClear: true,
  //           },
  //         },
  //         events: [
  //           {
  //             type: 'doFn',
  //             action: 'Function',
  //             value: `let fun = (a) =>  console.log(params + a); fun(123);`,
  //             params: 123,
  //             name: 'onChange',
  //           },
  //         ],
  //         icon: String.fromCharCode(+'58909'),
  //         iconFamily: 'zybs',
  //       },
  //     },
  //     {
  //       text: '输入框文本',
  //       icon: 'icon-rect',
  //       name: 'input',
  //       data: {
  //         strokeStyle: '#fff',
  //         hideAnchor: true,
  //         rect: {
  //           x: 100,
  //           y: 200,
  //           width: 200,
  //           height: 100,
  //         },
  //         name: 'input',
  //         data: {
  //           props: {
  //             allowClear: true,
  //             placeholder: '请输入...',
  //           },
  //         },
  //         events: [
  //           {
  //             type: 'doFn',
  //             action: 'Function',
  //             value: `let fun = (a) =>  console.log(params + a); fun(123);`,
  //             params: 123,
  //             name: 'onChange',
  //           },
  //         ],
  //         icon: String.fromCharCode(+'58901'),
  //         iconFamily: 'zybs',
  //       },
  //     },
  //     {
  //       text: '表格',
  //       icon: 'icon-rect',
  //       name: 'table',
  //       data: {
  //         strokeStyle: '#fff',
  //         hideAnchor: true,
  //         rect: {
  //           x: 100,
  //           y: 200,
  //           width: 600,
  //           height: 400,
  //         },
  //         name: 'table',
  //         data: {
  //           props: {
  //             columns: columns,
  //             dataSource: data,
  //             bordered: true,
  //             pagination: false,
  //             className: 'simpleTable',
  //           },
  //           // 异步请求配置
  //           http: {
  //             api: '/api/topologies?',
  //             type: 'get',
  //             paramsGetStyle: 'subscribe',
  //             paramsArr: [
  //               { key: 'pageIndex', value: 1 },
  //               { key: 'pageCount', value: 10 },
  //             ],
  //           },
  //         },
  //         events: [
  //           {
  //             type: 'doFn',
  //             action: 'Function',
  //             value: `let fun = (a) =>  console.log(params + a); fun(123);`,
  //             params: 123,
  //             name: 'onClick',
  //           },
  //         ],
  //         icon: String.fromCharCode(+'58926'),
  //         iconFamily: 'zybs',
  //       },
  //     },
  //   ],
  // },
];
