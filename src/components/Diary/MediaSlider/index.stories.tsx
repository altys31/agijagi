import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import adult from '../../../assets/images/adult.png';
import boy from '../../../assets/images/boy.png';
import girl from '../../../assets/images/girl.png';
import video from '../../../assets/Test.mp4';
import MediaSlider from './index';

const meta = {
  title: 'UI/common/MediaSlider',
  component: MediaSlider,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    fileList: {
      description: '카로셀에 표시할 미디어들',
    },
    isWriteMode: {
      description: '편집모드인지 아닌지',
    },
    handleUpload: {
      description: '미디어 업로드시 작동할 로직',
    },
    handleDelete: {
      description: '미디어 삭제시 작동할 로직',
    },
    isInitialRender: {
      description: '초기렌더링인지 여부 (스크롤 이벤트를 위함)',
    },
  },
} satisfies Meta<typeof MediaSlider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Md: Story = {
  args: {
    fileList: [],
    urlList: [],
    urlType: [],
    handleUpload: (e) => {},
    handleDelete: (e) => {},
    isWriteMode: true,
    isInitialRender: true,
  },
  render: (args) => {
    const [fileList, setFileList] = useState<File[]>([]);
    const [isInitialRender, setIsInitialRender] = useState<boolean>(
      args.isInitialRender
    );

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsInitialRender(false);
      if (e.target.files) {
        const selectedFiles = Array.from(e.target.files);
        setFileList((prevFiles) => [...prevFiles, ...selectedFiles]);
      }
    };

    const handleDelete = (index: number) => {
      const updatedFileList = fileList.filter((_, i) => i !== index);
      setFileList(updatedFileList);
    };

    useEffect(() => {
      const convertToFile = async (imageUrl: string, fileName: string) => {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], fileName, { type: blob.type });
        return file;
      };

      const loadImages = async () => {
        const boyFile = await convertToFile(boy, 'boy.png');
        const girlFile = await convertToFile(girl, 'girl.png');
        const adultFile = await convertToFile(adult, 'adult.png');
        const videoFile = await convertToFile(video, 'Test.mp4');
        setFileList([boyFile, girlFile, adultFile, videoFile]);
      };
      loadImages();
      setIsInitialRender(true);
    }, []);

    return (
      <MediaSlider
        fileList={fileList}
        urlList={[]}
        urlType={[]}
        isInitialRender={isInitialRender}
        isWriteMode={args.isWriteMode}
        handleUpload={handleUpload}
        handleDelete={handleDelete}
      ></MediaSlider>
    );
  },
};
