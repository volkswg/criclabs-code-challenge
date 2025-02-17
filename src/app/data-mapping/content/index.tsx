'use client';
import React, { useEffect, useState } from 'react';
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
import { DataSubjectTypeType, DepartmentType } from '@/interfaces/data';

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

  // Data Subject Type data
  const [dataSubjectTypeDataList, setDataSubjectTypeDataList] = useState<
    DataSubjectTypeType[]
  >([]);

  // Data Mapping Filter
  const [dataMappingFilter, setDataMappingFilter] =
    useState<DataMappingFilterType>({
      searchText: undefined,
      department: undefined,
      dataSubjectType: undefined,
    });

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
    setDepartmentDataList([
      { id: 1, value: 'Human Resources' },
      { id: 2, value: 'IT/IS' },
      { id: 3, value: 'Admission' },
      { id: 4, value: 'Marketing' },
    ]);
  };

  const fetchDataSubjectTypeHandler = async () => {
    setDataSubjectTypeDataList([
      { id: 1, value: 'Employees' },
      { id: 2, value: 'Faculty Staff' },
      { id: 3, value: 'Students' },
    ]);
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

  return (
    <>
      <div className={style.PageContainer}>
        <div className={style.TitleSection}>
          <span className={style.PageTitle}>Data Mapping</span>
          <div className={style.TitleButtons}>
            <Button
              icon={<FilterIcon width={16} height={16} />}
              onClick={openFilterDrawerHandler}
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
          <DisplayDataTable />
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
