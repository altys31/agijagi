import useGetComments from '../../../hooks/api/useGetComments';

import useMemberStore from '../../../stores/useMemberStore';

import Comment from '../Comment';

interface ArticleCommentProps {
  postId: number;
}

const ArticleComment = ({ postId }: ArticleCommentProps) => {
  const { data } = useGetComments(postId);

  const { memberId } = useMemberStore();

  return (
    <Comment.List commentCount={data.length}>
      {data.length === 0 ? (
        <Comment.Emtpy />
      ) : (
        data.map((item) => (
          <Comment.List.Item
            key={item.commentId}
            commentId={item.commentId}
            body={item.content}
            createdAt={item.createdAt}
            writer={item.writerNickname}
            postId={postId}
            isAuthor={item.writerId === memberId}
          />
        ))
      )}
    </Comment.List>
  );
};

export default ArticleComment;
