import styled from '@emotion/styled';
import bathBaby from '../../../assets/images/babyprofile/bathBaby.png';
import theme from '../../../styles/theme';
import Button from '../../common/Button';
import Typhography from '../../common/Typography';
import { useNavigate } from 'react-router-dom';
import { getReportList, ReportList } from '../../../apis/report';
import { useQuery } from '@tanstack/react-query';
import useChildStore from '../../../stores/useChlidStore';
import moment from 'moment';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const GridCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 90%;
  height: 100%;
  min-height: 160px;
  max-width: 500px;
  max-height: 200px;
  border-radius: 25px;
  background-color: ${theme.color.tertiary[100]};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const PhotoSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 1/2;
  padding-left: 1rem;
`;

export const ContentSection = styled.div`
  grid-column: 2/3;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const DateContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  margin-top: 1rem;
`;

export const SchedualContainer = styled.div`
  width: 90%;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  width: 80%;
  margin-top: 1rem;
`;

export const Photo = styled.img`
  width: 100%;
`;

export const BabyReportCard = () => {
  const navigator = useNavigate();
  const { childId } = useChildStore();

  const {
    data: reportData = [],
    error,
    isLoading,
  } = useQuery<ReportList[]>({
    queryKey: ['reportlist', childId],
    queryFn: async () => {
      return await (
        await getReportList(childId)
      ).data;
    },
  });
  const today = moment();

  const sortedReportData = reportData.sort((a, b) => {
    return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
  });

  return (
    <Container>
      <GridCard>
        <PhotoSection>
          <Photo src={bathBaby} />
        </PhotoSection>
        <ContentSection>
          <SchedualContainer>
            <div>
              {reportData && reportData.length > 0 ? (
                <>
                  <Typhography size="xs" weight="bold">
                    아기의 마일스톤을 체크한지
                  </Typhography>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <Typhography
                      size="xs"
                      color="success"
                      shade="600"
                      weight="bold"
                    >
                      {sortedReportData && sortedReportData.length > 0
                        ? today.diff(
                            moment(sortedReportData[0].createAt, 'YYYY-MM-DD'),
                            'days'
                          )
                        : 0}
                    </Typhography>
                    <Typhography size="xs" weight="bold">
                      일이 지났어요!
                    </Typhography>
                  </div>
                </>
              ) : (
                <Typhography size="xs" weight="bold">
                  아직 성장 분석 보고서를 생성한적이 없어요.
                </Typhography>
              )}
            </div>
            <Typhography size="xs" weight="bold">
              아기의 상태를 체크하여 성장 보고서를 생성해보세요
            </Typhography>
          </SchedualContainer>

          <ButtonContainer>
            <Button
              size="sm"
              fullWidth={true}
              onClick={() => navigator('/milestone')}
            >
              마일스톤 체크하기
            </Button>
          </ButtonContainer>
        </ContentSection>
      </GridCard>
    </Container>
  );
};
