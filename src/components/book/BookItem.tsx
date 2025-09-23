import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import Typhography from '../common/Typography';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { StoryBookDetail } from '../../apis/book';

const CardContainer = styled.div`
  perspective: 1000px;
  animation: slide 0.6s ease-in-out;

  @keyframes slide {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0%);
    }
  }
`;

const BookWrapper = styled.div<{ isFlipped: boolean; isLifted: boolean }>`
  width: 145px;
  height: 200px;
  background-color: ${theme.color.primary[50]};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 14px 14px 10px rgba(0, 0, 0, 0.25);
  margin-right: 35px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s ease, box-shadow 0.6s ease;
  transform-style: preserve-3d;
  position: relative;
  transform: ${({ isLifted, isFlipped }) => {
    if (isFlipped) return 'rotateY(180deg) translateY(-10px)';
    if (isLifted) return 'translateY(-10px)';
    return 'none';
  }};

  &:hover {
    box-shadow: 14px 14px 8px rgba(0, 0, 0, 0.3);
  }
`;

const BookBack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow: hidden;
  transform: rotateY(180deg);
`;

const TitleLabel = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.color.greyScale[800]};
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PageLabel = styled.div`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.color.greyScale[700]};
  margin: 10px 0;
`;

const DateLabel = styled.div`
  background-color: #ffecb3;
  color: ${theme.color.greyScale[800]};
  font-weight: ${theme.typography.fontWeight.bold};
  max-width: 155px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  padding: 5px 10px;
  margin-top: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CalendarImg = styled(CalendarIcon)`
  width: 14px;
  margin-right: 5px;
`;

const ImageWrapper = styled.div`
  display: flex;
  margin: 0 auto;
`;

const BookImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const BounceImage = styled.img`
  align-self: center;
  width: 210px;
  height: 210px;
  animation: bounce 2s infinite;

  @media (min-width: 700px) {
    margin-top: 100px;
    margin-left: 30px;
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-10px);
    }
  }
`;

type BookItemProps = {
  book: StoryBookDetail | null;
  image: string;
  onBookSelect: (book: StoryBookDetail | null) => void;
  isSelected: boolean;
};


const BookItem = ({ image, book, onBookSelect, isSelected }: BookItemProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLifted, setIsLifted] = useState(false);

  useEffect(() => {
    if (isSelected) {
      setIsLifted(true);
      setTimeout(() => setIsFlipped(true), 400);
    } else {
      setIsFlipped(false);
      setTimeout(() => setIsLifted(false), 400);
    }
  }, [isSelected]);

  const handleCardClick = (book: StoryBookDetail | null) => {
    if (!isSelected) {
      onBookSelect(book);
    } else {
      onBookSelect(null);
    }
  };

  return (
    <>
      {book ? (
        <CardContainer onClick={() => handleCardClick(book)}>
          <BookWrapper isFlipped={isFlipped} isLifted={isLifted}>
            {isFlipped && isLifted ? (
              <BookBack>
                <TitleLabel>{book.title}</TitleLabel>
                <PageLabel>생성일: {book.createdAt.slice(0,10)}</PageLabel>
                <DateLabel>
                  <CalendarImg />
                  <Typhography
                    size="2xs"
                    color="greyScale"
                    shade="800"
                    weight="bold"
                  >
                    {book.startDate} ~ <br />
                    {book.endDate}
                  </Typhography>
                </DateLabel>
              </BookBack>
            ) : (
              <BookImage src={image} alt="Book Cover" />
            )}
          </BookWrapper>
        </CardContainer>
      ) : (
        <ImageWrapper>
          <BounceImage src={image} alt="No Book" />
        </ImageWrapper>
      )}
    </>
  );
};

export default BookItem;
