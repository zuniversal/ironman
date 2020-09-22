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
import { tips } from '@/utils';

import { Form, Input, Button, Spin } from 'antd';

/* 
  封装的 通用 业务高阶组件 可选择性使用封装的方法  统一自动处理相关操作 简化重复逻辑的编写 
  支持 注入 actions, modalForm, titleMap, isMountFetch, isCheckQuery,  等配置参数 
  actions：注入的 models 里封装的相应操作页面的 action 
  modalForm：页面的操作表单 
  titleMap：模态框的标题映射
   
  
*/

export default ({
  actions,
  modalForm,
  titleMap,
  isMountFetch,
  isCheckQuery,
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

        topCom: null,
      };
    }

    setTopCom = topCom => {
      console.log('    setTopCom ： ', topCom);
      this.setState(topCom);
    };
    renderModalTop = e => {
      console.log('    renderModalTop ： ', e, this.state, this.props);
      return this.state.topCom;
    };

    showFormModal = params => {
      const { action } = params;
      console.log(
        '    showFormModal ： ',
        action,
        params,
        this.state,
        this.props,
      );
      const isEdit = action === 'edit';
      if (isEdit) {
        const { dispatch } = this.props; //
        dispatch(
          actions.getItemAsync({
            // d_id: 100,
          }),
        );
      }

      this.setState({
        action,
        isShow: true,
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
      if (action === 'edit') {
        actionFn = actions.editItemAsync;
      }

      const { form } = props; //

      try {
        const res = await form.validateFields();
        console.log('  res await 结果  ：', res, action, actionFn); //
        const { dispatch } = this.props; //
        dispatch(
          actionFn({
            data: res,
          }),
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
      console.log(' exportData,  , ： ', params);
      const { dispatch } = this.props; //
      tips('模拟导出成功！');
    };
    syncOAAsync = params => {
      console.log(' syncOAAsync,  , ： ', params);
      const { dispatch } = this.props; //
      tips('正在同步OA！');
      dispatch(actions.syncOAAsync({}));
    };
    onRemove = props => {
      console.log(' onRemove ： ', props, this.state, this.props);
      const { dispatch } = this.props; //

      dispatch(
        actions.removeItemAsync([
          // d_id: props.record.id,
          // ...props.record,
          props.record,
          // record,
        ]),
      );
    };
    onBatchRemove = props => {
      console.log(' onBatchRemove ： ', props, this.state, this.props);
      const { dispatch } = this.props; //
      const { selectedRows } = this.state; //

      dispatch(actions.removeItemAsync(selectedRows));
    };
    search = async params => {
      console.log('    search ： ', params);
      const { form } = params;

      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, form); //
    };

    getList = params => {
      console.log('    getList ： ', params, this.state, this.props);
      const { dispatch } = this.props; //

      dispatch(actions.getListAsync({}));
    };
    isCheckQuery = e => {
      const { query } = this.props.location; //
      console.log('    isCheckQuery ： ', e, this.state, this.props, query);
    };

    componentDidMount() {
      console.log(
        ' SmartHoc 组件componentDidMount挂载 ： ',
        this.state,
        this.props,
      ); //

      if (!isMountFetch) {
        this.getList();
      }
      if (!isCheckQuery) {
        this.isCheckQuery();
      }
    }

    render() {
      // console.log(' SmartHoc 组件 this.state, this.props ：', config, this.state, this.props, )
      console.log(
        'SmartHoc 组件 this.state, this.props ：',
        this.state,
        this.props,
      );

      const { action } = this.state; //

      const formComProps = {
        action,
        // init: this.state.editData,
      };

      const { isShow } = this.state;
      return (
        <div className="smartHocWrapper">
          <Com
            {...this.state}
            {...this.props}
            onRemove={this.onRemove}
            onBatchRemove={this.onBatchRemove}
            onSelectChange={this.onSelectChange}
            showFormModal={this.showFormModal}
            syncOAAsync={this.syncOAAsync}
            downloadFile={this.downloadFile}
            exportData={this.exportData}
            search={this.search}
            setTopCom={this.setTopCom}
          />

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

            // onSubmit={this.onSubmit}
            // onFail={this.onFail}
          >
            {this.renderModalContent()}
          </SmartFormModal>
        </div>
      );
    }
  };
