

// import regions from './regions'// 
// console.log(' regions ： ', regions,  )// 
// export const regoins = regions



export const regoins = [
  {
    value: '福建',
    label: '福建',
    children: [
      {
        value: '泉州',
        label: '泉州',
        children: [
          {
            value: '泉港',
            label: '泉港',
          },
        ],
      },
    ],
  },
];


export const province = [
  {
    value: '福建',
    label: '福建',
  },
  {
    value: '泉州',
    label: '泉州',
  },
  {
    value: '泉港',
    label: '泉港',
  },
];

export const site = province
export const city = province


export const httpTipsMap = { 
  slow: '阿哦，加载中，请稍后', 
  notNetWork: '阿哦，没有网络，请您检查网络设置',    
  loadError: '阿哦，加载失败了，点击刷新试试（提供刷新按钮）',    
}







