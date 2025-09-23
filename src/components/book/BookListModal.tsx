import { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import BookFilter from './BookFilter';
import Typhography from '../../components/common/Typography';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { StoryBookDetail } from '../../apis/book';
import { BookCoverImg } from './BookCoverImage';

const ModalBox = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding: 10px 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 5px 8px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const FilterContainer = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
  width: 90%;
  border-bottom: 1px solid ${theme.color.greyScale[400]};
  border-width: 1px 60%;
`;

const NoBookText = styled.div`
  margin-top: 30px;
  animation: smoothAppear 0.5s ease-in-out;

  @keyframes smoothAppear {
    from {
      opacity: 0;
      transform: translateY(-5%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const BookList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-top: 10px;
  padding-bottom: 80px;
  height: calc(100% - 50px);
`;

const BookContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 15px;
  padding-bottom: 20px;
  animation: smoothAppear 0.6s ease-in-out;

  @keyframes smoothAppear {
    from {
      opacity: 0;
      transform: translateY(-5%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const BookImage = styled.img`
  min-width: 65px;
  height: 90px;
  border-radius: 10px;
  box-shadow: 7px 7px 15px rgba(0, 0, 0, 0.3);
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TitleLabel = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.color.greyScale[800]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PageLabel = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.color.greyScale[700]};
  margin-top: 15px;
  margin-right: 5px;
`;

const DateLabel = styled.div`
  background-color: ${theme.color.primary[100]};
  color: ${theme.color.greyScale[800]};
  font-weight: ${theme.typography.fontWeight.bold};
  width: 155px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 5px 7px;
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CalendarImg = styled(CalendarIcon)`
  width: 14px;
  margin-right: 5px;
`;

interface DateNavigationProps {
  year: number;
  month: number;
  handlePrev: () => void;
  handleNext: () => void;
}

interface BookListModalProps {
  onBookSelect: (book: StoryBookDetail | null) => void;
  filteredBooks: StoryBookDetail[] | undefined;
  onScroll: (scrollPos: number) => void; // 스크롤 위치 전달하는 콜백 함수
}

type BookListProps = DateNavigationProps & BookListModalProps;

const BookListModal = ({
  year,
  month,
  handlePrev,
  handleNext,
  filteredBooks,
  onScroll,
  onBookSelect,
}: BookListProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (listRef.current) {
        onScroll(listRef.current.scrollTop); // 현재 스크롤 위치를 상위로 전달
      }
    };

    const ref = listRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (ref) {
        ref.removeEventListener('scroll', handleScroll);
      }
    };
  }, [onScroll]);

  return (
    <ModalBox>
      <FilterContainer>
        <BookFilter
          year={year}
          month={month}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      </FilterContainer>

      <BookList ref={listRef}>
        {filteredBooks?.length === 0 ? (
          <NoBookText>
            <Typhography
              size="md"
              weight="regular"
              color="greyScale"
              shade="800"
            >
              이 달에 생성한 동화가 없습니다.
            </Typhography>
          </NoBookText>
        ) : (
          filteredBooks?.map((book) => (
            <BookContainer key={book.id} onClick={() => onBookSelect(book)}>
              <BookImage
                src={BookCoverImg[book.coverImageIndex]}
                alt={book.title}
              />

              <LabelContainer>
                <TitleLabel>{book.title}</TitleLabel>

                <DateLabel>
                  <CalendarImg />
                  <Typhography
                    size="2xs"
                    color="greyScale"
                    shade="700"
                    weight="bold"
                  >
                    {book.startDate} ~ {book.endDate}
                  </Typhography>
                </DateLabel>
                <PageLabel>생성일 : {book.createdAt.slice(0, 10)}</PageLabel>
              </LabelContainer>
            </BookContainer>
          ))
        )}
      </BookList>
    </ModalBox>
  );
};

export default BookListModal;
