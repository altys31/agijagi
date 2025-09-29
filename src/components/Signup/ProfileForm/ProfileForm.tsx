import Button from '../../common/Button';
import Textfield from '../../common/Textfield';
import Typhography from '../../common/Typography';
import defaultImg from '../../../assets/images/adult.png';
import { ValidationState } from '../../common/Textfield/Textfield.types';
import PlusCircle from '@heroicons/react/24/outline/PlusCircleIcon';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../../apis/userApi';
import BackIcon from '@heroicons/react/24/outline/ChevronLeftIcon';
import useModal from '../../../hooks/useModal';
import { ModalBackground } from '../../../pages/Login/style';
import {
  AddIconWrapper,
  BackButton,
  Container,
  ImgWrapper,
  InvisibleInput,
  ProfileCircleWrapper,
  ProfileContainer,
  ProfileImg,
} from './ProfileForm.styles';
import { login } from '../../../apis/authApi';
import useMemberStore from '../../../stores/useMemberStore';

interface ProfileForm {
  email: string;
  password: string;
  isNext: boolean;
  uploadImg: File | null;
  handleNext: () => void;
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValidated: Record<string, boolean>;
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  validationNickname: (e: string) => ValidationState;
}

export const ProfileForm = ({
  email,
  password,
  isNext,
  uploadImg,
  handleNext,
  handleUpload,
  isValidated,
  nickname,
  setNickname,
  validationNickname,
}: ProfileForm) => {
  const width = window.innerWidth;
  const navigator = useNavigate();
  const { memberId, updateMemberId } = useMemberStore();
  const modal = useModal();

  const handleSignup = () => {
    const userInfo = {
      email: email,
      password: password,
      nickname: nickname,
      profileImg: uploadImg,
    };

    const loginRequest = {
      email: email,
      password: password,
    };

    signUp(userInfo)
      .then((response) => {
        login(loginRequest).then(() => {
          localStorage.setItem('memberId', response.data.memberId);
          updateMemberId(Number(response.data.memberId));
          console.log('memberId after signup:', response.data.memberId);
          modal.push({
            children: (
              <ModalBackground>
                <Typhography>회원가입이 완료되었어요!</Typhography>
                <Button onClick={modal.pop}>닫기</Button>
              </ModalBackground>
            ),
            onClose: () => navigator('/welcome'),
          });
        });
      })
      .catch((error) => {
        modal.push({
          children: (
            <ModalBackground>
              {error.response.data.message}
              <Button onClick={modal.pop}>닫기</Button>
            </ModalBackground>
          ),
        });
      });
  };

  return (
    <Container width={width} isNext={!isNext}>
      <ProfileContainer>
        <Typhography size="6xl" weight="bold">
          프로필 등록
        </Typhography>
        <BackButton onClick={handleNext}>
          <BackIcon />
        </BackButton>
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
        <Typhography size="xl" weight="bold">
          프로필
        </Typhography>
      </ProfileContainer>
      <Textfield
        label="닉네임"
        size="lg"
        isColoredLabel={true}
        inputValue={nickname}
        setInputValue={setNickname}
        validationFunction={validationNickname}
        helpText={'닉네임은 2~8자의 규칙을 만족해야해요'}
        checkText={'올바르게 입력했어요'}
        warningText={'닉네임 형식이 일치하지 않아요'}
      />
      <Button
        size="md"
        color={isValidated['nickname'] ? 'primary' : 'greyScale'}
        style={{ marginTop: '2rem' }}
        fullWidth={true}
        disabled={!isValidated['nickname']}
        onClick={() => {
          handleSignup();
        }}
      >
        등록
      </Button>
    </Container>
  );
};
