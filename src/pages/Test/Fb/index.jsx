import React from 'react';
import './style.less';
import { getItem } from '@/utils';
import {
  Card,
  Button,
  Input,
  Icon,
  Modal,
  Switch,
  Form,
  Row,
  Col,
  Select,
} from 'antd';
import moment from 'moment';

const getExec = new Promise((resolve, reject) => {
  console.log('  Promise ： ');
});
const confirm = Modal.confirm;
const FormItem = Form.Item;
const Option = Select.Option;

export const filterDatas = (arr, k) =>
  Array.from(new Set(arr.map(v => (k ? v[k] : v))));

class Fb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applyData: [],
      data: [],
      selectData: [],
      showReject: false,
      applyInfo: {},
      selectItem: '',
    };
  }
  getExec = v => {
    const p = {
      cursor: '30',
      count: '30',
    };
    getExec(p).then(res => {
      console.log('getExec：', res.data);
      const { data, code } = res.data;
      if (code === 1) {
        this.setState({
          // applyData: data,
        });
      }
    });
  };
  filter = e => {
    console.log('    filter ： ', e);
    const { data, selectItem } = this.state;
    this.setState({
      // data: data.map((v) => ({...v, match: v.name.includes(selectItem),   } )),
      data: data.map(v => ({ ...v, match: v.name == selectItem })),
    });
  };
  open = e => {
    console.log('    open ： ', e);
    const { data, selectItem } = this.state;
    const datas = data.map((v, i) => {
      if (v.name == selectItem) {
        console.log(
          ' data.map((v) => ({...v, match: v.name == selectItem,   } )) v ： ',
          v,
          i,
          v.name == selectItem,
        );
        // window.open(`https://www.fenbi.com/spa/tiku/report/exam/solution/xingce/xingce/${v.id}/2`)
        this.setTimeout(v);
      }
    });
    // datas.forEach((v, i) => {
    //   console.log(' datas v ： ', v, i,  )
    //   setTimeout(() => {
    //     console.log('  延时器 ： ',  )
    //     window.open(`https://www.fenbi.com/spa/tiku/report/exam/solution/xingce/xingce/${v.id}/2`)

    //   }, 2000)

    // })
  };
  onChange = selectItem => {
    console.log('    onChange ： ', selectItem);
    // this.setState({
    //   selectItem,
    // })
  };
  onSelect = selectItem => {
    const { data } = this.state;
    const res = data.map(v => ({
      ...v,
      match: `${v.name}`.includes(selectItem),
    }));
    console.log('    onSelect ： ', selectItem, this.state, res);
    this.setState({
      selectItem,
      data: res,
    });
  };
  setTimeout = v => {
    console.log('    setTimeout ： ', v);
    setTimeout(() => {
      console.log('  延时器 ： ', v.id);
      this.jump(v.id);
    }, 500);
  };
  openMulti = index => {
    console.log('    openMulti ： ', index);
    const { data } = this.state;
    data.forEach((v, i) => {
      console.log(
        ' data v ： ',
        v,
        i,
        index,
        index + 9,
        index + 9 > i > index,
        index + 9 > i > index,
      );
      if (index + 9 > i && i > index) {
        console.log(' data 符合 ： ', v);
        this.jump(v.id);
      }
    });
  };
  jump = v => {
    console.log('    jump ： ', v);
    window.open(
      `https://www.fenbi.com/spa/tiku/report/exam/solution/xingce/xingce/${v}/2`,
    );
  };
  getData = originData => {
    console.log('    getDatagetData4442 ： ', originData);
    const datas = [].flatMap(v => {
      // console.log(' datas v ： ', v,  )
      return v.datas;
    });
    console.log(' datas3333 ： ', datas, originData ? 1 : 2);

    const datas2 = originData ? originData : datas;
    console.log(' datas2 ： ', datas2);
    const data = datas2
      // .map((v) => {
      //   console.log(' v.id ： ', v.id,  )//
      // })
      .map(v => ({
        id: v.id,
        cc: v.correctCount,
        qc: v.questionCount,
        df: v.sheet.difficulty.toFixed(1),
        name: v.sheet.name.split('专项智能练习')[1],
        time: moment(v.updatedTime).format('MM-DD'),
      }));

    const selectData = filterDatas(data, 'name');

    console.log('    getData222 ： ', data, selectData);
    this.setState({
      data,
      selectData,
    });
  };
  componentDidMount() {
    // this.getExec()
    const datas = getItem('data');
    console.log('  datas ：', datas);
    // datas.length ? this.getData() : this.getData(datas)
    this.getData(datas);
  }
  render() {
    const { applyData, applyInfo, showReject, data, selectData } = this.state;
    console.log(
      ' %c Fb 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    return (
      <div>
        <div className="">
          <Select
            mode="tags"
            tokenSeparators={[',']}
            onChange={this.onChange}
            // onSearch={this.onSearch}
            filterOption={false}
            allowClear={true}
            defaultActiveFirstOption={false}
            showArrow={true}
            onSelect={this.onSelect}
            className="selectData"
            style={{ width: '300px' }}
          >
            {selectData.map((v, i) => (
              <Option value={v} key={i}>
                {v}
              </Option>
            ))}
          </Select>
          <span>{data.filter(v => v.match).length}</span>
          <Button
            onClick={this.filter}
            type="primary"
            icon="edit"
            className=" m-r5"
          >
            filter
          </Button>
          <Button
            onClick={this.open}
            type="primary"
            icon="edit"
            className=" m-r5"
          >
            open
          </Button>
        </div>

        {data.map((v, i) => (
          <div className={`${v.match ? 'match' : ''} w4  `} key={i}>
            <div
              className={`${v.match ? 'matchQs' : ''}   `}
              onClick={() => this.jump(v.id)}
            >
              <div className="w42">
                {v.name} - {i}
              </div>
              <div className="w42">
                {v.time} - {v.cc}/{v.qc} <span className="bgc">({v.df})</span>{' '}
              </div>
            </div>
            {i % 9 === 0 && (
              <Button
                onClick={() => this.openMulti(i)}
                type="primary d-b"
                icon="edit"
                className=" m-r5"
              >
                开{i}
              </Button>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default Fb;
