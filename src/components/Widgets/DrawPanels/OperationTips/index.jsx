import React, { useState } from 'react';
import { connect } from 'dva';
import './style.less';

const OperationTips = props => {
  return (
    <div className="tipsWrapper">
      {/* <div className={'tips'}>小提示</div> */}
      <div className={'intro'}>
        <div>
          Ctrl + C 复制 / V 粘贴 / X 剪切 / Z 撤销 / A 全选 右键也有操作项
        </div>
        <div>Delete 键/删除键 可删除选中元素</div>
        <div>
          Ctrl + A 可整体选中拖动 （元素多会卡顿）可组合使用 锁定画布后
          可拖动整块画布
        </div>
        <div>长按Ctrl + 鼠标左键可批量选中图形 批量移动区域内的内容</div>
        <div>
          鼠标选中图形一起拖拽 移动图形上部可以整体旋转图形 也可结合Ctrl +
          A整体旋转
        </div>
        <div>鼠标滚轮：缩放 鼠标在画板位置进行缩放</div>
        <div>方向键：控制图形对应移动1个像素</div>
        <div>拖动图形/拖出线条后右侧面板可以设置对应属性</div>
        <div>双击图形/线条可以输入文本</div>
        <div>选中连线后 可拖拽突出端点 移动连线位置等</div>
        <div>拖动监控点到后可以选择绑定的监控点及要显示的监控字段</div>
        <div>绑定监控点及字段后预览每10s可以看到最新实时数据</div>
        <div>点击空白区域可取消选中元素 设置画布整体属性</div>
        {/* <div>添加或选中节点，右侧属性支持上传各种图片哦</div> */}
      </div>
    </div>
  );
};

OperationTips.defaultProps = {};

export default OperationTips;