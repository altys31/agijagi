import { useEffect, useState } from 'react';

import * as s from './style';

import Preview from './Preview';
import Upload from './Uplaod';
import useDialog from '../../../hooks/useDialog';

interface ImageUploaderProps {
  name: string;
  maxFileCount?: number;
  onChange: (fileList: File[]) => void;
}

const ImageUploader = ({
  name,
  maxFileCount = 1,
  onChange,
}: ImageUploaderProps) => {
  const { alert } = useDialog();

  const [fileList, setFileList] = useState<File[]>([]);

  const handleFileChange = (files: FileList) => {
    const file: File[] = [];

    if (fileList.length + files.length > maxFileCount) {
      alert(`최대 ${maxFileCount}개 이미지만 업로드 할 수 있어요.`);
      return;
    }

    for (let i = 0; i < files.length; i++) {
      file.push(files[i]);
    }

    setFileList((fileList) => [...fileList, ...file]);
  };

  const handleRemove = (file: File) => {
    setFileList(fileList.filter((item) => item !== file));
  };

  useEffect(() => {
    onChange(fileList);
  }, [fileList]);

  return (
    <s.Container>
      <s.Preview>
        {fileList.map((file, index) => (
          <Preview
            key={index}
            src={URL.createObjectURL(file)}
            onRemove={() => handleRemove(file)}
          />
        ))}
      </s.Preview>
      <Upload name={name} onChange={handleFileChange} />
    </s.Container>
  );
};

export default ImageUploader;
