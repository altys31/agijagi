import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import BookItem from '../../components/book/BookItem';
import BookListModal from '../../components/book/BookListModal';
import StoryBook from '../../components/book/StoryBook';
import Typhography from '../../components/common/Typography';
import Logo7 from '../../assets/images/logo7.png';
import Logo2 from '../../assets/images/logo2.png';
import { StoryBookDetail } from '../../apis/book';
import Button from '../../components/common/Button';
import { useQuery } from '@tanstack/react-query';
import { getStoryBookList } from '../../apis/book';
import useChildStore from '../../stores/useChlidStore';
import { BookCoverImg } from '../../components/book/BookCoverImage';
import theme from '../../styles/theme';
import BookDeleteModal from '../../components/book/BookDeleteModal';
import useModal from '../../hooks/useModal';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;

  @media (min-width: 700px) {
    // flex-direction: row; /* 가로 모드일 때 가로 정렬 */
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 10px 10px 30px;

  @media (min-width: 700px) {
    //position: fixed;
    //width: 38%;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TitleImg = styled.img`
  width: 40px;
  height: 35px;
  margin-right: 10px;
`;

const TitleText = styled.div`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.color.greyScale[800]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ButtonWrapper = styled.div`
  flex-shrink: 0;
`;

const CarouselWrapper = styled.div`
  overflow-x: auto;
  display: flex;
  padding-top: 20px;
  padding-bottom: 50px;
  padding-left: 30px;
  scroll-behavior: smooth;
  flex-shrink: 0;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 700px) {
    /* padding-top: 40px;
    margin-top: 80px;
    padding-left: 40px; */
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  padding-top: 20px;
  padding-bottom: 40px;
`;

const ModalWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 54%;
  box-sizing: border-box;
  flex: 1 1 auto;

  @media (min-width: 700px) {
    /* width: 50%;
    max-width: 380px;
    min-width: 380px;
    height: 100vh;
    padding-top: 30px;
    padding-left: 30px;
    margin-left: auto; */
  }
`;

const StoryBookWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  box-sizing: border-box;
  flex: 1 1 auto;

  @media (min-width: 700px) {
    /* width: 70%;
    height: 100vh;
    padding-top: 30px;
    padding-left: 30px; */
  }
`;

const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth() + 1;

const BookComponent = () => {
  const modal = useModal();
  const [year, setYear] = useState(todayYear);
  const [month, setMonth] = useState(todayMonth);
  const [selectedBook, setSelectedBook] = useState<StoryBookDetail | null>(
    null
  );
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { childId } = useChildStore();
  const storyId = selectedBook?.id;

  const { data, error, isLoading } = useQuery({
    queryKey: ['storybooklist', childId],
    queryFn: () => getStoryBookList(childId),
  });

  useEffect(() => {
    if (selectedBook) {
      navigate(`/book`, { state: { storyId: selectedBook.id } });
    }
  }, [selectedBook, navigate]);

  if (error) {
    return <>동화 데이터를 불러오지 못했습니다.</>;
  }
  if (isLoading) {
    return <>로딩중</>;
  }

  // 책 클릭 시 호출되는 함수
  const handleBookSelect = (book: StoryBookDetail | null) => {
    // 책 한권이 선택되면 나머지 책들은 안보이게 함
    if (selectedBook && book && selectedBook.id === book.id) {
      setSelectedBook(null);
    } else {
      setSelectedBook(book);
    }
  };

  const deleteBook = () => {
    modal.push({
      children: (
        <BookDeleteModal
          storyId={storyId}
          onBookSelect={handleBookSelect}
          childId={childId}
        />
      ),
    });
  };

  const goCreateBook = () => {
    navigate('/book-create');
  };

  // 스크롤 위치를 업데이트하는 함수
  const handleListScroll = (scrollPos: number) => {
    if (carouselRef.current) {
      const scrollRatio = 1.7; // 스크롤 비율 조정
      carouselRef.current.scrollLeft = scrollPos * scrollRatio;
    }
  };

  const handlePrev = () => {
    setMonth((prevMonth) => {
      if (prevMonth === 1) {
        setYear((prevYear) => prevYear - 1);
        return 12;
      } else {
        return prevMonth - 1;
      }
    });
  };

  const handleNext = () => {
    setMonth((prevMonth) => {
      if (prevMonth === 12) {
        // 12월이면 다음 해 1월로
        setYear((prevYear) => prevYear + 1);
        return 1;
      } else {
        return prevMonth + 1;
      }
    });
  };

  // 동화책 마지막 날짜의 년과 달을 기준으로 필터링
  const filteredBooks = data?.data.filter((book) => {
    const startDate = new Date(book.endDate); // 문자열을 Date 객체로 변환
    const startMonth = startDate.getMonth() + 1;
    const startYear = startDate.getFullYear();
    return startMonth === month && startYear === year;
  });

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>
          <TitleImg src={Logo7} />
          {selectedBook ? (
            <TitleText>{selectedBook.title}</TitleText>
          ) : (
            <Typhography size="lg" weight="bold" color="greyScale" shade="900">
              Story Book
            </Typhography>
          )}
        </Title>
        <ButtonWrapper>
          {!selectedBook ? (
            <Button size="sm" onClick={goCreateBook}>
              동화생성
            </Button>
          ) : (
            <Button size="sm" color="danger" onClick={deleteBook}>
              동화삭제
            </Button>
          )}
        </ButtonWrapper>
      </TitleWrapper>

      {filteredBooks?.length === 0 ? (
        <ImageWrapper>
          <BookItem
            image={Logo2}
            book={null}
            onBookSelect={handleBookSelect}
            isSelected={false}
          />
        </ImageWrapper>
      ) : (
        <CarouselWrapper ref={carouselRef}>
          {filteredBooks?.map(
            (book) =>
              // 선택된 책이 없으면 모든 책을 보여주고, 선택된 책이 있으면 해당 책만 보여줌
              (selectedBook === null || selectedBook.id === book.id) && (
                <BookItem
                  key={book.id}
                  image={BookCoverImg[book.coverImageIndex]}
                  book={book}
                  onBookSelect={handleBookSelect}
                  isSelected={selectedBook?.id === book.id}
                />
              )
          )}
        </CarouselWrapper>
      )}

      {selectedBook ? (
        <StoryBookWrapper>
          <StoryBook
            book={selectedBook}
            id={selectedBook.id}
            onBookSelect={handleBookSelect}
          />
        </StoryBookWrapper>
      ) : (
        <ModalWrapper>
          <BookListModal
            year={year}
            month={month}
            handleNext={handleNext}
            handlePrev={handlePrev}
            filteredBooks={filteredBooks}
            onScroll={handleListScroll}
            onBookSelect={handleBookSelect}
          />
        </ModalWrapper>
      )}
    </Wrapper>
  );
};

export default BookComponent;
