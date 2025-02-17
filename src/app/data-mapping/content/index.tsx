/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'query-string';
import { Button, Form, Menu, MenuProps } from 'antd';
import FilterIcon from '../../../../public/static/filter-icon.svg';
import ExportIcon from '../../../../public/static/export-icon.svg';
import ImportIcon from '../../../../public/static/import-icon.svg';
import NewDataIcon from '../../../../public/static/new-data-icon.svg';
import DataMappingIcon from '../../../../public/static/sub-menu-icon/data-mapping-icon.svg';
import CollectionSrcIcon from '../../../../public/static/sub-menu-icon/collection-src-icon.svg';
import EditIcon from '../../../../public/static/edit-icon.svg';
import VisualizeIcon from '../../../../public/static/visusalize-icon.svg';
import DisplayDataTable from './display-data-table';
import ResponsiveDrawer from '@/components/responsive-drawer';
import style from './data-mapping.module.css';
import NewDataForm from './new-data-form';
import DataFilterForm from './data-filter-form';
import {
  DataMappingType,
  DataSubjectTypeType,
  DepartmentType,
} from '@/interfaces/data';
import { DataMappingFilterType } from '@/interfaces/filter';

const items: MenuProps['items'] = [
  {
    label: 'Data Mapping',
    key: 'data-mapping-tab',
    icon: <DataMappingIcon />,
    style: { display: 'flex', alignItems: 'center' },
  },
  {
    label: 'Collection Sources',
    key: 'collection-sources-tab',
    icon: <CollectionSrcIcon />,
    disabled: true,
    style: { display: 'flex', alignItems: 'center' },
  },
];

