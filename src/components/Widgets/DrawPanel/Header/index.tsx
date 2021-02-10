import { Menu, Avatar } from 'antd';
import React from 'react';
import { connect } from 'dva';
import './style.less';

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

  const scale = data.scale ? Math.floor(data.scale * 100) : 100;

  return (
    <div>
      <Menu
        className={''}
        selectedKeys={[]}
        mode="horizontal"
        onClick={onMenuClick}
      >
        <SubMenu title="文件" className={''}>
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
        <SubMenu title="编辑" className={''}>
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
          <Menu.Item key="parse" className={''}>
            粘贴
          </Menu.Item>
        </SubMenu>
        <Menu.Item className={''}>
          <div>视图：{scale}%</div>
        </Menu.Item>
        <SubMenu
          title={`默认连线类型：${lineNames[data.lineName]}`}
          className={''}
        >
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
      </Menu>
    </div>
  );
};

Headers.defaultProps = {
  canvas: {},
};

export default connect(state => ({ canvas: state.canvas, user: state.user }))(
  Headers,
);
