import styled from '@emotion/styled';
import { useState } from 'react';
import { ValidationState } from '../../components/common/Textfield/Textfield.types';
import { ProfileForm } from '../../components/Signup/ProfileForm/ProfileForm';
import { UserForm } from '../../components/Signup/UserForm/UserForm';
import theme from '../../styles/theme';
import { UserData } from '../../types/user';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${theme.color.primary[50]};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
`;

export const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [isValidated, setIsValidated] = useState<Record<string, boolean>>({
    email: false,
    password: false,
    nickname: false,
  });
  const [isNext, setIsNext] = useState<boolean>(false);
  const [uploadImg, setUploadImg] = useState<File | null>(null);

  function validatePassword(input: string): ValidationState {
    if (input.trim() === '') {
      return 'normal';
    }

    if (input.length >= 8 && input.length <= 16) {
      setIsValidated({ ...isValidated, password: true });
      return 'success';
    } else {
      setIsValidated({ ...isValidated, password: false });
      return 'danger';
    }
  }

  function validateEmail(input: string): ValidationState {
    if (input.trim() === '') {
      return 'normal';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(input)) {
      setIsValidated({ ...isValidated, email: true });
      return 'success';
    } else {
      setIsValidated({ ...isValidated, email: false });
      return 'danger';
    }
  }

  function validateNickName(input: string): ValidationState {
    if (input.trim() === '') {
      return 'normal';
    }

    if (input.length >= 2 && input.length <= 8) {
      setIsValidated({ ...isValidated, nickname: true });
      return 'success';
    } else {
      setIsValidated({ ...isValidated, nickname: false });
      return 'danger';
    }
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadImg(file);
    }
  };

  const handleNext = () => {
    setIsNext(!isNext);
  };

  return (
    <Container>
      <UserForm
        email={email}
        password={password}
        isNext={isNext}
        isValidated={isValidated}
        handleNext={handleNext}
        setEmail={setEmail}
        setPassword={setPassword}
        validateEmail={validateEmail}
        validatePassword={validatePassword}
      />
      <ProfileForm
        email={email}
        password={password}
        isNext={isNext}
        uploadImg={uploadImg}
        handleNext={handleNext}
        handleUpload={handleUpload}
        isValidated={isValidated}
        nickname={nickname}
        setNickname={setNickname}
        validationNickname={validateNickName}
      />
    </Container>
  );
};

export default Signup;
