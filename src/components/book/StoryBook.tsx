import React, { useCallback, useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import styled from '@emotion/styled';
import Button from '../common/Button';
import theme from '../../styles/theme';
import { BookCoverImg } from './BookCoverImage';
import { getStoryBookPages, StoryBookDetail } from '../../apis/book';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

const BookWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 45vh;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 700px) {
    margin: 0 auto;
    width: calc(var(--vh) * 100);
    height: calc(var(--vh) * 100);
  }
`;

const BackButtonContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const BookContainer = styled.div`
  width: 90%;
  max-width: 450px;
  animation: smoothAppear 0.6s ease-in-out;

  @keyframes smoothAppear {
    from {
      opacity: 0;
      transform: translateY(-10%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Page = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 12px 15px 10px rgba(0, 0, 0, 0.3);
  background-color: ${theme.color.primary[100]};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${theme.typography.fontSize.xs};
`;

const PageImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const PageText = styled.div<{ isFullScreen: boolean }>`
  position: absolute;
  top: 5%;
  border-radius: 10px;
  padding: 5px 8px;
  margin: 0 14px;
  color: ${theme.color.greyScale[900]};
  background-color: rgba(255, 255, 255, 0.4); // 동화 text 배경 투명도 조절 가능
  font-size: ${({ isFullScreen }) =>
    isFullScreen ? theme.typography.fontSize.md : theme.typography.fontSize.sm};
`;

const PageNumber = styled.div`
  position: absolute;
  top: 90%;
  left: 50%;
  color: ${theme.color.greyScale[900]};
  font-size: ${theme.typography.fontSize.xs};

  @media (min-width: 700px) {
    top: 85%;
  }
`;

const PageButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  align-items: center;
`;

const WarningMessage = styled.div`
  position: fixed;
  width: 180px;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${theme.color.danger[500]};
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
  font-size: ${theme.typography.fontSize.sm};
`;

interface BookPageProps {
  number: number;
  img: string;
  children: React.ReactNode;
  isFullScreen: boolean;
}

interface BookCoverProps {
  img: string;
}

interface FlipEvent {
  data: number; // 현재 페이지를 나타내는 숫자
}

const BookPage = React.forwardRef<HTMLDivElement, BookPageProps>(
  (props, ref) => {
    const { isFullScreen } = props;
    return (
      <Page ref={ref}>
        {/* ref required */}
        <PageImg src={props.img} style={{ opacity: '0.7' }}></PageImg>
        <PageText isFullScreen={isFullScreen}>{props.children}</PageText>
        <PageNumber>{props.number}</PageNumber>
      </Page>
    );
  }
);

const BookCover = React.forwardRef<HTMLDivElement, BookCoverProps>(
  (props, ref) => {
    return (
      <Page ref={ref}>
        {/* ref required */}
        <PageImg src={props.img}></PageImg>
      </Page>
    );
  }
);

interface StoryBookProps {
  book: StoryBookDetail | null;
  id: number | undefined;
  onBookSelect: (book: StoryBookDetail | null) => void;
}

interface HTMLDivElementWithVendorPrefix extends HTMLDivElement {
  mozRequestFullscreen: () => void;
  webkitRequestFullscreen: () => void;
}

const StoryBook = ({ book, id, onBookSelect }: StoryBookProps) => {
  const location = useLocation();
  const storyId = id || location.state.storyId;
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [warning, setWarning] = useState<string>('');

  const storyBookPagesQuery = useQuery({
    queryKey: ['storybookpages', storyId],
    queryFn: () => getStoryBookPages(storyId),
  });

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (document.fullscreenElement) {
        setIsFullScreen(true);
        return;
      }

      setIsFullScreen(false);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, [setIsFullScreen]);

  const totalPages = storyBookPagesQuery.data
    ? storyBookPagesQuery.data?.data.length
    : 6;

  const goBack = () => {
    onBookSelect(null);
  };

  const onFlip = useCallback(
    (e: FlipEvent) => {
      setCurrentPage(e.data);

      // 책이 마지막 페이지를 넘어가면 전체화면 해제
      if (e.data === totalPages + 1) {
        if (document.fullscreenElement) {
          setTimeout(() => document.exitFullscreen(), 1000);
        }
      }
    },
    [totalPages]
  );

  // @ts-ignore
  const mybook = useRef<HTMLFlipBook | null>(book);
  const bookContainer = useRef<HTMLDivElement>(null);

  if (storyBookPagesQuery.error) {
    return <>동화 페이지 데이터를 불러오지 못했습니다.</>;
  }
  if (storyBookPagesQuery.isLoading) {
    return <>페이지 로딩중</>;
  }

  const toggleFullscreen = () => {
    if (!bookContainer.current) {
      return;
    }

    if (bookContainer.current.requestFullscreen) {
      bookContainer.current.requestFullscreen();
    } else if (
      (bookContainer.current as HTMLDivElementWithVendorPrefix)
        .mozRequestFullscreen
    ) {
      (
        bookContainer.current as HTMLDivElementWithVendorPrefix
      ).mozRequestFullscreen();
    } else if (
      (bookContainer.current as HTMLDivElementWithVendorPrefix)
        .webkitRequestFullscreen
    ) {
      (
        bookContainer.current as HTMLDivElementWithVendorPrefix
      ).webkitRequestFullscreen();
    }

    if (window.screen.orientation && window.screen.orientation.lock) {
      window.screen.orientation.lock('landscape').catch((error) => {
        console.error(error);
      });
    } else {
      setWarning('이 브라우저는 전체화면 보기를 지원하지 않습니다.');
      setTimeout(() => setWarning(''), 3000);
    }
  };

  return (
    <BookWrapper>
      {book ? (
        <>
          <BackButtonContainer>
            <Button color="secondary" size="sm" onClick={goBack}>
              목록보기
            </Button>
            <Button color="secondary" size="sm" onClick={toggleFullscreen}>
              전체화면
            </Button>
          </BackButtonContainer>

          <BookContainer ref={bookContainer}>
            {/* @ts-ignore */}
            <HTMLFlipBook
              ref={mybook}
              size={'stretch'}
              width={isFullScreen ? 740 : 360}
              height={isFullScreen ? 720 : 500}
              drawShadow={false}
              usePortrait={true}
              showCover={true}
              onFlip={onFlip}
              key={isFullScreen ? 'landscape' : 'portrait'}
            >
              <BookCover img={BookCoverImg[book.coverImageIndex]}></BookCover>
              {storyBookPagesQuery.data?.data.map((page, index) => (
                <BookPage
                  key={index}
                  number={page.pageNumber}
                  img={page.storyPageImageUrl}
                  isFullScreen={isFullScreen}
                >
                  {page.content}
                </BookPage>
              ))}
              <BookCover img={BookCoverImg[book.coverImageIndex]}></BookCover>
            </HTMLFlipBook>
          </BookContainer>

          <PageButtonWrapper>
            <Button
              size="sm"
              color="primary"
              onClick={() => mybook.current?.pageFlip().flipPrev()}
            >
              {'<'}
            </Button>

            <Button
              size="sm"
              color="primary"
              onClick={() => mybook.current?.pageFlip().flipNext()}
            >
              {'>'}
            </Button>
          </PageButtonWrapper>

          {warning && <WarningMessage>{warning}</WarningMessage>}
        </>
      ) : (
        ''
      )}
    </BookWrapper>
  );
};

export default StoryBook;
