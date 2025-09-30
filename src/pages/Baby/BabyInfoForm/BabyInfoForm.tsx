import styled from '@emotion/styled';
import moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addChild } from '../../../apis/childApi';
import { ValidationState } from '../../../components/common/Textfield/Textfield.types';
import { FirstBabyForm } from '../../../components/Signup/BabyInfo/FirstBabyForm/FirstBabyForm';
import {
  Relationship,
  SecondBabyForm,
} from '../../../components/Signup/BabyInfo/SecondBabyForm/SecondBabyForm';
import theme from '../../../styles/theme';
import { BabyGender } from '../../../types/user';
import useDialog from '../../../hooks/useDialog';

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.color.primary[50]};
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const BabyInfoForm = () => {
  const [uploadImg, setUploadImg] = useState<File | null>(null);
  const [babyName, setBabyName] = useState<string>('');
  const [babyNickname, setBabyNickname] = useState<string>('');
  const [birthday, setBirthday] = useState<string>(
    moment(new Date()).format('YYYY-MM-DD')
  );
  const [selectedGender, setSelectedGender] = useState<BabyGender>('남아');
  const [selectedRelation, setSelectedRelation] =
    useState<Relationship>('엄마');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [isValidated, setIsValidated] = useState<Record<string, boolean>>({
    name: false,
    nickname: false,
  });
  const [isNext, setIsNext] = useState<boolean>(false);
  const navigator = useNavigate();
  const dialog = useDialog();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadImg(file);
    }
  };

  function validateName(input: string): ValidationState {
    if (input.trim() === '') {
      return 'normal';
    }

    if (input.length >= 2 && input.length <= 8) {
      setIsValidated({ ...isValidated, name: true });
      return 'success';
    } else {
      setIsValidated({ ...isValidated, name: false });
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

  const submitBaby = () => {
    const newChild = {
      name: babyName,
      nickname: babyNickname,
      gender: selectedGender,
      birthday: birthday,
      image: uploadImg,
      birthHeight: height,
      birthWeight: weight,
    };
    addChild(newChild)
      .then((response) => {
        navigator('/main');
      })
      .catch((error) => {
        dialog.alert(error.response.data.message);
        navigator('/main');
      });
  };

  return (
    <Background>
      <Container>
        <FirstBabyForm
          isNext={isNext}
          uploadImg={uploadImg}
          isValidated={isValidated}
          handleUpload={handleUpload}
          babyName={babyName}
          setBabyName={setBabyName}
          babyNickname={babyNickname}
          setBabyNickname={setBabyNickname}
          birthday={birthday}
          validationName={validateName}
          validationNickname={validateNickName}
          setBirthday={setBirthday}
          setIsNext={setIsNext}
        />
        <SecondBabyForm
          isNext={isNext}
          selectedGender={selectedGender}
          selectedRelation={selectedRelation}
          setSelectedGender={setSelectedGender}
          setSelectedRelation={setSelectedRelation}
          weight={weight}
          setWeight={setWeight}
          height={height}
          setHeight={setHeight}
          submitBaby={submitBaby}
        />
      </Container>
    </Background>
  );
};
