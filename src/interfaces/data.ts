export type DepartmentType = {
  id: number;
  value: string;
};

export type DataSubjectTypeType = {
  id: number;
  value: string;
};

export type DataMappingType = {
  id: number;
  title: string;
  description: string;
  department: DepartmentType;
  dataSubjectType: DataSubjectTypeType[];
};
