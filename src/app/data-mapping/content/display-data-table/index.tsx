'use client';
import { Button, Table, TableColumnsType } from 'antd';
import React from 'react';

import SorterIcon from '../../../../../public/static/sorter-icon.svg';
import EditIcon from '../../../../../public/static/edit-icon.svg';
import TrashIcon from '../../../../../public/static/trash-icon.svg';
import style from './display-data-table.module.css';

interface DataType {
  key: React.Key;
  title: string;
  description: string;
  department: string;
  dataSubjectTypes: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Title',
    sorter: (a, b) => a.title.localeCompare(b.title),
    sortIcon: () => <SorterIcon />,
    dataIndex: 'title',
    minWidth: 150,
  },
  {
    title: 'Description',
    sorter: (a, b) => a.description.localeCompare(b.description),
    sortIcon: () => <SorterIcon />,
    dataIndex: 'description',
    minWidth: 150,
  },
  {
    title: 'Department',
    sorter: (a, b) => a.department.localeCompare(b.department),
    sortIcon: () => <SorterIcon />,
    dataIndex: 'department',
    minWidth: 150,
  },
  {
    title: 'Data Subject Types',
    sorter: (a, b) => a.dataSubjectTypes.localeCompare(b.dataSubjectTypes),
    sortIcon: () => <SorterIcon />,
    dataIndex: 'dataSubjectTypes',
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

const data: DataType[] = [
  {
    key: 'ti1',
    title: 'title1',
    department: 'depart',
    description: 'description',
    dataSubjectTypes: 'data',
  },
  {
    key: 'ti2',
    title: 'title',
    department: 'depart',
    description: 'description',
    dataSubjectTypes: 'data',
  },
  {
    key: 'ti3',
    title: 'title',
    department: 'depart',
    description: 'description',
    dataSubjectTypes: 'data',
  },
  {
    key: 'ti4',
    title: 'title',
    department: 'depart',
    description: 'description',
    dataSubjectTypes: 'data',
  },
  {
    key: 'ti5',
    title: 'title',
    department: 'depart',
    description: 'description',
    dataSubjectTypes: 'data',
  },
];

const DisplayDataTable = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Table
        style={{ overflowY: 'auto' }}
        tableLayout="auto"
        pagination={false}
        className={style.DataTable}
        columns={columns}
        dataSource={data}
        scroll={{ y: 'calc(100% - 37px)' }}
      />
      <div style={{ alignSelf: 'end', paddingTop: 10 }}>
        Showing 1-4 of 4 results
      </div>
    </div>
  );
};

export default DisplayDataTable;
