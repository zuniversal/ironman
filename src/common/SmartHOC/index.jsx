import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './style.less';

import PageTitle from '@/components/Widgets/PageTitle'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import { RemoveModal } from '@/components/Modal/ResultModal';
import { tips, downLoad } from '@/utils';
import { noShowTitlePath } from '@/configs';

import { Form, Input, Button, Spin } from 'antd';
import { SIZE, DOWN_URL, isDev } from '@/constants';
import { commonActions } from '@/models/common'; //
import { connect } from 'umi';

/* 
  封装的 通用 业务高阶组件 可选择性使用封装的方法  统一自动处理相关操作 简化重复逻辑的编写 
  支持 注入 actions, modalForm, titleMap, noMountFetch, isCheckQuery,  等配置参数 
  actions：注入的 models 里封装的相应操作页面的 action 
  modalForm：页面的操作表单 
  titleMap：模态框的标题映射
   
  
*/

const handleAuth = (props = {}) => {
  if (isDev) {
    const authInfo = {};
    Object.keys(props).forEach(v => (authInfo[v] = true));
    console.log(
      ' artHoc 组件 t handleAuth ： ',
      props,
      Object.keys(props),
      authInfo,
    ); //
    return authInfo;
  } else {
    return props;
  }
};

const actionMap = {
  add: 'addItemAsync',
  edit: 'getItemAsync',
  detail: 'getItemAsync',
};

