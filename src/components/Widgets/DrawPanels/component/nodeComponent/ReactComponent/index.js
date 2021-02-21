import React from 'react';
import { Form } from 'antd';
import ButtonForm from './Button';
import TableForm from './Table';

const Page = props => {
  const { data, onUpdateComponentProps } = props;
  console.log(' propspropspropsprops ： ', props); //

  const [form] = Form.useForm();
  const onFormLayoutChange = (changedValues, allValues) => {
    console.log(
      ' onFormLayoutChange changedValues, allValues,  ： ',
      form,
      props,
      changedValues,
      allValues,
    ); //
    if (props.data.node.name === 'table') {
      // allValues.columns = allValues.key.map((item, index) => ({
      //   title: allValues.title[index] || 'NA',
      //   key: item || 'NA',
      //   dataIndex: item || 'NA'
      // }));
      // const { key, keys, title, dataSource, ...other } = allValues;
      // console.log(' other ： ', other,  )//
      // onUpdateComponentProps(other);
      onUpdateComponentProps({ size: allValues.size });
      return;
    }
    onUpdateComponentProps(allValues);
    console.log(allValues);
  };

  const renderForm = () => {
    switch (data.node.name) {
      case 'button':
        return <ButtonForm data={data.node.data} />;
      case 'table':
        return (
          <TableForm
            getFieldValue={form.getFieldValue}
            form={form}
            data={data.node.data.props}
          />
        );
      default:
        break;
    }
  };

  // const initVal = {
  //   ...data.node.data.props.columns,
  // }

  return (
    <Form
      layout="inline"
      form={form}
      onValuesChange={onFormLayoutChange}
      // initialValues={initVal}
    >
      {renderForm()}
    </Form>
  );
};

export default Page;
