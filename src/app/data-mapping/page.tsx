import { Metadata } from 'next';
import CustomLayout from '@/components/layout/custom-layout';
import DataMappingContent from './content';

export const metadata: Metadata = {
  title: 'Criclabs - Data Mapping',
};

const DataMappingPage = () => {
  return (
    <CustomLayout>
      <DataMappingContent />
    </CustomLayout>
  );
};

export default DataMappingPage;
