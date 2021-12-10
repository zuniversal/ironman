import React, { Component, PureComponent } from 'react';
import UserCenterForm from '@/components/Form/UserCenterForm';
import CsUserCenterForm from '@/components/Form/CsUserCenterForm';
import CsUserCenterEditForm from '@/components/Form/CsUserCenterEditForm';
import { actions, mapStateToProps } from '@/models/csUserCenter';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { tips } from '@/utils';

export const TITLE = '用户';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
};

// const mapStateToProps = ({ userCenter }) => userCenter;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  noMountFetch: true,
})
class CsUserCenter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  renderForm = params => {
    console.log(' renderForm ： ', params, this.state, this.props);
    const { action } = this.props;
    const formComProps = {
      action,
      // init: this.props.userInfo.user,
      init: this.props.itemDetail,
    };
    console.log(
      ' formComProps ： ',
      formComProps,
      !!Object.keys(this.props.itemDetail).length,
    );
    return (
      !!Object.keys(this.props.itemDetail).length && (
        <UserCenterForm {...formComProps}></UserCenterForm>
      )
    );
    const com = this.props.isStartEdit ? (
      <CsUserCenterEditForm handleOk={this.handleOk}></CsUserCenterEditForm>
    ) : (
      <CsUserCenterForm
        startEdit={this.props.toggleEditInfo}
        {...formComProps}
      ></CsUserCenterForm>
    );
    return !!Object.keys(this.props.itemDetail).length ? com : null;
  };
  handleOk = async props => {
    console.log(' handleOk,  , ： ', props);
    const { form, action } = props;
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
      if (action === 'edit') {
        if (res.logo && res.logo.fileList.length > 0) {
          const fileList = res.logo.fileList;
          res.logo = fileList[fileList.length - 1].response.url;
        } else {
          tips('logo不能为空！', 2);
          return;
        }
        this.props.editItemAsync({
          ...res,
        });
      }
    } catch (error) {
      console.log(' error ： ', error);
    }
  };

  componentDidMount() {
    this.props.getItemAsync({});
  }

  render() {
    // return (
    //   <CsUserCenterEditForm handleOk={this.handleOk}></CsUserCenterEditForm>
    // );
    return <div className="csUserCenter">{this.renderForm()}</div>;
  }
}

export default CsUserCenter;
