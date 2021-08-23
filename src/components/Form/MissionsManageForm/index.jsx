import React, { Component, useRef, useState, useEffect } from 'react';
import './style.less';
import { Steps, Button, Rate, Input } from 'antd';
import SmartForm from '@/common/SmartForm';
import {
  missionsTypeConfig,
  missionsStatusConfig,
  repairSourceConfig,
} from '@/configs';
import InspectMissionTimeline from '@/components/Widgets/InspectMissionTimeline';
import SmartImg from '@/common/SmartImg';
import SmartInput from '@/common/SmartInput';
import UploadCom from '@/components/Widgets/UploadCom';
import MissionsHouseNoTable from '@/components/Table/MissionsHouseNoTable';
import {
  MissionsClientForm,
  MissionsSimpleClientForm,
} from '@/components/Form/MissionsManageActionForm';
import SmartShowPDF from '@/common/SmartShowPDF';
import SmartModal from '@/common/SmartModal';
import { getPdf } from '@/services/contract';
import useHttp from '@/hooks/useHttp';
import { getRelatived } from '@/services/client';
import moment from 'moment';
import { formatSelectList, tips } from '@/utils';
import debounce from 'lodash/debounce';

const { Step } = Steps;

const CommonModal = props => {
  console.log(' CommonModal ： ', props);
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

const editKey = ['describe', 'contacts', 'contacts_phone', 'remarks'];

const MissionsManageForm = props => {
  console.log(' MissionsManageForm ： ', props);
  const [isShow, setIsShow] = useState(false);
  const [pdfData, setPdfData] = useState({});
  const [current, setCurrent] = useState(isDetail ? 1 : 0);
  const [simpleMission, setSimpleMission] = useState(isDetail ? true : false);
  const [formKey, setFormKey] = useState(0);
  // const [powerStationList, setPowerStationList] = useState([]);

  const completeIndex = useRef(0);

  const { data: clientList, req: getClientAsync } = useHttp(getRelatived);
  // const { customer, } = props.propsForm.getFieldsValue();
  const formDatas = props.propsForm.getFieldsValue();
  const { customer } = formDatas;
  let powerStationList = [];
  if (props.clientItem.id) {
    const filterId =
      props.action === 'edit' && props.init.customer?.id
        ? props.init.customer?.id
        : props.clientItem.id;
    console.log(
      ' clientList 副作用 表格  ： ',
      props.action,
      filterId,
      props.clientItem.id,
    ); //
    const powerList = [];
    const matchItem = clientList
      .find(v => v.value == filterId)
      ?.electricity_users.forEach((v, i) => powerList.push(...v.stations));
    console.log(
      ' clientList  副作用副作用： ',
      matchItem,
      clientList,
      powerList,
    ); //
    powerStationList = formatSelectList(powerList);
  }
  console.log(
    '  clientList 副作用 数据值 ： ',
    clientList,
    powerStationList,
    customer,
    formDatas,
    simpleMission,
    props.clientItem.id,
  );

  const formInit = simpleMission
    ? {
        addr: '',
        repair_time: moment(),
      }
    : {
        addr: '',
        team_id: null,
        ...props.init,
      };

  const onModalOk = params => {
    console.log(' onModalOk params ： ', params);
    setIsShow(!isShow);
  };
  const onModalCancel = params => {
    console.log(' onModalCancel params ： ', params);
    setIsShow(!isShow);
  };
  const showFormModal = params => {
    console.log(' showFormModal params ： ', params);
    setPdfData(params);
    setIsShow(true);
  };

  const { formBtn, action, ...rest } = props;
  // const { file = [] } = props.init;
  const file = props.init.file ?? [];

  const isDetail = props.action === 'detail';
  const isEdit = props.action === 'edit';
  console.log(' isDetail ： ', isDetail, isEdit);

  const setContacter = params => {
    console.log(' setContacter   params,   ： ', params, props);
    if (!isDetail) {
      props.propsForm.setFieldsValue({
        // contacts: 'params.nickname',
        // contacts_phone: 'params.phone',
        person: params.name,
        phone: params.phone,
        // person: 'params.nickname',
        // phone: 'params.phone',
      });
    }
    // props.propsForm.setFields([
    //   {
    //     // contacts: params.nickname,
    //     contacts: 'params.nickname',
    //   },
    //   {
    //     // phone: params.phone,
    //     phone: 'params.phone',
    //   },
    // ]);
  };

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
        disabled: props.isDisabledAll || props.action !== 'add',
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

  const onServiceStaffChange = (e, params) => {
    console.log(' onChange ： ', e, params, props, props.serviceStaffList);
    props.propsForm.setFieldsValue({
      service_phone: params.phone,
    });
  };

  const clientConfig = [
    {
      formType: 'rowText',
      itemProps: {
        label: '客户信息',
      },
    },
    {
      // formType: 'Search',
      // selectSearch: props.getClientAsync,
      // selectData: props.clientList,
      itemProps: {
        label: '所属客户',
        // name: 'customer_id',
        name: 'customer',
      },
    },
    // {
    //   noRule: true,
    //   itemProps: {
    //     label: '详细地址',
    //     name: 'address',
    //   },
    // },
    {
      formType: 'Search',
      // selectSearch: props.getServiceStaffAsync,
      selectData: props.serviceStaffList,
      itemProps: {
        label: '客户代表',
        name: 'service_staff',
      },
      comProps: {
        onChange: onServiceStaffChange,
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '客户代表电话',
        name: 'service_phone',
      },
      comProps: {
        disabled: true,
      },
    },
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

    // ...(isDetail
    //   ? [
    //       {
    //         formType: 'rowText',
    //         itemProps: {
    //           label: '任务信息',
    //         },
    //       },
    //     ]
    //   : []),
    {
      formType: 'rowText',
      itemProps: {
        label: '任务信息',
      },
    },

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

    ...(simpleMission
      ? [
          {
            itemProps: {
              label: '所属客户',
              name: 'customer',
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
      // selectSearch: props.getPowerAsync,
      // selectData: props.powerList,
      selectData: powerStationList,
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
        name: isDetail || isEdit ? 'describe' : 'content',
      },
    },
    {
      itemProps: {
        label: '联系人',
        name: isDetail || isEdit ? 'contacts' : 'person',
      },
    },
    // ...simpleMission ? [] : [
    //   {
    //     noRule: true,
    //     formType: 'CustomCom',
    //     CustomCom: (
    //       <div>
    //         {props.init?.customer_admin?.map((v, i) => (
    //           <div className="adminBox" key={i} onClick={() => setContacter(v)}>{v.nickname}</div>
    //         ))}
    //       </div>
    //     ),
    //     itemProps: {
    //       label: '客户联系人',
    //       name: '',
    //     },
    //   }
    // ],
    {
      itemProps: {
        label: '电话',
        name: isDetail || isEdit ? 'contacts_phone' : 'phone',
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
    {
      noRule: true,
      formType: 'DatePicker',
      itemProps: {
        label: '报修时间',
        name: 'repair_time',
      },
      comProps: isDetail
        ? {}
        : {
            showTime: true,
          },
    },
    {
      noRule: true,
      itemProps: {
        label: '当班调度',
        name: 'dispatcher',
      },
    },
    {
      noRule: true,
      formType: 'Search',
      selectData: repairSourceConfig,
      itemProps: {
        label: '报修来源',
        name: 'source',
      },
      comProps: {
        mode: 'tags',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <div>
          <Rate disabled defaultValue={props.init.score} />
          <div className="">
            {props.init.appraise} {props.init.appraise_time}
          </div>
        </div>
      ),
      itemProps: {
        label: '服务评分',
      },
    },
    {
      noRule: true,
      formType: 'TextArea',
      itemProps: {
        label: '备注',
        name: 'remarks',
      },
    },

    ...(isDetail ? logTimeLine : actionConfig),

    ...(simpleMission
      ? [
          {
            formType: 'Search',
            // selectSearch: props.getServiceStaffAsync,
            selectData: props.serviceStaffList,
            itemProps: {
              label: '客户代表',
              name: 'service_staff',
            },
            comProps: {
              onChange: onServiceStaffChange,
            },
          },
          {
            noRule: true,
            itemProps: {
              label: '客户代表电话',
              name: 'service_phone',
            },
            comProps: {
              disabled: true,
            },
          },
        ]
      : []),

    // ...simpleMission ? clientConfig : [],
  ].map(v => {
    const comProps = simpleMission
      ? v.comProps
      : { className: 'w-240', ...v.comProps };

    if (isEdit) {
      const isEditAble = editKey.includes(v?.itemProps?.name);
      if (isEditAble) {
        comProps.disabled = false;
      } else {
        comProps.disabled = comProps.disabled ?? true;
      }
    }

    return {
      ...v,
      // comProps: isDetail ? v.comProps : { className: 'w-240', ...v.comProps },
      // comProps: { className: 'w-240', ...v.comProps },
      comProps,
    };
  });

  const onChange = goIndex => {
    console.log('onChange:', goIndex, completeIndex.current);
    // if (current > -1 && current < contractStepConfig.length) {
    if (goIndex < completeIndex.current) {
      setCurrent(goIndex);
      setFormKey(formKey + 1);
    }
  };

  const next = () => {
    console.log(' next ： ', current, props);
    const indexs = current + 1;
    // if (Object.keys(props.init).length) {
    if (Object.keys(props.clientItem).length) {
      setCurrent(indexs);
      setSimpleMission(false);
      setFormKey(formKey + 1);
      if (indexs > completeIndex.current) {
        completeIndex.current = indexs;
      }
      props.propsForm.setFieldsValue(formInit);
    } else {
      tips('请先选择一个客户在继续！', 2);
    }
  };

  const onSimpleMission = () => {
    console.log(' onSimpleMission ： ', current, props);
    const indexs = current + 1;
    setCurrent(indexs);
    setSimpleMission(true);
    setFormKey(formKey + 1);
    props.propsForm.setFieldsValue(formInit);
  };

  const onFieldChange = v => {
    console.log(' onFieldChange ： ', v);
  };

  const prev = () => {
    console.log(' prev ： ', current);

    if (current > 0) {
      setCurrent(current - 1);
      setSimpleMission(false);
      setFormKey(formKey + 1);
    }
  };

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
      <Button className={'m-r-10 '} type="primary" onClick={next}>
        下一步
      </Button>
      <Button className={'m-r-10 '} type="primary" onClick={onSimpleMission}>
        无户号填报
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

  const onSearchChange = e => {
    console.log(' onSearchChange   e,   ： ', e, e.target.value);
    // return () => {
    //   console.log(' ssssssssssssss ： ',    )//
    // }
    return debounce(props.onChange, 1500);
  };

  const houseNotable = (
    <>
      <Input
        // onChange={props.onChange}
        onChange={onSearchChange}
        onPressEnter={props.onChange}
        ph={'关键字回车搜索'}
        defaultValue={props.tableProps?.searchInfo?.keyword}
      ></Input>
      <MissionsHouseNoTable {...props.tableProps}></MissionsHouseNoTable>
    </>
  );

  console.log(' missionsManage SmartForm props ： ', props, formKey, formInit);

  const MissionsClientFormCom = MissionsClientForm;
  // const MissionsClientFormCom = simpleMission && !isDetail ? MissionsSimpleClientForm : MissionsClientForm
  // const MissionsClientFormCom = simpleMission && !isDetail ? MissionsSimpleClientForm : Object.keys(props.clientItem).length === 0 ? MissionsClientForm

  return (
    <div className={' missionsManageForm '}>
      {!isDetail && stepCom}
      <div className="missionsManageFormWrapper">
        <div className="left f1" key={formKey}>
          {/* {current == 0 ? props.houseNotable : <SmartForm config={config} {...props}></SmartForm>} */}
          {current == 0 && !isDetail && !isEdit ? (
            houseNotable
          ) : (
            <SmartForm
              config={config}
              {...props}
              init={
                simpleMission
                  ? {
                      repair_time: moment(),
                    }
                  : {
                      repair_time: moment(),
                      ...props.init,
                    }
              }
              // init={{}}
              // key={props.init?.contact}
              // key={props.init}
              // key={Math.random()}
            ></SmartForm>
          )}
        </div>
        {/* {!isDetail && } */}
        {!simpleMission && (
          <div className="right f1">
            {/* {
            Object.keys(props.clientItem).length > 0 ? <MissionsClientForm key={props.clientItem?.id} init={props.clientItem} ></MissionsClientForm> : null
          } */}
            <MissionsClientFormCom
              key={props.clientItem?.id}
              // init={props.clientItem}
              init={
                simpleMission && !isDetail && !isEdit ? {} : props.clientItem
              }
              showFormModal={showFormModal}
              setContacter={setContacter}
            ></MissionsClientFormCom>
            {/* {props.missionsClientForm} */}
          </div>
        )}
      </div>
      {!isDetail && !isEdit && footerCom}

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
