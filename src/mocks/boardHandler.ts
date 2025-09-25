import { http, HttpResponse } from "msw";
import { arrayBufferToDataUrl } from "./diaryHandler";
import { ArticleData } from "../apis/board";
import { CommentData } from "../apis/comment";
import boardPic1 from '../assets/board/boardPic1.webp';
import boardPic2 from '../assets/board/boardPic2.webp';

interface mswCommentData extends CommentData { 
  postId: number;
}

let postId = 3;
let commentId = 4;

const boardData : {content: ArticleData[]}= {
  content: [{postId: 2, title: '아기 규현입니다.', content: '이땐 귀여웠는데...', writerId: 2, writerNickname: '양규현', createdAt: new Date().toISOString(), mediaUrls: [boardPic2]
  },{
    postId: 1, title: '저 놀러간 사진 좀 보세요', content: '봤으면 저리가', writerId: 1, writerNickname: '양규현', createdAt: new Date().toISOString(), mediaUrls: [boardPic1] },]
}

const commentData: mswCommentData[] =  [{ commentId: 1, parentCommentId: 2, writerId: 3, writerNickname: '아기자기', 
  content: '무쌩겨써', createdAt: new Date().toISOString(), postId: 1
},
{ commentId: 2, parentCommentId: null, writerId: 2, writerNickname: '여기저기', 
  content: '무쌩겨써222', createdAt: new Date().toISOString(), postId: 1
  }, {
    commentId: 3, parentCommentId: null, writerId: 4, writerNickname: '싸피싸피',
    content: 'ㅠㅠ', createdAt: new Date().toISOString(), postId: 2
}];

// FormData 처리 함수
const handleFormData = async (formData: FormData): Promise<Omit<ArticleData, 'postId'>> => {
  const title = String(formData.get('title') ?? '');
  const content = String(formData.get('content') ?? '');
  const writerId = Number(formData.get('writerId') ?? 1);
  const writerNickname = String(formData.get('writerNickname') ?? '');
  const createdAt = new Date().toISOString();
  const mediaFiles = formData.getAll('mediaList') as File[];
  const mediaUrls: string[] = [];
  for (let i = 0; i < mediaFiles.length; i++) {
    const file = mediaFiles[i];
    if (file instanceof File) {
      const buffer = await file.arrayBuffer();
      const mime = file.type || 'application/octet-stream';
      const dataUrl = arrayBufferToDataUrl(buffer, mime);
      mediaUrls.push(dataUrl);
    }
  }

  return {
    title,
    content,
    writerId,
    writerNickname,
    createdAt,
    mediaUrls
  };
}

export const boardHandler = [
  http.post('https://api.password926.site/posts', async (req) => {
    const formResult = await handleFormData(await req.request.formData());
    const newPost: ArticleData = {
      postId: postId++,
      ...formResult
    };
    boardData.content.unshift(newPost);
    return HttpResponse.json(newPost, { status: 200 });
  }),

  http.get('https://api.password926.site/posts', () => {
    return HttpResponse.json(boardData);
  }),

  http.get('https://api.password926.site/posts/:articleId', (req) => {
    const { articleId } = req.params;
    const post = boardData.content.find((item) => item.postId === Number(articleId));
    if (!post) {
      return HttpResponse.json({ message: 'Post not found' }, { status: 404 });
    }
    return HttpResponse.json(post);
    
  }),

   http.delete('https://api.password926.site/posts/:articleId', (req) => {
    const { articleId } = req.params;
    const index = boardData.content.findIndex((item) => item.postId === Number(articleId));
    if (index !== -1) {
      boardData.content.splice(index, 1);
      return HttpResponse.json({}, { status: 204 });
    }
    return HttpResponse.json({ message: 'Post not found' }, { status: 404 });
  }),

  // 댓글 관련 핸들러
   
  http.get('https://api.password926.site/posts/:articleId/comments', (req) => {
    const { articleId } = req.params;
    const comments = commentData.filter((c) => c.postId === Number(articleId));
    return HttpResponse.json(comments);
  }),

  http.post('https://api.password926.site/posts/:articleId/comments', async (req) => {
    const { articleId } = req.params;
    const body = await (req.request).json() as Omit<CommentData, 'commentId'>;
    const newComment = {
      commentId: commentId++,
      postId: Number(articleId),
      writerId: 1, // 임시
      writerNickname: '정호아빠', // 임시
      content: body.content,
      createdAt: new Date().toISOString(),
      parentCommentId: null,
    };
    commentData.push(newComment);
    return HttpResponse.json(newComment, { status: 200 });
  }),
  
  http.delete('https://api.password926.site/comments/:commentId', (req) => {
    const { commentId } = req.params;
    const index = commentData.findIndex((c) => c.commentId === Number(commentId));
    if (index !== -1) {
      commentData.splice(index, 1);
      return HttpResponse.json({}, { status: 204 });
    }
    return HttpResponse.json({ message: 'Comment not found' }, { status: 404 });
  }),

 

];