export default ({
  actions,
  modalForm,
  titleMap,
  noMountFetch,
  isCheckQuery,
  noCreateActions,
  noConnectCommon,
}) => Com => {
  class SmartHoc extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        action: '',

        isShow: false,
        title: '',
        modalContent: null,

        selectedRowKeys: [],
        selectedRows: [],

        editData: {},
        formComProps: {},

        topCom: null,

        // 删除弹框状态
        isShowRemoveModal: false,
        isBatch: false,
        removeTitle: '',

        isShowTitle: true,
      };
      // this.onRemove = this.removeAction
      this.actionProps = {};
      if (!noCreateActions) {
        const createActions = params => {
          const actionObj = {};
          const actionsObj = {
            ...commonActions,
            ...actions,
          };
          Object.keys(actionsObj).forEach(
            key =>
              (actionObj[key] = params =>
                this.props.dispatch(actionsObj[key](params))),
          );
          // console.log('  actionObj ：', actionObj, actionsObj); //
          return actionObj;
        };
        this.actionProps = createActions();
      }
    }
    getAction = key => {
      const action = actions[actionMap[key] ? actionMap[key] : ''];
      return action;
    };
    dispatchAction = (action, params) => {
      const actionFn = this.getAction(action);
      console.log('  dispatchAction ：', action); //
      if (action === 'add') {
        // tips('add没有相应的action方法！');
        return;
      }
      if (actionFn) {
        this.props.dispatch(actionFn(params));
      } else {
        tips('未匹配到相应的action方法！');
      }
    };

    onRemove2 = props => {
      console.log(' onRemove2 ： ', props, this.state, this.props);

      // dispatch(
      //   actions.removeItemAsync(props.record.d_id),
      // );
      this.props.dispatch(actions.removeItemsAsync(props));
    };
    onBatchRemove2 = props => {
      console.log(' onBatchRemove2 ： ', props, this.state, this.props);
      const { dispatch } = this.props; //
      const { selectedRows, selectedRowKeys } = this.state; //
      if (selectedRowKeys.length) {
        // const params = props.key ? { [props.key]: selectedRowKeys, } : selectedRowKeys
        // console.log(' params ： ', params,  )//
        // dispatch(actions.removeItemsAsync(selectedRowKeys));
        dispatch(actions.removeItemsAsync(props ? props : selectedRowKeys));
        this.setState({
          selectedRowKeys: [],
        });
      } else {
        tips('请先勾选删除项再删除！', 2);
      }
    };

    removeAction = props => {
      console.log(' removeAction ： ', props, this.state, this.props);
      const { dispatch } = this.props; //
      const { selectedRowKeys, isBatch } = this.state; //
      const isArray = Array.isArray(props);
      // const params = isArray
      //   ? props
      //   : [
      //       props.record.id,
      //       // ...props.record,
      //       // props.record,
      //       // record,
      //     ]; //
      const params = props;
      // const params = isArray
      //   ? props
      //   : [
      //       props.record.id,
      //       // ...props.record,
      //       // props.record,
      //       // record,
      //     ]; //
      const resetState = {
        isShowRemoveModal: false,
      };
      if (isBatch) {
        resetState.selectedRowKeys = [];
        this.props.dispatch(
          actions.removeItemsAsync(params ? params : selectedRowKeys),
        );
      } else {
        // dispatch(actions.removeItemAsync({ id: `${props.record.id}` }));
        this.props.dispatch(actions.removeItemAsync(params));
      }
      console.log('  params ：', params, resetState); //
      // dispatch(actions.removeItemAsync(params));
      this.setState(resetState);
    };
    // onBatchRemove = props => {
    //   console.log(' onBatchRemove ： ', props, this.state, this.props);
    //   const { dispatch } = this.props; //
    //   const { selectedRows, selectedRowKeys } = this.state; //
    //   if (selectedRowKeys.length) {
    //     this.onRemove(selectedRowKeys);
    //   } else {
    //     tips('请先勾选删除项再删除！', 2);
    //   }
    // };
    // onRemove = removeParams => {
    //   console.log('    onRemove ： ', removeParams, this.state, this.props);
    //   const { remove } = this.props; //
    //   this.setState({
    //     removeParams,
    //     isShowRemoveModal: true,
    //   });
    // };

    onBatchRemove = props => {
      console.log(' onBatchRemove ： ', props, this.state, this.props);
      const { dispatch } = this.props; //
      const { selectedRows, selectedRowKeys } = this.state; //
      if (selectedRowKeys.length) {
        // this.onRemove(selectedRowKeys, true);
        this.onRemove(props, true);
      } else {
        tips('请先勾选删除项再删除！', 2);
      }
    };
    onRemove = (removeParams, isBatch) => {
      console.log(
        '  调用删除确认弹框  onRemove ： ',
        removeParams,
        isBatch,
        this.state,
        this.props,
      );
      const { remove } = this.props; //
      this.setState({
        removeParams,
        isShowRemoveModal: true,
        isBatch,
      });
    };

    onResultModalOk = e => {
      console.log(' onResultModalOk   e,  ,   ： ', e);
      // tips('删除成功！');
      this.removeAction(this.state.removeParams);
    };
    onResultModalCancel = e => {
      console.log(' onResultModalCancel   e, ,   ： ', e);
      this.setState({
        isShowRemoveModal: false,
        isBatch: false,
      });
    };
    renderRemoveModal = params => {
      // console.log(' renderRemoveModal ： ', params);
      const { isShowRemoveModal } = this.state; //
      const { removeTitle = '删除操作' } = this.props; //

      const modalProps = {
        title: removeTitle,
        show: isShowRemoveModal,
        onOk: this.onResultModalOk,
        onCancel: this.onResultModalCancel,
      };
      const resProps = {
        // okFn: this.handleOk,
        // offFn: this.handleOff,
        okFn: this.onResultModalOk,
        offFn: this.onResultModalCancel,
      };

      return (
        <RemoveModal modalProps={modalProps} resProps={resProps}>
          {/* <div className="dfc">
          {okText && <Button key="buy">{okText}</Button>}
          {okText && <Button type="primary" >{okText}</Button>}
        </div> */}
        </RemoveModal>
      );
    };

    setTopCom = topCom => {
      console.log('    setTopCom ： ', topCom);
      this.setState(topCom);
    };
    renderModalTop = e => {
      // console.log('    renderModalTop ： ', e, this.state, this.props);
      return this.state.topCom;
    };

    showFormModal = params => {
      const { action, formComProps, formModalProps, modalFormContent } = params;
      const actionFn = this.getAction(action);
      // console.log(
      //   '    showFormModal ： ',
      //   action,
      //   params,
      //   formModalProps,
      //   formComProps,
      //   this.state,
      //   this.props,
      //   actions,
      //   actionFn,
      // );

      if (action !== 'add') {
        // const { dispatch } = this.props; //
        // dispatch(actionFn(params));
        this.dispatchAction(action, params);
      }

      this.setState({
        action,
        isShow: true,
        formComProps,
        formModalProps,
        editData: action === 'edit' ? params.record : {},
        modalFormContent,
      });
    };

    renderModalForm = e => {
      // console.log('    renderModalForm ： ', e, this.state,   )
      // const {modalForm,  } = this.state//
      if (modalForm) {
        return modalForm;
      }

      // return null
    };
    renderModalContent = e => {
      // console.log('    renderModalContent ： ', e,   )
      const { modalContent } = this.state; //
      if (modalContent) {
        return modalContent;
      }
      return modalContent;
    };

    onOk = async props => {
      console.log(' onOkonOk ： ', props, this.state, this.props);
      const { action } = this.state; //
      let actionFn = actions.addItemAsync;
      if (action === 'edit') {
        actionFn = actions.editItemAsync;
      }

      const { form, init } = props; //

      try {
        // const res = await form.validateFields(['customer_admin']);
        // console.log('  res await 结果 1 ：', res, action, actionFn); //
        const res = await form.validateFields();
        console.log('  res await 结果  ：', res, action, actionFn); //
        const { dispatch } = this.props; //
        dispatch(
          // actionFn({
          //   data: res,
          // }),
          actionFn({ ...init, ...res }),
        );
        // const {addItemAsync,  } = this.props//
        //addItemAsync(res)

        this.setState({
          isShow: false,
        });
      } catch (error) {
        console.log(' error ： ', error); //
      }

      // form
      // .validateFields()
      // .then(values => {
      //   console.log('  values await 结果  ：', values,  )//
      //   form.resetFields();
      //   // onCreate(values);
      // })
      // .catch(info => {
      //   console.log('Validate Failed:', info);
      // });
    };
    onCancel = e => {
      console.log(' onCancel ： ', e, this.state, this.props); //
      this.setState({
        isShow: false,
        // topCom: null,
      });
    };

    onSelectChange = (selectedRowKeys, selectedRows) => {
      console.log(
        ' onSelectChange ： ',
        selectedRowKeys,
        selectedRows,
        this.state,
        this.props,
      ); //

      this.setState({
        selectedRowKeys,
        selectedRows,
      });
    };

    downloadFile = params => {
      console.log(' downloadFile,  , ： ', params);
      const { dispatch } = this.props; //
      tips('模拟文件下载成功！');
    };
    exportData = async params => {
      console.log(
        ' exportData,  , ： ',
        params,
        actions,
        this.state,
        this.props,
      );
      // if (!params && Object.keys(params).length < 1) {
      //   tips('请先勾选导出项！', 2)
      //   return
      // }
      const { dispatch } = this.props; //
      const url = (
        await dispatch(
          actions.exportDataAsync({
            page: 1,
            page_size: 100,
            ...params,
          }),
        )
      ).bean;
      const urlArr = `${url}`.split('/');
      const name = urlArr[urlArr.length - 1];
      console.log(' DOWN_URL +  url ：', url, name); //
      downLoad(url, { name });
      // tips('模拟导出成功！');
    };
    syncOAAsync = params => {
      console.log(' syncOAAsync,  , ： ', params);
      const { dispatch } = this.props; //
      tips('正在同步OA！');
      // dispatch(actions.syncOAAsync({}));
    };
    search = async params => {
      console.log('    search ： ', params);
      const { form } = params;

      try {
        const res = await form.validateFields();
        console.log('  search res await 结果  ：', res); //
        this.getList(res);
      } catch (error) {
        console.log(' error ： ', error); //
      }
    };

    getList = (params = {}) => {
      // getList = (params = { page: 1, page_size: 10 }) => {
      console.log(
        '    getList page: 1, page_size: 10： ',
        actions.getListAsync,
        params,
        this.state,
        this.props,
      );
      const { dispatch } = this.props; //
      dispatch(actions.getListAsync(params));
    };
    checkQuery = e => {
      const { location, dispatch } = this.props; //
      if (location) {
        const { query } = location;
        console.log('    checkQuery ： ', e, this.state, this.props, query);
        if (Object.keys(query).length) {
          dispatch(actions.getListAsync(query));
        }
      }
    };
    onPageChange = (pagination, filters, sorter, extra) => {
      console.log(
        '    onPageChange ： ',
        pagination,
        filters,
        sorter,
        extra,
        this.state,
        this.props,
      );
      const { current = 1, pageSize = SIZE } = pagination;
      this.getList({
        page: current,
        page_size: pageSize,
      });
    };

    renderSmartFormModal = params => {
      // console.log(' renderSmartFormModal ： ', params, this.state, this.props);
      const { action, isShow, formModalProps } = this.state; //

      const formComProps = {
        action,
        ...this.state.formComProps,
        // init: this.state.editData,
        // init: {...this.props.itemDetail, member: [1]},
        // init: this.props.itemDetail,
      };
      if (action !== 'add') {
        formComProps.init = this.props.itemDetail;
      }

      return (
        <SmartFormModal
          // width={'900px'}

          show={isShow}
          onOk={this.onOk}
          onCancel={this.onCancel}
          action={action}
          titleMap={titleMap}
          // FormCom={<FormCom showRelativeForm={this.showRelativeForm}  ></FormCom>}

          formComProps={formComProps}
          // FormCom={this.renderModalForm()}
          FormCom={modalForm}
          top={this.renderModalTop()}
          {...formModalProps}

          // onSubmit={this.onSubmit}
          // onFail={this.onFail}
        >
          {this.renderModalContent()}
          {this.state.modalFormContent}
        </SmartFormModal>
      );
    };

    showModal = e => {
      console.log('    showModal ： ', e, this.state, this.props);
      this.props.showCommonModal();
    };
    // renderCommonModal = params => {
    //   console.log(' renderCommonModal ： ', params, this.state, this.props,    )//
    //   return (
    //     <SmartFormModal
    //       show={this.props.common.isShowCommonModal}
    //       action={this.props.common.action}
    //       titleMap={titleMap}
    //       onOk={this.closeCommonModal}
    //       onCancel={this.props.closeCommonModal}
    //     >
    //       {this.props.common.commonModalContent}
    //     </SmartFormModal>
    //   );
    // };

    componentDidMount() {
      // console.log(
      //   ' SmartHoc 组件componentDidMount挂载 ： ',
      //   this.state,
      //   this.props,
      //   noMountFetch,
      // ); //

      if (!noMountFetch) {
        this.getList();
      }
      if (isCheckQuery) {
        this.checkQuery();
      } // //
    }
    // componentWillUnmount() {
    //   console.log(' %c SmartHoc 组件 componentWillUnmount 将卸载 ： ', `color: red; font-weight: bold`, this.state, this.props,   )//
    // this.props.dispatch({type: 'reset',  })
    // }

    toggleShowTitle = () => {
      console.log(' toggleShowTitle   ,   ： ');
      this.setState({
        isShowTitle: !this.state.isShowTitle,
      });
    };
    get pageTitle() {
      const getShowTitle = props => {
        const { route } = props; //
        const { path, title } = route;
        const isInclude = noShowTitlePath.every(v => v != path);
        return isInclude ? title : false;
        // const isInclude = noShowTitlePath.some(v => v == path);
        // console.log(' isInclude some  ： ', props, isInclude, path);
        // return isInclude ? false : title;
      };
      return getShowTitle(this.props);
    }

    render() {
      console.log(
        ' SmartHoc 组件 this.state, this.props ：',
        this,
        this.state,
        this.props,
      );

      const { authInfo } = this.props;

      return (
        <div className="smartHocWrapper">
          {this.state.isShowTitle && (
            <PageTitle {...this.props} title={this.pageTitle}></PageTitle>
          )}

          <Com
            {...this.state}
            {...this.props}
            authInfo={handleAuth(authInfo)}
            {...this.actionProps}
            // onRemove={this.onRemove2}
            // onBatchRemove={this.onBatchRemove2}
            onRemove={this.onRemove}
            onBatchRemove={this.onBatchRemove}
            onSelectChange={this.onSelectChange}
            // showFormModal={this.showFormModal}
            syncOAAsync={this.syncOAAsync}
            downloadFile={this.downloadFile}
            exportData={this.exportData}
            search={this.search}
            setTopCom={this.setTopCom}
            onPageChange={this.onPageChange}
            dispatchAction={this.dispatchAction}
            toggleShowTitle={this.toggleShowTitle}
          />

          {this.renderSmartFormModal()}

          {/* {this.renderCommonModal()} */}

          {this.renderRemoveModal()}
        </div>
      );
    }
  }

  if (noConnectCommon) {
    // if (true) {
    return SmartHoc;
  } else {
    return connect(({ common }) => ({ common }))(SmartHoc);
  }
};
