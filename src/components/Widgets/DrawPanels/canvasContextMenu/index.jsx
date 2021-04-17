import React, { Component } from 'react';
import './style.less';

const CanvasContextMenu = props => {
  console.log(' CanvasContextMenu ： ', props);
  const { canvas } = props;

  const onTop = () => {
    console.log(' onTop ： ', props);
    if (props.data.node) {
      canvas.top(props.data.node);
    }

    if (props.data.nodes) {
      for (const item of props.data.nodes) {
        canvas.top(item);
      }
    }

    canvas.render();
  };

  const onBottom = () => {
    console.log(' onBottom ： ', props);
    if (props.data.node) {
      canvas.bottom(props.data.node);
    }

    if (props.data.nodes) {
      for (const item of props.data.nodes) {
        canvas.bottom(item);
      }
    }

    canvas.render();
  };

  const onCombine = stand => {
    console.log(' onCombine ： ', stand);
    if (!props.data.nodes) {
      return;
    }
    canvas.combine(props.data.nodes, stand);
    canvas.render();
  };

  const onUncombine = () => {
    console.log(' onUncombine ： ', props);
    if (!props.data.node) {
      return;
    }
    canvas.uncombine(props.data.node);
    canvas.render();
  };

  const onLock = () => {
    console.log(' onLock ： ', props);
    props.data.locked = !props.data.locked;
    if (props.data.node) {
      props.data.node.locked = props.data.locked;
    }
    if (props.data.nodes) {
      for (const item of props.data.nodes) {
        item.locked = props.data.locked;
      }
    }
    canvas.render(true);
  };

  const onCopyImage = params => {
    console.log(' onCopyImage   params,   ： ', params);
  };

  const handleDispatch = key => {
    console.log(' handleDispatch ： ', key, props);
    props.dispatch({
      type: 'event/emit',
      payload: {
        event: key,
      },
    });
  };

  return (
    <div className={'styles.menus contextMenu'}>
      <div>
        <a
          className={props.data.node || props.data.nodes ? '' : 'disabled'}
          onClick={onTop}
        >
          置顶
        </a>
      </div>
      <div>
        <a
          className={props.data.node || props.data.nodes ? '' : 'disabled'}
          onClick={onBottom}
        >
          置底
        </a>
      </div>
      <div className={'line'} />
      {props.data.nodes ? (
        <div>
          <a
            onClick={() => {
              onCombine(false);
            }}
          >
            组合
          </a>
          <div>
            <a
              onClick={() => {
                onCombine(true);
              }}
            >
              包含
            </a>
          </div>
        </div>
      ) : null}
      {props.data.node && props.data.node.name === 'combine' ? (
        <div>
          <a onClick={onUncombine}>取消组合/包含</a>
        </div>
      ) : null}

      <div className="line"></div>
      <div>
        <a
          className={
            props.data.node || (props.data.nodes && !props.line)
              ? ''
              : 'disabled'
          }
          onClick={() => handleDispatch('delete')}
        >
          删除
        </a>
      </div>
      <div className="line"></div>
      <div>
        <a onClick={() => handleDispatch('undo')}>
          <span className="full">撤消</span>
          <span className="ml50">Ctrl + Z</span>
        </a>
      </div>
      <div>
        <a onClick={() => handleDispatch('redo')}>
          恢复
          <span className="ml50">Ctrl + Shift+ Z</span>
        </a>
      </div>
      <div className="line"></div>
      <div>
        <a onClick={() => handleDispatch('cut')}>
          <span className="full">剪切</span>
          <span className="ml50">Ctrl + X</span>
        </a>
      </div>
      <div>
        <a onClick={() => handleDispatch('copy')}>
          <span className="full">复制</span>
          <span className="ml50">Ctrl + C</span>
        </a>
      </div>
      <div>
        <a onClick={() => handleDispatch('paste')}>
          <span className="full">粘贴</span>
          <span className="ml50">Ctrl + V</span>
        </a>
      </div>
      <div className="line"></div>
      {/* <div>
        <a
          className={props.data.node || props.data.image ? '' : 'disabled'}
          onClick={onCopyImage}
        >
          <span className="full">复制节点图片地址</span>
        </a>
      </div> */}

      <div>
        <a
          className={props.data.node || props.data.nodes ? '' : 'disabled'}
          onClick={onLock}
        >
          {props.data.locked ? '解锁' : '锁定'}
        </a>
      </div>
    </div>
  );
};

CanvasContextMenu.defaultProps = {
  canvas: {},
};

export default React.memo(CanvasContextMenu);
