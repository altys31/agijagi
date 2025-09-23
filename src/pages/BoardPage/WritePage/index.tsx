import { FormEvent, useRef } from 'react';

import * as s from './style';

import { useNavigate } from 'react-router-dom';

import AppBar from '../../../components/common/AppBar';
import Button from '../../../components/common/Button';
import IconButton from '../../../components/common/IconButton';
import ImageUploader from '../../../components/common/ImageUploader';

import XMarkIcon from '@heroicons/react/16/solid/XMarkIcon';

import useWritePost from '../../../hooks/api/useWritePost';
import useDialog from '../../../hooks/useDialog';

const WritePage = () => {
  const navigate = useNavigate();

  const { alert } = useDialog();

  const { mutate, isPending } = useWritePost();

  const filesRef = useRef<File[]>([]);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleWriteClick = () => {
    if (!formRef.current) {
      return;
    }

    const data = new FormData(formRef.current);

    if (data.get('title') === '' || data.get('content') === '') {
      alert('제목 또는 내용을 입력해 주세요.');
      return;
    }

    data.delete('mediaList');

    for (const file of filesRef.current) {
      data.append('mediaList', file);
    }

    mutate({ data });
  };

  const handleChange = (files: File[]) => {
    filesRef.current = files;
  };

  return (
    <s.Container>
      <AppBar>
        <IconButton onClick={() => navigate(-1)}>
          <XMarkIcon />
        </IconButton>
        <AppBar.Title>글쓰기</AppBar.Title>
        <Button
          color="success"
          size="sm"
          disabled={isPending}
          onClick={handleWriteClick}
        >
          작성
        </Button>
      </AppBar>
      <s.Main
        action="/home/uploadfiles"
        method="post"
        encType="multipart/form-data"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">제목</label>
        <s.Title type="text" id="title" name="title" />
        <label htmlFor="content">내용</label>
        <s.Body id="content" name="content" />
        <ImageUploader
          name="mediaList"
          maxFileCount={5}
          onChange={handleChange}
        />
      </s.Main>
    </s.Container>
  );
};

export default WritePage;
