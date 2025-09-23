import { useEffect, useRef } from 'react';

import Button from '../../Button';

import * as s from './style';

interface UploadProps {
  name: string;
  onChange: (fileList: FileList) => void;
}

const Upload = ({ name, onChange }: UploadProps) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileRef.current?.click();
  };

  useEffect(() => {
    if (!fileRef.current) {
      return;
    }

    const file = fileRef.current;

    const handleChange = () => {
      if (!fileRef.current || !fileRef.current.files) {
        return;
      }

      onChange(fileRef.current.files);
    };

    file.addEventListener('change', handleChange);

    return () => {
      file.removeEventListener('change', handleChange);
    };
  }, [fileRef, onChange]);

  return (
    <s.Container>
      <Button color="secondary" size="sm" onClick={handleClick}>
        이미지 업로드
      </Button>
      <input
        ref={fileRef}
        type="file"
        name={name}
        accept="image/png, image/jpeg"
        multiple
      />
    </s.Container>
  );
};
export default Upload;
