import useGetArticleList from '../../../hooks/api/useGetArticleList';

import CustomizedBorderContainer from '../../common/CustomizedBorderContainer';

import * as s from './style';
import theme from '../../../styles/theme';

import ArticleList from '../ArticleList';

import Waves from '../../../assets/images/record/waves.svg';
import useModal from '../../../hooks/useModal';
import ArticlePage from '../../../pages/BoardPage/ArticlePage';

const RecentArticleList = () => {
  const data = useGetArticleList();

  const modal = useModal();

  return (
    <ArticleList>
      {!data.data.content.length ? (
        <ArticleList.Empty />
      ) : (
        data.data.content.map((item, index) => (
          <s.ArticleListItem key={index}>
            <CustomizedBorderContainer
              backgroundColor={theme.color.primary[index % 2 ? 100 : 300]}
              border={Waves}
              borderHeight="24px"
            >
              <ArticleList.Item
                key={item.postId}
                title={item.title}
                description={item.content}
                id={item.postId}
                writer={item.writerNickname}
                images={item.mediaUrls}
                createdAt={item.createdAt}
                onClick={() =>
                  modal.push({
                    children: <ArticlePage articleId={item.postId} />,
                  })
                }
              />
            </CustomizedBorderContainer>
          </s.ArticleListItem>
        ))
      )}
    </ArticleList>
  );
};

export default RecentArticleList;
