import ArticleList from '../../../components/Board/ArticleList';
import Comment from '../../../components/Board/Comment';
import CustomizedBorderContainer from '../../../components/common/CustomizedBorderContainer';
import ArticleHeader from '../../../components/Board/ArticleHeader';
import ArticleComment from '../../../components/Board/ArticleComment';

import theme from '../../../styles/theme';
import * as s from './style';

import Waves from '../../../assets/images/record/waves.svg';

import useGetArticle from '../../../hooks/api/useGetArticle';

import useMemberStore from '../../../stores/useMemberStore';

interface ArticlePageProps {
  articleId: number;
}

const ArticlePageFetch = ({ articleId }: ArticlePageProps) => {
  const { data } = useGetArticle(articleId);

  const { memberId } = useMemberStore();

  return (
    <s.Container>
      <ArticleHeader
        title={data.title}
        articleId={data.postId}
        isAuthor={data.writerId === memberId}
      />
      <ArticleList.Item
        id={data.postId}
        images={data.mediaUrls}
        description={data.content}
        writer={data.writerNickname}
        createdAt={data.createdAt}
      />
      <Comment.Write postId={articleId} />
      <s.CommentList>
        <CustomizedBorderContainer
          backgroundColor={theme.color.primary[100]}
          border={Waves}
          borderHeight="24px"
        >
          <ArticleComment postId={data.postId} />
        </CustomizedBorderContainer>
      </s.CommentList>
    </s.Container>
  );
};

export default ArticlePageFetch;
