import styled from '@emotion/styled';
import theme from '../../../styles/theme';
import PlusCircle from '@heroicons/react/24/outline/PlusCircleIcon';
import { MemberResponse } from '../../../types/user';
import defaultImg from '../../../assets/images/adult.png';
import { useState } from 'react';
import Button from '../../common/Button';
import { useNavigate } from 'react-router-dom';
import Typhography from '../../common/Typography';
import { deleteUserImage, editUserImage } from '../../../apis/userApi';
import { error } from 'console';
import useModal from '../../../hooks/useModal';

export const ModalBackground = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70vw;
  height: auto;
  gap: 3rem;
  background-color: ${theme.color.primary[50]};
  padding: 2rem;
  border-radius: 0.5rem;
`;

export const ProfileCircleWrapper = styled.label`
  display: flex;
  position: relative;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  border: 2px solid ${theme.color.greyScale[400]};
  background-color: ${theme.color.greyScale[200]};
`;

export const AddIconWrapper = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  left: 80%;
  top: 7%;
`;

export const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
`;

export const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const InvisibleInput = styled.input`
  display: none;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export interface EditProfileImageProps {
  handleRender: () => void;
}
export const EditProfileImage = ({ handleRender }: EditProfileImageProps) => {
  const [uploadImg, setUploadImg] = useState<File | null>(null);
  const navigator = useNavigate();
  const modal = useModal();
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadImg(file);
    }
  };

  const submitEditImage = () => {
    const newImage = {
      image: uploadImg,
    };
    editUserImage(newImage)
      .then((response) => {
        handleRender();
        modal.pop();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const submitDeleteImage = () => {
    deleteUserImage()
      .then((response) => {
        handleRender();
        modal.pop();
      })
      .catch((error) => {
        modal.pop();
        console.error(error);
      });
  };

  return (
    <ModalBackground>
      <TitleWrapper>
        <Typhography size="6xl" weight="bold">
          프로필 사진 수정
        </Typhography>
      </TitleWrapper>
      <ProfileCircleWrapper htmlFor="file">
        <AddIconWrapper>
          <PlusCircle fill="#fff" />
        </AddIconWrapper>
        <ImgWrapper>
          <ProfileImg
            src={uploadImg ? URL.createObjectURL(uploadImg) : defaultImg}
          />
        </ImgWrapper>
        <InvisibleInput
          type="file"
          multiple
          id="file"
          onChange={handleUpload}
        />
      </ProfileCircleWrapper>
      <ButtonWrapper>
        <Button
          size="sm"
          onClick={uploadImg ? submitEditImage : submitDeleteImage}
        >
          수정하기
        </Button>
        <Button
          size="sm"
          color="danger"
          onClick={() => {
            modal.pop();
          }}
        >
          닫기
        </Button>
      </ButtonWrapper>
    </ModalBackground>
  );
};
