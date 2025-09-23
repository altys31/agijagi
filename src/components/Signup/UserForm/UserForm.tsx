import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Typhography from '../../../components/common/Typography';
import Button from '../../common/Button';
import Textfield from '../../common/Textfield';
import { ValidationState } from '../../common/Textfield/Textfield.types';

export const Container = styled.div<{ width: number; isNext: boolean }>(
  (props) => css`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 500px;
    width: 80%;
    margin: 0% 0% 24vh 0%;
    gap: 6vh;
    z-index: 10;
    transition: all 1s;
    transform: translate(${!props.isNext ? 0 : props.width * -1}px, 0);
  `
);

interface UserFormProps {
  email: string;
  password: string;
  isNext: boolean;
  isValidated: Record<string, boolean>;
  handleNext: () => void;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  validateEmail: (e: string) => ValidationState;
  validatePassword: (e: string) => ValidationState;
}

export const UserForm = ({
  email,
  password,
  isNext,
  isValidated,
  handleNext,
  setEmail,
  setPassword,
  validateEmail,
  validatePassword,
}: UserFormProps) => {
  const width = window.innerWidth;

  return (
    <Container width={width} isNext={isNext}>
      <Typhography size="7xl" weight="bold">
        회원가입
      </Typhography>
      <Textfield
        size="lg"
        label="이메일"
        color="secondary"
        isColoredLabel={true}
        fullWidth={true}
        inputValue={email}
        checkText={'올바르게 입력했어요'}
        warningText={'이메일 형식이 일치하지 않아요'}
        disabled={isNext}
        setInputValue={setEmail}
        validationFunction={validateEmail}
      ></Textfield>
      <Textfield
        size="lg"
        label="비밀번호"
        isColoredLabel={true}
        fullWidth={true}
        inputValue={password}
        setInputValue={setPassword}
        helpText={'* 8~16자의 영소문자와 숫자로 이루어져야 해요.'}
        checkText={'올바르게 입력했어요'}
        warningText={'비밀번호 형식이 일치하지 않아요'}
        validationFunction={validatePassword}
        disabled={isNext}
        type="password"
      ></Textfield>
      <Button
        size="md"
        color={
          isValidated['email'] && isValidated['password']
            ? 'primary'
            : 'greyScale'
        }
        style={{ marginTop: '2rem', transition: 'all 0.75s' }}
        fullWidth={true}
        disabled={!(isValidated['email'] && isValidated['password'])}
        onClick={handleNext}
      >
        다음
      </Button>
    </Container>
  );
};
