import { Menu, Button, Tag, Popover } from 'antd';
import React from 'react';
import { connect } from 'dva';
import './style.less';
import { FileOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { SubMenu } = Menu;

const lineNames = {
  curve: '曲线',
  polyline: '折线',
  line: '直线',
};

const Headers = props => {
  const onMenuClick = event => {
    const { key } = event;

    if (!key) {
      return;
    }

    switch (key) {
      case 'new':
        // router.push('/workspace')
        break;
      case 'open':
        // router.push('/workspace')
        setTimeout(() => {
          props.dispatch({
            type: 'event/emit',
            payload: {
              event: key,
            },
          });
        }, 100);
        break;
      default:
        if (key && props.dispatch) {
          props.dispatch({
            type: 'event/emit',
            payload: {
              event: key,
            },
          });
        }
        break;
    }
  };

  const { data = {} } = props.canvas;
  const { lineName = 'curve' } = data;

  const scale = data.scale ? Math.floor(data.scale * 100) : 100;
  console.log(' HeadersHeaders ： ', props, data); //

  const [isLock, setIsLock] = useState(false); // 是否处于锁定状态

  const [scaleNumber, setScaleNumber] = useState(1); // 缩放的基数

  const [lineStyle, setLineStyle] = useState('直线');

  const [fromArrowType, setFromArrowType] = useState('无箭头');

  const [toArrowType, setToArrowType] = useState('实心三角形');
  const scaleZoomOut = () => {
    if (scaleNumber < 5) {
      setScaleNumber(scaleNumber + 0.5);
      canvas.scaleTo(scaleNumber + 0.5);
    }
  };

  const scaleZoomIn = () => {
    if (scaleNumber > 0.5) {
      setScaleNumber(scaleNumber - 0.5);
      canvas.scaleTo(scaleNumber - 0.5);
    }
  };

  const onHandleSelectMenu = data => {
    setLineStyle(data.item.props.children);
    canvas.data.lineName = data.key;
    canvas.render();
  };

  const onHandleSelectMenu1 = data => {
    setFromArrowType(data.item.props.children);
    canvas.data.fromArrowType = data.key;
    canvas.render();
  };

  const onHandleSelectMenu2 = data => {
    setToArrowType(data.item.props.children);
    canvas.data.toArrowType = data.key;
    canvas.render();
  };

  /**
   * 元素连线之间的选项
   */

  const menu2 = (
    <Menu onClick={data => onHandleSelectMenu2(data)} style={{ border: 0 }}>
      <Menu.Item key="空">无箭头</Menu.Item>
      <Menu.Item key="triangleSolid">实心三角形</Menu.Item>
      <Menu.Item key="triangle">空心三角形</Menu.Item>
      <Menu.Item key="diamondSolid">实心菱形</Menu.Item>
      <Menu.Item key="diamond">空心菱形</Menu.Item>
      <Menu.Item key="circleSolid">实心圆</Menu.Item>
      <Menu.Item key="circle">空心圆</Menu.Item>
      <Menu.Item key="line">线型箭头</Menu.Item>
      <Menu.Item key="lineUp">上单边线箭头</Menu.Item>
      <Menu.Item key="lineDown">下单边线箭头</Menu.Item>
    </Menu>
  );

  /**
   * 元素连线之间的选项
   */

  const menu1 = (
    <Menu onClick={data => onHandleSelectMenu1(data)} style={{ border: 0 }}>
      <Menu.Item key="空">无箭头</Menu.Item>
      <Menu.Item key="triangleSolid">实心三角形</Menu.Item>
      <Menu.Item key="triangle">空心三角形</Menu.Item>
      <Menu.Item key="diamondSolid">实心菱形</Menu.Item>
      <Menu.Item key="diamond">空心菱形</Menu.Item>
      <Menu.Item key="circleSolid">实心圆</Menu.Item>
      <Menu.Item key="circle">空心圆</Menu.Item>
      <Menu.Item key="line">线型箭头</Menu.Item>
      <Menu.Item key="lineUp">上单边线箭头</Menu.Item>
      <Menu.Item key="lineDown">下单边线箭头</Menu.Item>
    </Menu>
  );

  /**
   * 连线起始箭头
   */

  const menu = (
    <Menu onClick={data => onHandleSelectMenu(data)} style={{ border: 0 }}>
      <Menu.Item key="line">直线</Menu.Item>
      <Menu.Item key="polyline">折线</Menu.Item>
      <Menu.Item key="curve">曲线</Menu.Item>
    </Menu>
  );

  return (
    <div className={`headerWrapper`}>
      <Menu
        className={''}
        selectedKeys={[]}
        mode="horizontal"
        onClick={onMenuClick}
      >
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              {/* <FileOutlined className={`icons`}  /> */}
              文件
            </span>
          }
          className={''}
        >
          <Menu.Item key="new" className={''}>
            新建文件
          </Menu.Item>
          <Menu.Item key="open" className={''}>
            打开本地文件（新建）
          </Menu.Item>
          <Menu.Item key="replace" className={''}>
            导入本地文件...
          </Menu.Item>
          <Menu.Divider>{}</Menu.Divider>
          <Menu.Item key="upload" className={''}>
            保存
          </Menu.Item>
          <Menu.Item key="save" className={''}>
            保存到本地
          </Menu.Item>
          <Menu.Item key="savePng" className={''}>
            下载为PNG
          </Menu.Item>
          <Menu.Item key="saveSvg" className={''}>
            下载为SVG
          </Menu.Item>
        </SubMenu>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              {/* <EditOutlined className={`icons`}  /> */}
              编辑
            </span>
          }
          className={''}
        >
          <Menu.Item key="undo" className={''}>
            撤消
          </Menu.Item>
          <Menu.Item key="redo" className={''}>
            恢复
          </Menu.Item>
          <Menu.Divider>{}</Menu.Divider>
          <Menu.Item key="copy" className={''}>
            复制
          </Menu.Item>
          <Menu.Item key="cut" className={''}>
            剪切
          </Menu.Item>
          <Menu.Item key="paste" className={''}>
            粘贴
          </Menu.Item>
        </SubMenu>
        {/* <Menu.Item className={''}>
          <div>视图：{scale}%</div>
        </Menu.Item> */}
        <SubMenu title={`默认连线类型：${lineNames[lineName]}`} className={''}>
          <Menu.Item className={''} key="curve">
            曲线
          </Menu.Item>
          <Menu.Item className={''} key="polyline">
            折线
          </Menu.Item>
          <Menu.Item className={''} key="line">
            直线
          </Menu.Item>
        </SubMenu>
        {/* <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Button
                type="primary"
              >
                保存
              </Button>
            </span>
          }
          className={''}
        >
        </SubMenu> */}

        {/* <Button.Group  >
          <Popover content={menu} title="默认连线类型" trigger="hover">
            <Button>{lineStyle}</Button>
          </Popover>

          <Popover content={menu1} title="默认起点箭头" trigger="hover">
            <Button>{fromArrowType}</Button>
          </Popover>

          <Popover content={menu2} title="默认终点箭头" trigger="hover">
            <Button>{toArrowType}</Button>
          </Popover>
        </Button.Group> */}
      </Menu>

      <div className="right">
        <div className={`headerItem`}>视图：{scale}%</div>
        <Button
          type="primary"
          onClick={() => {
            console.log(' props.save ： '); //
            props.dispatch({
              type: 'event/emit',
              payload: {
                event: 'upload',
              },
            });
            // props.save()
          }}
          size={'small'}
        >
          保存
        </Button>
      </div>
    </div>
  );
};

Headers.defaultProps = {
  canvas: {},
};

export default connect(state => ({ canvas: state.canvas }))(
  React.memo(Headers),
);
