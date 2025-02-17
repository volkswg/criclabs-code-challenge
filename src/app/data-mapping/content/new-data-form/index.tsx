'use client';
import React from 'react';
import axios from 'axios';
import { Form, FormInstance, Input, Select } from 'antd';
import { DataSubjectTypeType, DepartmentType } from '@/interfaces/data';
import style from './new-data-form.module.css';

interface NewDataFormProps {
  form: FormInstance;
  departmentDataList: DepartmentType[];
  dataSubjectTypeDataList: DataSubjectTypeType[];
  setLoading?: (isLoading: boolean) => void;
  onSuccess?: () => void;
  onFail?: () => void;
}

type FieldType = {
  title: string;
  description?: string;
  department: string;
  dataSubjectType?: string;
};

// type ErrorResponseType = {
//   message: string;
// };

const NewDataForm = ({
  form,
  departmentDataList = [],
  dataSubjectTypeDataList = [],
  setLoading = () => {},
  onSuccess = () => {},
  onFail = () => {},
}: NewDataFormProps) => {
  const onFinishHandler = async (values: FieldType) => {
    setLoading(true);
    try {
      await axios.post('/api/data/v1/data-mapping', values);
      onSuccess();
    } catch (err) {
      onFail();
      console.log(err);
    } finally {
      setLoading(false);
    }

  };
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinishHandler}
      className={style.NewDataForm}
    >
      <Form.Item<FieldType>
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Title is required.' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType> label="Description (Optional)" name="description">
        <Input.TextArea style={{ resize: 'none' }} />
      </Form.Item>
      <Form.Item<FieldType>
        label="Department"
        name="department"
        rules={[{ required: true, message: 'Department is required.' }]}
      >
        <Select
          placeholder="Select Department"
          options={departmentDataList.map(({ id, value }) => ({
            key: id,
            value: id,
            label: value,
          }))}
        />
      </Form.Item>
      <Form.Item<FieldType>
        label="Data Subject Type (Optional)"
        name="dataSubjectType"
      >
        <Select
          mode="multiple"
          placeholder="Select Data Subject Type"
          options={dataSubjectTypeDataList.map(({ id, value }) => ({
            key: id,
            value: id,
            label: value,
          }))}
        />
      </Form.Item>
    </Form>
  );
};

export default NewDataForm;
