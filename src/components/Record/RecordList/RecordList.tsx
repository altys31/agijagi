import { ReactNode } from 'react';

import CustomizedBorderContainer from '../../common/CustomizedBorderContainer';

import theme from '../../../styles/theme';

import Waves from '../../../assets/images/record/waves.svg';

interface RecordListProps {
  children?: ReactNode;
}

const RecordList = ({ children }: RecordListProps) => {
  return (
    <CustomizedBorderContainer
      backgroundColor={theme.color.primary[50]}
      border={Waves}
      borderHeight="24px"
    >
      {children}
    </CustomizedBorderContainer>
  );
};

export default RecordList;
