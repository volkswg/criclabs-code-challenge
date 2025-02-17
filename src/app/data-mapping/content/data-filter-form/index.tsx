'use client';
import React from 'react';
import { Form, Checkbox, Flex, Input, FormInstance } from 'antd';
import { DataSubjectTypeType, DepartmentType } from '@/interfaces/data';
import { DataMappingFilterType } from '@/interfaces/filter';
import SearchIcon from '../../../../../public/static/search-icon.svg';
import style from './data-filter-form.module.css';

interface DataFilterFormProps {
  form: FormInstance;
  departmentDataList: DepartmentType[];
  dataSubjectTypeDataList: DataSubjectTypeType[];
  onApplyFilter?: (filters: DataMappingFilterType) => void;
}

type FieldType = {
  searchText: string;
  department: number[];
  dataSubjectType: number[];
};

const DataFilterForm = ({
  form,
  departmentDataList = [],
  dataSubjectTypeDataList = [],
  onApplyFilter = () => {},
}: DataFilterFormProps) => {
  const onFinishHandler = async (values: FieldType) => onApplyFilter(values);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinishHandler}
      requiredMark={false}
      className={style.NewDataForm}
    >
      <Form.Item<FieldType> name="searchText" style={{ marginBottom: 0 }}>
        <Input
          className={style.SearchInput}
          prefix={<SearchIcon color="#00000073" />}
          placeholder={'Search Filter'}
          allowClear
        />
      </Form.Item>
      <div className={style.ContentContainer}>
        <Form.Item<FieldType>
          name="department"
          label={<span className={style.LabelStyle}>DEPARTMENT</span>}
        >
          <Checkbox.Group>
            <Flex vertical gap={12}>
              {departmentDataList.map(({ id, value }) => (
                <Checkbox
                  key={id}
                  value={id}
                  className={style.CheckboxLabelStyle}
                >
                  {value}
                </Checkbox>
              ))}
            </Flex>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item<FieldType>
          name="dataSubjectType"
          label={<span className={style.LabelStyle}>DATA SUBJECT</span>}
        >
          <Checkbox.Group>
            <Flex vertical gap={12}>
              {dataSubjectTypeDataList.map(({ id, value }) => (
                <Checkbox
                  key={id}
                  value={id}
                  className={style.CheckboxLabelStyle}
                >
                  {value}
                </Checkbox>
              ))}
            </Flex>
          </Checkbox.Group>
        </Form.Item>
      </div>
    </Form>
  );
};

export default DataFilterForm;
