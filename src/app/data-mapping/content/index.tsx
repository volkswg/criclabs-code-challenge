'use client';
import React from 'react';
import { Button, Menu, MenuProps } from 'antd';
import FilterIcon from '../../../../public/static/filter-icon.svg';
import ExportIcon from '../../../../public/static/export-icon.svg';
import ImportIcon from '../../../../public/static/import-icon.svg';
import NewDataIcon from '../../../../public/static/new-data-icon.svg';
import DataMappingIcon from '../../../../public/static/sub-menu-icon/data-mapping-icon.svg';
import CollectionSrcIcon from '../../../../public/static/sub-menu-icon/collection-src-icon.svg';
import EditIcon from '../../../../public/static/edit-icon.svg';
import VisualizeIcon from '../../../../public/static/visusalize-icon.svg';
import DisplayDataTable from './display-data-table';
import style from './data-mapping.module.css';


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
          <Button icon={<EditIcon />}>Edit</Button>
          <Button icon={<VisualizeIcon />}>Visualize</Button>
        </div>
        <div className={style.DataTableContainer}>
          <DisplayDataTable />
        </div>
      </div>
    </>
  );
};

export default DataMappingContent;
