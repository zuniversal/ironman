import React, { Component, useRef, useState } from 'react';
import './style.less';
import { Steps, Button } from 'antd';
import SmartForm from '@/common/SmartForm'; //
import { missionsTypeConfig, missionsStatusConfig } from '@/configs';
import InspectMissionTimeline from '@/components/Widgets/InspectMissionTimeline';
import SmartImg from '@/common/SmartImg';
import SmartInput from '@/common/SmartInput';
import UploadCom from '@/components/Widgets/UploadCom';
import MissionsHouseNoTable from '@/components/Table/MissionsHouseNoTable';
import { MissionsClientForm } from '@/components/Form/MissionsManageActionForm'; //
import SmartShowPDF from '@/common/SmartShowPDF'; //
import SmartModal from '@/common/SmartModal'; //
import { tips } from '@/utils';
import { getPdf } from '@/services/contract';

const { Step } = Steps;

const CommonModal = props => {
  console.log(' CommonModal ： ', props); //
  // return <div>CommonModal</div>
  return (
    <SmartModal
      title={props.title}
      show={props.show}
      onOk={props.onOk}
      onCancel={props.onCancel}
    >
      <SmartShowPDF
        src={`${getPdf}${props.extraData?.path}.pdf`}
        path={`${props.extraData?.path}.pdf`}
      ></SmartShowPDF>
    </SmartModal>
  );
};

CommonModal.defaultProps = {
  extraData: {},
};

