import styled from '@emotion/styled';
import { BabyResponse } from '../../../types/user';
import { AddFamily } from '../AddFamily/AddFamily';
import { FamilyItem } from '../FamilyItem/FamilyItem';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const FamilyGrid = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  height: 100%;
  row-gap: 2rem;
`;

export interface MyFamilyProps {
  families: BabyResponse[];
}

export const MyFamily = ({ families }: MyFamilyProps) => {
  return (
    <Container>
      <FamilyGrid>
        <>
          {families.map((item, index) => (
            <FamilyItem babyInfo={item} key={index} />
          ))}
          <AddFamily />
        </>
      </FamilyGrid>
    </Container>
  );
};
