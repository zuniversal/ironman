

// import regions from './regions'// 
// console.log(' regions ： ', regions,  )// 
// export const regoins = regions



export const regoins = [
  {
    value: '广东省',
    label: '广东省',
    children: [
      {
        value: '深圳市',
        label: '深圳市',
        children: [
          {
            value: '南山区',
            label: '南山区',
          },
        ],
      },
    ],
  },
];


export const province = [
  {
    value: '广东省',
    label: '广东省',
  },
  {
    value: '深圳市',
    label: '深圳市',
  },
  {
    value: '南山区',
    label: '南山区',
  },
];

export const site = province
export const city = province


export const httpTipsMap = { 
  slow: '阿哦，加载中，请稍后', 
  notNetWork: '阿哦，没有网络，请您检查网络设置',    
  loadError: '阿哦，加载失败了，点击刷新试试（提供刷新按钮）',    
}







