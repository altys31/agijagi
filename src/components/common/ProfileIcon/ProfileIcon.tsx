import NoneImage from '../../../assets/images/adult.png';
import BoyImage from '../../../assets/images/boy.png';
import GirlImage from '../../../assets/images/girl.png';
import { ProfileType } from '../../../types/profile';

import * as s from './ProfileIcon.style';
import { ProfileIconSize } from './ProfileIcon.types';

interface ProfileIconProps {
  image?: string;
  type?: ProfileType;
  size: ProfileIconSize;
  onClick?: () => void;
}

const ProfileIcon = ({
  image,
  type = 'none',
  size,
  onClick = () => {},
}: ProfileIconProps) => {
  const defaultImage: Record<ProfileType, string> = {
    boy: BoyImage,
    girl: GirlImage,
    none: NoneImage,
  };

  return (
    <s.ProfileIcon size={size} onClick={onClick}>
      <img src={image ? image : defaultImage[type]} alt="profile" />
    </s.ProfileIcon>
  );
};

export default ProfileIcon;
