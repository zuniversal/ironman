import { Button, Modal, Form, Input, Row, Col, Upload } from 'antd';
import React from 'react';
import { useState } from 'react';
import './index.less';

const { Search } = Input;

const defImg =
  'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

const CustomImg = () => {
  const [visible, setVisible] = useState(false);
  const [url, setUrl] = useState(
    // 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2957705046,1654500225&fm=26&gp=0.jpg'
    defImg,
  );
  const [list, setList] = useState([defImg]);

  const onHandleAddPic = () => {
    setVisible(true);
  };

  function getBase64(url, callback) {
    var Img = new Image(),
      dataURL = '';
    Img.src = url + '?v=' + Math.random();
    Img.setAttribute('crossOrigin', 'Anonymous');
    Img.onload = function() {
      var canvas = document.createElement('canvas'),
        width = Img.width,
        height = Img.height;
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(Img, 0, 0, width, height);
      dataURL = canvas.toDataURL('image/jpeg');
      return callback ? callback(dataURL) : null;
    };
  }

  const onHandleSubmitForm = () => {
    getBase64(url, data => {
      console.log(' data ： ', data);
      const _data = [...list];
      _data.push(data);
      setList(_data);
      setVisible(false);
    });
  };

  const onDrag = (event, image) => {
    console.log(' onDrag ： ', event, image);
    event.dataTransfer.setData(
      'Text',
      JSON.stringify({
        name: 'image',
        rect: {
          width: 100,
          height: 100,
        },
        image,
      }),
    );
  };

  const onSave = params => {
    console.log(
      ' %c onSave 组件 params ： ',
      `color: #333; font-weight: bold`,
      params,
    );
    setList([...list, url]);
  };

  return (
    <div className="customComponent">
      <Form.Item label="回车添加网络图片地址">
        <Input
          placeholder="请输入图片地址"
          // defaultValue="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2957705046,1654500225&fm=26&gp=0.jpg"
          defaultValue={defImg}
          onChange={e => setUrl(e.target.value)}
          onPressEnter={onSave}
          colon={false}
          allowClear
          // enterButton={
          //   <Button type="primary" className="btn" onClick={onSave}>
          //     保存
          //   </Button>
          // }
        />
      </Form.Item>

      <Upload
        className={`fileImg`}
        defaultValue="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2957705046,1654500225&fm=26&gp=0.jpg"
        onChange={e => {
          console.log(' onChangeonChange e ： ', e);
          const reader = new FileReader();
          reader.readAsDataURL(e.file.originFileObj);
          reader.onload = () => {
            console.log(' onChangeonChange e 22  ： ', e, reader.result);
            setUrl(reader.result);
            setList([...list, reader.result]);
          };
          console.log(' onChangeonChange e 2： ', e, reader.result);
          // setUrl(reader.result)
          // var imgURL = window.URL.createObjectURL(e.file.originFileObj);
          // console.log(' imgURL ： ', imgURL,  )//
        }}
      >
        <Button type="primary" className="btn" size={'small'}>
          上传本地图片
        </Button>
      </Upload>
      {/* <Button type="primary" className="btn" onClick={onSave} size={'small'}>
        保存
      </Button> */}

      <Row>
        {list.map((item, index) => (
          <a
            draggable
            href="/#"
            onDragStart={ev => onDrag(ev, item)}
            key={index}
            onClick={() => {
              console.log(' xxxxxxx ： '); //
            }}
          >
            <img alt="pic" src={item} className={`customImg`} />
          </a>
        ))}
      </Row>

      {/* 
        <Button type="primary" className="btn" onClick={onHandleAddPic}>
          添加在线图片
        </Button>
        <Modal
        visible={visible}
        title="添加图片URL"
        onOk={() => onHandleSubmitForm()}
        onCancel={() => setVisible(false)}
        destroyOnClose
      >
        <Form.Item label="图片URL">
          <Input
            placeholder="请输入图片的地址"
            defaultValue="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2957705046,1654500225&fm=26&gp=0.jpg"
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Item>
      </Modal> */}
    </div>
  );
};

export default CustomImg;
