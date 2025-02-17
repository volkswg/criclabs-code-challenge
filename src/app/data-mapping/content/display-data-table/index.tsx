'use client';
import { Button, Table, TableColumnsType } from 'antd';
import React from 'react';

import SorterIcon from '../../../../../public/static/sorter-icon.svg';
import EditIcon from '../../../../../public/static/edit-icon.svg';
import TrashIcon from '../../../../../public/static/trash-icon.svg';
import style from './display-data-table.module.css';
import { DataMappingType, DataSubjectTypeType } from '@/interfaces/data';

const columns: TableColumnsType<DataMappingType> = [
  {
    title: 'Title',
    // sorter: (a, b) => a.title.localeCompare(b.title),
    sortIcon: () => <SorterIcon />,
    dataIndex: 'title',
    minWidth: 150,
  },
  {
    title: 'Description',
    // sorter: (a, b) => a.description.localeCompare(b.description),
    sortIcon: () => <SorterIcon />,
    dataIndex: 'description',
    minWidth: 150,
  },
  {
    title: 'Department',
    // sorter: (a, b) => a.department.localeCompare(b.department),
    sortIcon: () => <SorterIcon />,
    dataIndex: ['department', 'value'],
    minWidth: 150,
  },
  {
    title: 'Data Subject Types',
    // sorter: (a, b) => a.dataSubjectTypes.localeCompare(b.dataSubjectTypes),
    sortIcon: () => <SorterIcon />,
    dataIndex: 'dataSubjectType',
    render: (data: DataSubjectTypeType[]) =>
      data.map((e) => e.value).join(', '),
    minWidth: 150,
  },
  {
    title: '',
    render: () => {
      return (
        <>
          <Button type="text">
            <EditIcon />
          </Button>
          <Button type="text">
            <TrashIcon color="red" />
          </Button>
        </>
      );
    },
  },
];

interface DisplayDataTalbeProps {
  isLoading?: boolean;
  dataMappingData: {
    count: number;
    page: number;
    pageSize: number;
    data: DataMappingType[];
  };
}

const DisplayDataTable = ({
  isLoading = false,
  dataMappingData: { data = [], count, page, pageSize },
}: DisplayDataTalbeProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Table
        loading={isLoading}
        tableLayout="auto"
        pagination={false}
        className={style.DataTable}
        columns={columns}
        dataSource={data}
        scroll={{ y: 'calc(100% - 37px)' }}
        rowKey={'id'}
      />
      <div style={{ alignSelf: 'end', paddingTop: 10 }}>
        Showing {(page - 1) * pageSize + 1}-{data.length} of {count} results
      </div>
    </div>
  );
};

export default DisplayDataTable;
