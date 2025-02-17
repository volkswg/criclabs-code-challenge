'use client';
import React, { useState } from 'react';
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
  const [openNewDataDrawer, setOpenNewDataDrawer] = useState<boolean>(false);
  const openNewDataDrawerHandler = () => setOpenNewDataDrawer(true);
  const closeNewDataDrawerHandler = () => setOpenNewDataDrawer(false);
  return (
    <>
      <div className={style.PageContainer}>
        <div className={style.TitleSection}>
          <span className={style.PageTitle}>Data Mapping</span>
          <div className={style.TitleButtons}>
            <Button icon={<FilterIcon width={16} height={16} />}>
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
        <NewDataForm form={newDataForm} />
      </ResponsiveDrawer>
    </>
  );
};

export default DataMappingContent;