const DataMappingContent = () => {
  const [newDataForm] = Form.useForm();
  const [filterDataForm] = Form.useForm();

  const [openNewDataDrawer, setOpenNewDataDrawer] = useState<boolean>(false);
  const [openFilterDrawer, setOpenFilterDrawer] = useState<boolean>(false);

  // Department data
  const [departmentDataList, setDepartmentDataList] = useState<
    DepartmentType[]
  >([]);
  const [isLoadingDepartmentData, setIsLoadingDepartmentData] =
    useState<boolean>(false);

  // Data Subject Type data
  const [dataSubjectTypeDataList, setDataSubjectTypeDataList] = useState<
    DataSubjectTypeType[]
  >([]);
  const [isLoadingdataSubjectTypeData, setIsLoadingdataSubjectTypeData] =
    useState<boolean>(false);

  // Data Mapping Filter
  const [dataMappingFilter, setDataMappingFilter] =
    useState<DataMappingFilterType>({
      searchText: undefined,
      department: undefined,
      dataSubjectType: undefined,
    });

  // Data Mapping data
  const [dataMappingData, setDataMappingData] = useState<{
    count: number;
    page: number;
    pageSize: number;
    data: DataMappingType[];
  }>({ count: 0, page: 1, pageSize: 1, data: [] });
  const [isLoadingDataMapping, setIsLoadingDataMapping] =
    useState<boolean>(false);

  const [isSendingNewDataMapping, setIsSendingNewDataMapping] =
    useState<boolean>(false);

  const openNewDataDrawerHandler = () => setOpenNewDataDrawer(true);
  const closeNewDataDrawerHandler = () => setOpenNewDataDrawer(false);

  const openFilterDrawerHandler = () => setOpenFilterDrawer(true);
  const closeFilterDrawerHandler = (updateFilterForm: boolean = false) => {
    setOpenFilterDrawer(false);
    // set field to current filter data
    if (updateFilterForm) {
      filterDataForm.setFieldsValue(dataMappingFilter);
    }
  };

  const fetchDepartmentsHandler = async () => {
    setIsLoadingDepartmentData(true);
    const result = await axios.get('/api/data/v1/departments');
    const departmentDataList = result.data.data as DepartmentType[];
    setDepartmentDataList(departmentDataList);
    setIsLoadingDepartmentData(false);
  };

  const fetchDataSubjectTypeHandler = async () => {
    setIsLoadingdataSubjectTypeData(true);
    const result = await axios.get('/api/data/v1/data-subject-types');
    const dataSubjectTypeDataList = result.data.data as DataSubjectTypeType[];
    setDataSubjectTypeDataList(dataSubjectTypeDataList);
    setIsLoadingdataSubjectTypeData(false);
  };

  const fetchDataMappingHandler = async () => {
    setIsLoadingDataMapping(true);
    const endpoint = qs.stringifyUrl(
      {
        url: '/api/data/v1/data-mapping',
        query: dataMappingFilter,
      },
      { arrayFormat: 'bracket' }
    );

    const response = await axios.get(endpoint);
    const resData = response.data;
    const { count, data, page, pageSize } = resData;
    setDataMappingData({
      count,
      data,
      page,
      pageSize,
    });
    setIsLoadingDataMapping(false);
  };

  // filter handler
  const applyFilterHandler = async (filter: DataMappingFilterType) => {
    setDataMappingFilter(filter);
    closeFilterDrawerHandler();
  };
  const resetFilterHandler = async () => {
    setDataMappingFilter({
      searchText: undefined,
      department: undefined,
      dataSubjectType: undefined,
    });
    closeFilterDrawerHandler(true);
    filterDataForm.resetFields();
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchDepartmentsHandler();
      await fetchDataSubjectTypeHandler();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      fetchDataMappingHandler();
    };
    fetchData();
  }, [dataMappingFilter]);

  return (
    <>
      <div className={style.PageContainer}>
        <div className={style.TitleSection}>
          <span className={style.PageTitle}>Data Mapping</span>
          <div className={style.TitleButtons}>
            <Button
              icon={<FilterIcon width={16} height={16} />}
              onClick={openFilterDrawerHandler}
              loading={isLoadingDepartmentData || isLoadingdataSubjectTypeData}
            >
              <span className={style.HideBtnLabel}>Filter</span>
            </Button>
            <Button icon={<ExportIcon width={16} height={16} />}>
              <span className={style.HideBtnLabel}>Export</span>
            </Button>
            <Button icon={<ImportIcon width={16} height={16} />}>
              <span className={style.HideBtnLabel}>Import</span>
            </Button>
            <Button
              type="primary"
              block
              icon={<NewDataIcon width={16} height={16} />}
              onClick={openNewDataDrawerHandler}
            >
              New Data
            </Button>
          </div>
        </div>
        <Menu
          className={style.TabMenuContainer}
          mode="horizontal"
          items={items}
          defaultSelectedKeys={['data-mapping-tab']}
          style={{ lineHeight: '40px' }}
        />
        <div className={style.RowActionButtons}>
          <Button color="primary" variant="outlined" icon={<EditIcon />}>
            Edit
          </Button>
          <Button icon={<VisualizeIcon />}>Visualize</Button>
        </div>
        <div className={style.DataTableContainer}>
          <DisplayDataTable
            dataMappingData={dataMappingData}
            isLoading={isLoadingDataMapping}
          />
        </div>
      </div>
      {/* Drawer Section */}
      <ResponsiveDrawer
        open={openNewDataDrawer}
        onClose={closeNewDataDrawerHandler}
        title={
          <div className={style.NewDataDrawerTitle}>
            <span className={style.TextTitle}>New Data</span>
            <Button
              type="text"
              style={{ marginLeft: 'auto' }}
              onClick={closeNewDataDrawerHandler}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={() => {
                newDataForm.submit();
              }}
              loading={isSendingNewDataMapping}
            >
              Save
            </Button>
          </div>
        }
      >
        <NewDataForm
          form={newDataForm}
          departmentDataList={departmentDataList}
          dataSubjectTypeDataList={dataSubjectTypeDataList}
          setLoading={setIsSendingNewDataMapping}
          onSuccess={() => {
            closeNewDataDrawerHandler();
            fetchDataMappingHandler();
          }}
        />
      </ResponsiveDrawer>
      <ResponsiveDrawer
        open={openFilterDrawer}
        onClose={closeFilterDrawerHandler}
        title={
          <div className={style.FilterDrawerTitle}>
            <span
              className={style.TextTitle}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <FilterIcon /> Filter
            </span>
            <Button
              type="text"
              style={{ marginLeft: 'auto' }}
              onClick={resetFilterHandler}
            >
              Reset
            </Button>
            <Button
              type="primary"
              onClick={() => {
                filterDataForm.submit();
              }}
            >
              Apply Filter
            </Button>
          </div>
        }
        noPadding
      >
        <DataFilterForm
          form={filterDataForm}
          departmentDataList={departmentDataList}
          dataSubjectTypeDataList={dataSubjectTypeDataList}
          onApplyFilter={applyFilterHandler}
        />
      </ResponsiveDrawer>
    </>
  );
};

export default DataMappingContent;
