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

import SmartFormModal from '@/common/SmartFormModal'; //
import { RemoveModal } from '@/components/Modal/ResultModal';
import { tips } from '@/utils';

import { Form, Input, Button, Spin } from 'antd';

/* 
  封装的 通用 业务高阶组件 可选择性使用封装的方法  统一自动处理相关操作 简化重复逻辑的编写 
  支持 注入 actions, modalForm, titleMap, noMountFetch, isCheckQuery,  等配置参数 
  actions：注入的 models 里封装的相应操作页面的 action 
  modalForm：页面的操作表单 
  titleMap：模态框的标题映射
   
  
*/

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
}) => Com =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        action: '',

        isShow: false,
        title: '',
        modalContent: null,

        selectedRowKeys: [],
        selectedRows: [],

        newTbData: [],
        editData: {},
        formComProps: {},

        topCom: null,

        // 删除弹框状态
        isShowRemoveModal: false,
        removeTitle: '',
      };
      // this.onRemove = this.removeAction
      this.actionProps = {};
      if (!noCreateActions) {
        const createActions = params => {
          const actionObj = {};
          Object.keys(actions).forEach(
            key =>
              (actionObj[key] = params =>
                this.props.dispatch(actions[key](params))),
          );
          console.log('  actionObj ：', actionObj); //
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
      if (actionFn) {
        this.props.dispatch(actionFn(params));
      } else {
        tips('未匹配到相应的action方法！');
      }
    };

    onRemove2 = props => {
      console.log(' onRemove2 ： ', props, this.state, this.props);
      const { dispatch } = this.props; //

      dispatch(
        // actions.removeItemAsync([
        //   // d_id: props.record.id,
        //   // ...props.record,
        //   props.record,
        //   // record,
        // ]),
        // actions.removeItemAsync([
        //   props.record.d_id,
        //   // ...props.record,
        //   // props.record,
        //   // record,
        // ]),
        actions.removeItemAsync(props.record.d_id),
      );
    };
    onBatchRemove2 = props => {
      console.log(' onBatchRemove2 ： ', props, this.state, this.props);
      const { dispatch } = this.props; //
      const { selectedRows, selectedRowKeys } = this.state; //
      if (selectedRowKeys.length) {
        dispatch(actions.removeItemsAsync(selectedRowKeys));
      } else {
        tips('请先勾选删除项再删除！', 2);
      }
    };

    removeAction = props => {
      console.log(' removeAction ： ', props, this.state, this.props);
      const { dispatch } = this.props; //
      const params = Array.isArray(props)
        ? props
        : [
            props.record.id,
            // ...props.record,
            // props.record,
            // record,
          ]; //
      console.log('  params ：', params); //
      dispatch(actions.removeItemAsync(params));
      this.setState({
        isShowRemoveModal: false,
      });
    };
    onBatchRemove = props => {
      console.log(' onBatchRemove ： ', props, this.state, this.props);
      const { dispatch } = this.props; //
      const { selectedRows, selectedRowKeys } = this.state; //
      if (selectedRowKeys.length) {
        this.onRemove(selectedRowKeys);
      } else {
        tips('请先勾选删除项再删除！', 2);
      }
    };

    onRemove = removeParams => {
      console.log('    onRemove ： ', removeParams, this.state, this.props);
      const { remove } = this.props; //
      this.setState({
        removeParams,
        isShowRemoveModal: true,
      });
    };
    onResultModalOk = e => {
      console.log(' onResultModalOk   e,  ,   ： ', e);
      tips('删除成功！');
      this.removeAction(this.state.removeParams);
    };
    onResultModalCancel = e => {
      console.log(' onResultModalCancel   e, ,   ： ', e);
      this.setState({
        isShowRemoveModal: false,
      });
    };
    renderRemoveModal = params => {
      console.log(' renderRemoveModal ： ', params);
      const { isShowRemoveModal } = this.state; //
      const { removeTitle } = this.props; //

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
      console.log('    renderModalTop ： ', e, this.state, this.props);
      return this.state.topCom;
    };

    showFormModal = params => {
      const { action, formComProps, formModalProps } = params;
      const actionFn = this.getAction(action);
      console.log(
        '    showFormModal ： ',
        action,
        params,
        formModalProps,
        formComProps,
        this.state,
        this.props,
        actions,
        actionFn,
      );

      // const isEdit = action === 'edit';
      // if (isEdit) {
      //   const { dispatch } = this.props; //
      //   dispatch(
      //     actions.getItemAsync(
      //       params.record,
      //     ),
      //   );
      // }

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
      });
    };

    renderModalForm = e => {
      // console.log('    renderModalForm ： ', e, this.state, this.props,   )
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
      if (action === 'edit' || action === 'detail') {
        actionFn = actions.editItemAsync;
      }

      const { form, init } = props; //

      try {
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

        const { newTbData } = this.state; //
        this.setState({
          isShow: false,
          newTbData: [res, ...newTbData],
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
    exportData = params => {
      console.log(
        ' exportData,  , ： ',
        params,
        actions,
        this.state,
        this.props,
      );
      const { dispatch } = this.props; //
      dispatch(actions.exportDataAsync({}));
      tips('模拟导出成功！');
    };
    syncOAAsync = params => {
      console.log(' syncOAAsync,  , ： ', params);
      const { dispatch } = this.props; //
      tips('正在同步OA！');
      dispatch(actions.syncOAAsync({}));
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
      console.log('    getList ： ', params, this.state);
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

    renderSmartFormModal = params => {
      console.log(' renderSmartFormModal ： ', params, this.state, this.props);
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
        </SmartFormModal>
      );
    };

    componentDidMount() {
      console.log(
        ' SmartHoc 组件componentDidMount挂载 ： ',
        this.state,
        this.props,
        noMountFetch,
      ); //

      if (!noMountFetch) {
        this.getList();
      }
      if (isCheckQuery) {
        this.checkQuery();
      } // //
    }

    render() {
      // console.log(' SmartHoc 组件 this.state, this.props ：', config, this.state, this.props, )
      console.log(
        'SmartHoc 组件 this.state, this.props111 ：',
        this.state,
        this.props,
      );

      return (
        <div className="smartHocWrapper">
          <Com
            {...this.state}
            {...this.props}
            {...this.actionProps}
            onRemove={this.onRemove2}
            onBatchRemove={this.onBatchRemove2}
            // onRemove={this.onRemove}
            // onBatchRemove={this.onBatchRemove}

            onSelectChange={this.onSelectChange}
            showFormModal={this.showFormModal}
            syncOAAsync={this.syncOAAsync}
            downloadFile={this.downloadFile}
            exportData={this.exportData}
            search={this.search}
            setTopCom={this.setTopCom}
          />

          {this.renderSmartFormModal()}

          {this.renderRemoveModal()}
        </div>
      );
    }
  };
