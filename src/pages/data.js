const datas = [];
const obj = {};
new Array(20).fill(0).forEach((v, i) => {
  obj[`field${i}`] = `field${i}`;
});

for (let i = 1; i <= 20; i++) {
  datas.push({
    ...obj,
    key: i,
    [`field${i}`]: `field${i}`,
    name: 'John Brown',
    age: `${i}2`,
    address: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}

export default datas; //
