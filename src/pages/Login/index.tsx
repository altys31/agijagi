import BackIcon from '@heroicons/react/24/outline/ChevronLeftIcon';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../apis/authApi';
import Button from '../../components/common/Button';
import Textfield from '../../components/common/Textfield';
import { ValidationState } from '../../components/common/Textfield/Textfield.types';
import Typhography from '../../components/common/Typography';
import { IntroductionSlider } from '../../components/Login/IntroductionSlider/IntroductionSlider';
import useModal from '../../hooks/useModal';
import useMemberStore from '../../stores/useMemberStore';
import * as s from './style';
import { ModalBackground } from './style';
import LogoImg from '../../assets/images/logo.png';

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [level, setLevel] = useState<number>(0);
  const [loginMode, setLoginMode] = useState<boolean>(false);
  const [isValidated, setIsValidated] = useState<boolean[]>([false, false]);

  const { memberId, updateMemberId } = useMemberStore();
  const navigator = useNavigate();
  const modal = useModal();

  const widthRatio = window.innerWidth / 360;
  const width = window.innerWidth;
  const height = window.innerHeight;

  const handleActivateLogin = () => {
    setLoginMode(!loginMode);
  };

  const handleLevel = (level: number) => {
    setLevel(level);
  };

  const handleLogin = async () => {
    const loginInfo = {
      email: email,
      password: password,
    };

    try {
      await login(loginInfo).then((response) => {
        const memberId: string = response.data.memberId;
        updateMemberId(Number(memberId));
        navigator('/main');
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        modal.push({
          children: (
            <ModalBackground>
              {error.response?.data?.message || '로그인 실패'}
              <Button onClick={modal.pop}>닫기</Button>
            </ModalBackground>
          ),
        });
        navigator('/main');
      } else {
        console.error('Unknown error:', error);
      }
    }
  };

  function validatePassword(input: string): ValidationState {
    if (input.trim() === '') {
      return 'normal';
    }

    if (input.length >= 8 && input.length <= 16) {
      setIsValidated([isValidated[0], true]);
      return 'success';
    } else {
      setIsValidated([isValidated[0], false]);
      return 'danger';
    }
  }

  function validateEmail(input: string): ValidationState {
    if (input.trim() === '') {
      return 'normal';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(input)) {
      setIsValidated([true, isValidated[1]]);
      return 'success';
    } else {
      setIsValidated([false, isValidated[1]]);
      return 'danger';
    }
  }
  return (
    <s.Container>
      <s.Moon
        width={360}
        height={height}
        ratio={360 / 360}
        level={level}
        loginMode={loginMode}
      >
        <s.PatternContainer>
          <s.Pattern1 ratio={360 / 360} />
          <s.Pattern2 ratio={360 / 360} />
          <s.Pattern3 ratio={360 / 360} />
          <s.Pattern4 ratio={360 / 360} />
          <s.Pattern5 ratio={360 / 360} />
          <s.Pattern6 ratio={360 / 360} />
        </s.PatternContainer>
      </s.Moon>
      <s.Logo src={LogoImg} height={height} loginMode={loginMode} />
      <IntroductionSlider
        level={level}
        handleLevel={handleLevel}
        loginMode={loginMode}
      />
      <s.LoginContainer width={width} loginMode={loginMode}>
        <Button fullWidth={true} onClick={handleActivateLogin}>
          로그인
        </Button>
        <Button
          color="secondary"
          fullWidth={true}
          onClick={() => {
            navigator('/signup');
          }}
        >
          회원가입
        </Button>
      </s.LoginContainer>

      <s.FormContainer width={width} loginMode={loginMode}>
        <s.BackButton onClick={handleActivateLogin}>
          <BackIcon />
        </s.BackButton>
        <Typhography size="7xl" weight="bold">
          로그인
        </Typhography>
        <Textfield
          size="lg"
          label="이메일"
          color="secondary"
          isColoredLabel={true}
          inputValue={email}
          setInputValue={setEmail}
          validationFunction={validateEmail}
          warningText="올바른 이메일 형식이 아닙니다."
          disabled={!loginMode}
        ></Textfield>
        <Textfield
          size="lg"
          label="비밀번호"
          isColoredLabel={true}
          inputValue={password}
          setInputValue={setPassword}
          validationFunction={validatePassword}
          disabled={!loginMode}
          type="password"
        ></Textfield>
        <Button
          size="md"
          color={isValidated[0] ? 'primary' : 'greyScale'}
          fullWidth={true}
          disabled={!isValidated[0]}
          onClick={handleLogin}
        >
          <Typhography color="white">로그인</Typhography>
        </Button>
      </s.FormContainer>
    </s.Container>
  );
};
export default Login;
