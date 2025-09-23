import { FormEvent, useState } from 'react';

import * as s from './style';

import Button from '../../../common/Button';
import Textfield from '../../../common/Textfield';

import useWriteComment from '../../../../hooks/api/useWriteComment';

interface WriteProps {
  postId: number;
}

export const Write = ({ postId }: WriteProps) => {
  const { mutate, isPending } = useWriteComment(postId);

  const [text, setText] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutate({ content: text });

    setText('');
  };

  return (
    <s.Container onSubmit={handleSubmit}>
      <s.Text>
        <Textfield
          label="댓글 내용"
          fullWidth
          inputValue={text}
          setInputValue={setText}
        />
      </s.Text>
      <Button disabled={text === '' || isPending}>작성</Button>
    </s.Container>
  );
};

export default Write;