const MissionsManageForm = props => {
  console.log(' MissionsManageForm ： ', props); //
  const [isShow, setIsShow] = useState(false);
  const [pdfData, setPdfData] = useState({});

  const onModalOk = params => {
    console.log(' onModalOk params ： ', params); //
    setIsShow(!isShow);
  };
  const onModalCancel = params => {
    console.log(' onModalCancel params ： ', params); //
    setIsShow(!isShow);
  };
  const showFormModal = params => {
    console.log(' showFormModal params ： ', params); //
    setPdfData(params);
    setIsShow(true);
  };

  const { formBtn, action, ...rest } = props; //
  // const { file = [] } = props.init;
  const file = props.init.file ?? [];

  const isDetail = props.action === 'detail';
  console.log(' isDetail ： ', isDetail); //

  const logTimeLine = [
    {
      noRule: true,
      formType: 'CustomCom',
      CustomCom: (
        <div>
          {file.map((v, i) => (
            // <img src={v} className="feedBackImg" key={i} />
            <SmartImg src={v} key={i} />
          ))}
        </div>
      ),
      itemProps: {
        label: '反馈照片',
      },
    },
    {
      noRule: true,
      formType: 'CustomCom',
      CustomCom: (
        <InspectMissionTimeline
          datas={props.init?.work_log || []}
        ></InspectMissionTimeline>
      ),
      itemProps: {
        label: '任务日志',
        name: 'task_log',
      },
    },
  ];

  const actionConfig = [
    <UploadCom
      label={'反馈照片'}
      key={'file'}
      action={'/api/v1/upload'}
      name={'file'}
      extra={'支持扩展名:jpg、png'}
      uploadProps={{
        disabled: props.isDisabledAll || props.action === 'detail',
        accept: 'image/png,image/jpeg,image/pdf,application/pdf',
        multiple: true,
      }}
      init={props.init}
      formItemProps={{
        rules: null,
      }}
      formAction={props.action}
    ></UploadCom>,
  ];

  const config = [
    // {
    //   formType: 'Search',
    //   selectSearch: props.getClientAsync,
    //   selectData: props.clientList,
    //   itemProps: {
    //     label: '客户',
    //     // name: ['customer', 'id'],
    //     name: 'customer_id',
    //   },
    // },

    ...(isDetail
      ? [
          {
            formType: 'rowText',
            itemProps: {
              label: '任务信息',
            },
          },
        ]
      : []),

    ...(props.action !== 'add'
      ? [
          {
            noRule: true,
            itemProps: {
              label: '名称',
              name: 'name',
            },
          },
        ]
      : []),
    {
      formType: 'Search',
      selectData: missionsTypeConfig,
      itemProps: {
        label: '任务类型',
        name: 'type',
      },
    },
    // 选择客户所属电站
    {
      noRule: true,
      formType: 'Search',
      selectSearch: props.getPowerAsync,
      selectData: props.powerList,
      itemProps: {
        label: '实施电站',
        name: 'station_id',
      },
    },
    // {
    //   noRule: true,
    //   formType: 'Search',
    //   // selectSearch: props.getAssetsAsync,
    //   selectData: props.assetsList,
    //   itemProps: {
    //     label: '设备',
    //     name: 'equipment_id',
    //   },
    // },
    {
      formType: 'TextArea',
      itemProps: {
        label: '任务描述',
        name: isDetail ? 'describe' : 'content',
      },
    },
    {
      itemProps: {
        label: '联系人',
        name: isDetail ? 'contacts' : 'person',
      },
    },
    // {
    //   noRule: true,
    //   formType: 'CustomCom',
    //   CustomCom: (
    //     <div>
    //       {props.init?.customer_admin?.map((v, i) => (
    //         <div className="adminBox" key={i} >{v.nickname}</div>
    //       ))}
    //     </div>
    //   ),
    //   itemProps: {
    //     label: '客户管理员',
    //     name: '',
    //   },
    // },
    {
      itemProps: {
        label: '电话',
        name: isDetail ? 'contacts_phone' : 'phone',
      },
    },
    {
      itemProps: {
        label: '地址',
        name: 'addr',
      },
    },
    {
      noRule: true,
      formType: 'Search',
      selectSearch: props.getTeamAsync,
      selectData: props.teamList,
      itemProps: {
        label: '服务班组',
        name: 'team_id',
      },
    },

    ...(isDetail ? logTimeLine : actionConfig),
  ].map(v => ({
    ...v,
    // comProps: isDetail ? v.comProps : { className: 'w-240', ...v.comProps },
    comProps: { className: 'w-240', ...v.comProps },
  }));

  const [current, setCurrent] = useState(isDetail ? 1 : 0);
  const completeIndex = useRef(0);

  const onChange = goIndex => {
    console.log('onChange:', goIndex, completeIndex.current);
    // if (current > -1 && current < contractStepConfig.length) {
    if (goIndex < completeIndex.current) {
      setCurrent(goIndex);
    }
  };

  const next = async () => {
    console.log(' next ： ', current, props); //
    const indexs = current + 1;
    // if (Object.keys(props.init).length) {
    if (Object.keys(props.clientItem).length) {
      setCurrent(indexs);
      if (indexs > completeIndex.current) {
        completeIndex.current = indexs;
      }
    } else {
      tips('请先选择一个客户在继续！', 2);
    }
  };

  const onFieldChange = v => {
    console.log(' onFieldChange ： ', v);
  };

  const prev = () => {
    console.log(' prev ： ', current); //

    if (current > 0) {
      setCurrent(current - 1);
    }
  };
  console.log(' current ： ', current); //

  const contractStepConfig = [
    { key: 'client', title: '选择户号' },
    { key: 'station', title: '填写任务信息' },
  ];

  const stepCom = (
    <div className="stepWrapper">
      <Steps
        current={current}
        onChange={onChange}
        // type="navigation"
        className={`step`}
      >
        {[...contractStepConfig].map((v, i) => (
          <Step
            // icon={null}
            // status="finish"
            title={v.title}
            key={v.key}
          />
        ))}
      </Steps>
    </div>
  );

  const selectClient = v => {
    console.log(' selectClient ： ', v);
  };

  const nextCom = (
    <>
      <Button className={'m-r-10 '} onClick={next}>
        下一步
      </Button>
    </>
  );

  const prevCom = (
    <>
      <Button className={'m-r-10 '} onClick={prev}>
        上一步
      </Button>
      <Button
        className={'m-r-10 '}
        type="primary"
        onClick={e => {
          props.onOk({ form: props.propsForm });
        }}
      >
        新建任务
      </Button>
    </>
  );

  const confirmBtn = (
    <Button className={'m-r-10 '} onClick={props.onCancel} type="primary">
      确定
    </Button>
  );
  const footerCom = (
    <div className="btnWrapper">
      <Button className={'m-r-10 '} onClick={props.onCancel}>
        取消
      </Button>
      {isDetail ? confirmBtn : current == 0 ? nextCom : prevCom}
    </div>
  );

  const houseNotable = (
    <>
      <SmartInput
        // onChange={props.onChange}
        onPressEnter={props.onChange}
        ph={'关键字回车搜索'}
        defaultValue={props.tableProps?.searchInfo?.keyword}
      ></SmartInput>
      <MissionsHouseNoTable {...props.tableProps}></MissionsHouseNoTable>
    </>
  );

  console.log(' missionsManage SmartForm props ： ', props); //

  return (
    <div className={' missionsManageForm '}>
      {!isDetail && stepCom}
      <div className="missionsManageFormWrapper">
        <div className="left f1">
          {/* {current == 0 ? props.houseNotable : <SmartForm config={config} {...props}></SmartForm>} */}
          {current == 0 && !isDetail ? (
            houseNotable
          ) : (
            <SmartForm config={config} {...props}></SmartForm>
          )}
        </div>
        {/* {!isDetail && } */}
        <div className="right f1">
          {/* {
            Object.keys(props.clientItem).length > 0 ? <MissionsClientForm key={props.clientItem?.id} init={props.clientItem} ></MissionsClientForm> : null
          } */}
          <MissionsClientForm
            key={props.clientItem?.id}
            init={props.clientItem}
            showFormModal={showFormModal}
          ></MissionsClientForm>
          {/* {props.missionsClientForm} */}
        </div>
      </div>
      {!isDetail && footerCom}

      <CommonModal
        title={'合同报告'}
        show={isShow}
        onOk={onModalOk}
        onCancel={onModalCancel}
        {...pdfData}
      ></CommonModal>
    </div>
  );
};

MissionsManageForm.defaultProps = {
  init: {},
  tableProps: {},
};

export default MissionsManageForm;
