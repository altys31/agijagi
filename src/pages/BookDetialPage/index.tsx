import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import BookItem from '../../components/book/BookItem';
import StoryBook from '../../components/book/StoryBook';
import Logo7 from '../../assets/images/logo7.png';
import { getStoryBook, StoryBookDetail } from '../../apis/book';
import Button from '../../components/common/Button';
import { useQuery } from '@tanstack/react-query';
import useChildStore from '../../stores/useChlidStore';
import { BookCoverImg } from '../../components/book/BookCoverImage';
import theme from '../../styles/theme';
import useModal from '../../hooks/useModal';
import BookDeleteModal from '../../components/book/BookDeleteModal';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  @media (min-width: 700px) {
    flex-direction: row; /* 가로 모드일 때 가로 정렬 */
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 10px 10px 30px;

  @media (min-width: 700px) {
    position: fixed;
    width: 38%;
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

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 700px) {
    padding-top: 40px;
    margin-top: 80px;
    padding-left: 40px;
  }
`;

const StoryBookWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 52%;
  box-sizing: border-box;

  @media (min-width: 700px) {
    width: 70%;
    height: 100vh;
    padding-top: 30px;
    padding-left: 30px;
  }
`;

const BookDetail = () => {
  const navigate = useNavigate();
  const modal = useModal();
  const location = useLocation();
  const storyId = location.state.storyId;
  const [selectedBook, setSelectedBook] = useState<StoryBookDetail | null>(
    null
  );
  const [coverImgIndex, setCoverImgIndex] = useState<number>(0);

  const { childId } = useChildStore();

  const storyBookQuery = useQuery({
    queryKey: ['storybook', storyId],
    queryFn: () => getStoryBook(storyId),
  });

  useEffect(() => {
    if (storyBookQuery.data) {
      setSelectedBook(storyBookQuery.data?.data);
    }
    if (selectedBook) {
      setCoverImgIndex(selectedBook?.coverImageIndex);
    }
  });

  if (storyBookQuery.error) {
    return <>동화 데이터를 불러오지 못했습니다.</>;
  }
  if (storyBookQuery.isLoading) {
    return <>로딩중</>;
  }

  // 책 클릭 시 호출되는 함수
  const handleBookSelect = (book: StoryBookDetail | null) => {
    if (!book) {
      navigate('/book');
    }
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

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>
          <TitleImg src={Logo7} />
          <TitleText>{selectedBook?.title}</TitleText>
        </Title>
        <ButtonWrapper>
          <Button size="sm" color="danger" onClick={deleteBook}>
            동화삭제
          </Button>
        </ButtonWrapper>
      </TitleWrapper>

      <CarouselWrapper>
        <BookItem
          image={BookCoverImg[coverImgIndex]}
          book={selectedBook}
          onBookSelect={handleBookSelect}
          isSelected={true}
        />
      </CarouselWrapper>

      <StoryBookWrapper>
        <StoryBook
          book={selectedBook}
          id={storyId}
          onBookSelect={handleBookSelect}
        />
      </StoryBookWrapper>
    </Wrapper>
  );
};

export default BookDetail;
