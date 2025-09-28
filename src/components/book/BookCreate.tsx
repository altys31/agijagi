import styled from '@emotion/styled';
import Typhography from '../common/Typography';
import theme from '../../styles/theme';
import Textfield from '../common/Textfield';
import Logo7 from '../../assets/images/logo7.png';
import Button from '../common/Button';
import { BookCoverImg } from './BookCoverImage';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { postStoryBook, StoryBook } from '../../apis/book';
import useChildStore from '../../stores/useChlidStore';
import BookLoading from '../../components/book/BookLoading';
import { CalendarIcon } from '@heroicons/react/24/outline';
import useModal from '../../hooks/useModal';
import FullCalendar from '../common/FullCalendar';
import moment from 'moment';
import { DiaryResponse } from '../../types/diary';
import { getAllDiaries } from '../../apis/diaryApi';
import videoIcon from '../../assets/images/diary/videoIcon.jpeg';
import useDialog from '../../hooks/useDialog';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 20px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  align-items: center;
  padding: 0px 10px 10px;
  margin: 0 auto;
`;

const Title = styled.div`
  display: flex;
  align-items: flex-end;
`;

const TitleImg = styled.img`
  width: 40px;
  height: 35px;
  margin-right: 10px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 60px);
  max-width: 470px;
  gap: 20px;
  background-color: ${theme.color.primary[50]};
  border-radius: 20px;
  padding: 20px 30px 30px;
  margin: 15px auto;
`;

const PeriodField = styled.div`
  display: flex;
  flex-direction: column;
  width: 204px;
  margin-top: 10px;
  gap: 30px;

  @media (min-width: 530px) {
    /* display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 30px; */
  }
`;

const PeriodLabel = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  position: relative;
`;

const PeriodText = styled.label`
  position: absolute;
  z-index: 1;
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.color.primary[800]};
  left: 5%;
  top: 10%;
`;

const Calendar = styled(CalendarIcon)`
  width: 22px;
  color: ${theme.color.primary[900]};
  cursor: pointer;
  position: absolute;
  top: 65%;
  right: 5%;
  transform: translateY(-50%);
`;

const ModalBackground = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: ${theme.color.primary[50]};
  margin: 1rem;
  padding: 2.5rem 2rem 2rem 2rem;
  border-radius: 0.5rem;
`;

const CoverWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 30px);
  max-width: 500px;
  padding-top: 20px;
  padding-left: 30px;
  padding-bottom: 20px;
  background-color: ${theme.color.primary[50]};
  border-radius: 20px;
  margin: 10px auto;
`;

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 500px;
  margin-right: 20px;
  height: 30px;
`;

const Carousel = styled.div`
  overflow-x: auto;
  display: flex;
  width: 100%;
  max-width: 500px;
  padding: 15px 0 20px;
  scroll-behavior: smooth;
  margin: 0 auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CoverContainer = styled.div<{ hasAnimation: boolean }>`
  display: flex;
  perspective: 1000px;
  animation: ${({ hasAnimation }) =>
    hasAnimation ? 'slide 0.6s ease-in-out' : 'none'};
  width: 100%;

  @keyframes slide {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0%);
    }
  }
`;

const CoverImg = styled.div<{ isSelected: boolean }>`
  width: 120px;
  height: 170px;
  background-color: ${theme.color.primary[50]};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 14px 14px 10px rgba(0, 0, 0, 0.2);
  margin-right: 30px;
  cursor: pointer;
  display: ${({ isSelected }) => (isSelected ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  transition: transform 0.5s ease, box-shadow 0.6s ease;
  transform-style: preserve-3d;
  position: relative;

  &:hover {
    box-shadow: 14px 14px 8px rgba(0, 0, 0, 0.3);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  max-width: 500px;
  width: 100%;
  margin: 10px auto;
  padding-bottom: 20px;
`;

