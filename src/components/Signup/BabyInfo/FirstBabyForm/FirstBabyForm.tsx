import styled from '@emotion/styled';
import Button from '../../../common/Button';
import Textfield from '../../../common/Textfield';
import Typhography from '../../../common/Typography';
import PlusCircle from '@heroicons/react/24/outline/PlusCircleIcon';
import theme from '../../../../styles/theme';
import defaultImg from '../../../../assets/images/baby.png';
import { css } from '@emotion/react';
import { ValidationState } from '../../../common/Textfield/Textfield.types';
import BackIcon from '@heroicons/react/24/outline/ChevronLeftIcon';
import { useNavigate } from 'react-router-dom';

export const ProfileCircleWrapper = styled.label`
  display: flex;
  position: relative;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  border: 2px solid ${theme.color.greyScale[400]};
  background-color: ${theme.color.greyScale[200]};
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

export const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const AddIconWrapper = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  left: 80%;
  top: 7%;
`;

export const InvisibleInput = styled.input`
  display: none;
`;

export const DateInputContainer = styled.div`
  position: relative;
`;
export const DateInputLabel = styled.div`
  position: absolute;
  font-size: 0.75rem;
  left: 12px;
  bottom: 32px;
  color: ${theme.color.primary[900]};
  z-index: 1;
`;

export const ButtonWrapper = styled.div`
  width: 80%;
  transition: background-color 1s;
`;

export const Container = styled.div<{ width: number; isNext: boolean }>(
  (props) => css`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;
    max-width: 500px;
    z-index: 10;
    transition: all 1s;
    transform: translate(${!props.isNext ? 0 : props.width * -1}px, 0);
  `
);

export const BackButton = styled.div(
  () => css`
    position: absolute;
    width: 24px;
    height: 24px;
    padding: 0.2rem;
    color: #fff;
    background-color: ${theme.color.primary[400]};
    border-radius: 50%;
    transition: all 0.75s;
    left: -40%;
    top: 2%;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  `
);

export interface FirstBabyFormProps {
  isNext: boolean;
  uploadImg: File | null;
  isValidated: Record<string, boolean>;
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  babyName: string;
  setBabyName: React.Dispatch<React.SetStateAction<string>>;
  babyNickname: string;
  setBabyNickname: React.Dispatch<React.SetStateAction<string>>;
  birthday: string;
  validationName: (input: string) => ValidationState;
  validationNickname: (input: string) => ValidationState;
  setBirthday: React.Dispatch<React.SetStateAction<string>>;
  setIsNext: React.Dispatch<React.SetStateAction<boolean>>;
}
export const FirstBabyForm = ({
  isNext,
  uploadImg,
  isValidated,
  handleUpload,
  babyName,
  setBabyName,
  babyNickname,
  setBabyNickname,
  birthday,
  validationName,
  validationNickname,
  setBirthday,
  setIsNext,
}: FirstBabyFormProps) => {
  const navigator = useNavigate();
  return (
    <Container width={window.innerWidth} isNext={isNext}>
      <ProfileContainer>
        <BackButton onClick={() => navigator('/main')}>
          <BackIcon />
        </BackButton>
        <Typhography size="6xl" weight="bold">
          패밀리 등록
        </Typhography>
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
        label="아기이름"
        size="lg"
        color="tertiary"
        isColoredLabel={false}
        inputValue={babyName}
        setInputValue={setBabyName}
        disabled={isNext}
        validationFunction={validationName}
        helpText={'이름은 2~8자의 규칙을 만족해야해요'}
        checkText={'올바르게 입력했어요'}
        warningText={'이름 형식이 일치하지 않아요'}
      />
      <Textfield
        label="닉네임"
        size="lg"
        color="tertiary"
        isColoredLabel={false}
        inputValue={babyNickname}
        setInputValue={setBabyNickname}
        disabled={isNext}
        validationFunction={validationNickname}
        helpText={'닉네임은 2~8자의 규칙을 만족해야해요'}
        checkText={'올바르게 입력했어요'}
        warningText={'닉네임 형식이 일치하지 않아요'}
      />
      <DateInputContainer>
        <DateInputLabel>
          <Typhography size="2xs" weight="bold">
            생년월일 / 출생예정일
          </Typhography>
        </DateInputLabel>
        <Textfield
          label=""
          size="lg"
          color="tertiary"
          isColoredLabel={true}
          inputValue={birthday}
          setInputValue={setBirthday}
          disabled={isNext}
          type="date"
        />
      </DateInputContainer>
      <ButtonWrapper>
        <Button
          size="md"
          color={isValidated && birthday !== '' ? 'primary' : 'greyScale'}
          style={{ marginTop: '2rem', transition: 'all 0.3s' }}
          fullWidth={true}
          disabled={!isValidated.name || !isValidated.nickname}
          onClick={() => {
            setIsNext(true);
          }}
        >
          다음
        </Button>
      </ButtonWrapper>
    </Container>
  );
};
