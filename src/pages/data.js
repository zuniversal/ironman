// const datas = [];
// const obj = {};
// new Array(20).fill(0).forEach((v, i) => {
//   obj[`field${i}`] = `Field${i}`;
// });

// for (let i = 1; i <= 20; i++) {
//   datas.push({
//     ...obj,
//     key: i,
//     [`field${i}`]: `Field${i}`,
//     name: 'John Brown',
//     age: `${i}2`,
//     address: `New York No. ${i} Lake Park`,
//     description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
//   });
// }

// export default datas; //



const datas = new Array(20).fill(0).map((v, i) => {
  const obj = {};
  new Array(20).fill(0).forEach((v, index) => {
    // console.log(' vsssss ： ', v, i, index, )// 
    obj[`field${index}`] = `Field${i}`;
  });
  return {
    ...obj,
    key: i,
    [`field${i}`]: `Field${i}`,
    name: 'John Brown',
    age: `${i}2`,
    address: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  }
})

export default datas; //