const BookCreate = () => {
  const navigate = useNavigate();
  const modal = useModal();
  const dialog = useDialog();
  const [title, setTitle] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [coverImageIndex, setCoverImageIndex] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { childId } = useChildStore();

  const { data: diaries = [] } = useQuery<DiaryResponse[]>({
    queryKey: ['diaries', childId],
    queryFn: () => {
      return getAllDiaries(childId);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: postStoryBook,
    onSuccess: (data) => {
      setTimeout(() => {
        navigate(`/book/${data.data.id}`, { state: { storyId: data.data.id } });
      }, 300);
    },
    onError: (error) => {
      dialog.alert('msw 환경에서는 동화 생성이 불가합니다.');
    },
  });

  const selectedCover = coverImageIndex ? BookCoverImg[coverImageIndex] : null;

  const goBack = () => {
    navigate('/book');
  };

  const handleImageClick = (index: number) => {
    setCoverImageIndex(index);
  };

  const handleResetClick = () => {
    setCoverImageIndex(10);
  };

  const createStoryBook = () => {
    setIsLoading(true);

    setTimeout(() => {
      const storybookData = {
        childId,
        title,
        startDate,
        endDate,
        coverImageIndex,
      };

      mutate(storybookData);
    }, 4000);
  };

  const handleStartDate = (value: Date) => {
    const formattedDate = moment(value).format('YYYY-MM-DD');
    setStartDate(formattedDate);
    modal.pop();
  };

  const handleStartCalendar = () => {
    modal.push({
      children: (
        <ModalBackground>
          <FullCalendar
            onClickDay={handleStartDate}
            maxDate={moment().toDate()}
            tileContent={({ date, view }: { date: Date; view: string }) => {
              const formattedDate = moment(date).format('YYYY-MM-DD');
              const matchedDate = diaries.find(
                (item) =>
                  moment(item.wroteAt).format('YYYY-MM-DD') === formattedDate
              );
              if (
                view === 'month' &&
                matchedDate &&
                matchedDate.mediaUrls.length > 0
              ) {
                return (
                  <img
                    src={
                      matchedDate.mediaTypes[0] === 'image'
                        ? matchedDate.mediaUrls[0]
                        : videoIcon
                    }
                    alt="day-image"
                    style={{ width: '100%', height: '100%' }}
                  />
                );
              }
              return null;
            }}
          ></FullCalendar>
        </ModalBackground>
      ),
    });
  };

  const handleEndDate = (value: Date) => {
    const formattedDate = moment(value).format('YYYY-MM-DD');
    setEndDate(formattedDate);
    modal.pop();
  };

  const handleEndCalendar = () => {
    modal.push({
      children: (
        <ModalBackground>
          <FullCalendar
            onClickDay={handleEndDate}
            maxDate={moment().toDate()}
            tileContent={({ date, view }: { date: Date; view: string }) => {
              const formattedDate = moment(date).format('YYYY-MM-DD');
              const matchedDate = diaries.find(
                (item) =>
                  moment(item.wroteAt).format('YYYY-MM-DD') === formattedDate
              );
              if (
                view === 'month' &&
                matchedDate &&
                matchedDate.mediaUrls.length > 0
              ) {
                return (
                  <img
                    src={
                      matchedDate.mediaTypes[0] === 'image'
                        ? matchedDate.mediaUrls[0]
                        : videoIcon
                    }
                    alt="day-image"
                    style={{ width: '100%', height: '100%' }}
                  />
                );
              }
              return null;
            }}
          ></FullCalendar>
        </ModalBackground>
      ),
    });
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>
          <TitleImg src={Logo7} />
          <Typhography size="lg" weight="bold" color="greyScale" shade="900">
            동화 생성
          </Typhography>
        </Title>
        <Button size="sm" color="secondary" onClick={goBack}>
          목록보기
        </Button>
      </TitleWrapper>

      {isLoading ? (
        <LoadingWrapper>
          <BookLoading />
        </LoadingWrapper>
      ) : (
        <>
          <InputWrapper>
            <Typhography size="md" weight="bold" color="greyScale" shade="800">
              동화 정보
            </Typhography>
            <Textfield
              label="제목"
              size="md"
              color="tertiary"
              isColoredLabel={true}
              inputValue={title}
              setInputValue={setTitle}
              helpText={'*필수사항'}
            />
            <PeriodField>
              <PeriodLabel>
                <PeriodText>시작일</PeriodText>
                <Textfield
                  label=""
                  size="md"
                  color="primary"
                  isColoredLabel={true}
                  inputValue={startDate}
                  setInputValue={setStartDate}
                  helpText={'*필수사항'}
                />
                <Calendar onClick={handleStartCalendar} />
              </PeriodLabel>

              <PeriodLabel>
                <PeriodText>종료일</PeriodText>
                <Textfield
                  label=""
                  size="md"
                  color="primary"
                  isColoredLabel={true}
                  inputValue={endDate}
                  setInputValue={setEndDate}
                  helpText={'*필수사항'}
                />
                <Calendar onClick={handleEndCalendar} />
              </PeriodLabel>
            </PeriodField>
          </InputWrapper>

          <CoverWrapper>
            <SelectContainer>
              <Typhography
                size="md"
                weight="bold"
                color="greyScale"
                shade="800"
              >
                표지 선택
              </Typhography>
              <Typhography size="xs" color="greyScale" shade="700">
                *필수사항
              </Typhography>
              {coverImageIndex !== 10 && (
                <Button size="sm" onClick={handleResetClick}>
                  다시 선택
                </Button>
              )}
            </SelectContainer>

            {selectedCover ? (
              <Carousel>
                <CoverContainer hasAnimation={false}>
                  <CoverImg isSelected={true}>
                    <Image src={selectedCover} />
                  </CoverImg>
                </CoverContainer>
              </Carousel>
            ) : (
              <Carousel>
                {BookCoverImg.map((cover, index) => (
                  <CoverContainer
                    key={cover}
                    onClick={() => handleImageClick(index)}
                    hasAnimation={true}
                  >
                    <CoverImg
                      isSelected={
                        coverImageIndex === 10 || coverImageIndex === index
                      }
                    >
                      <Image src={cover} />
                    </CoverImg>
                  </CoverContainer>
                ))}
              </Carousel>
            )}
          </CoverWrapper>

          <ButtonWrapper>
            <Button size="md" onClick={createStoryBook} disabled={isPending}>
              생성하기
            </Button>
          </ButtonWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default BookCreate;
