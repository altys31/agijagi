import styled from '@emotion/styled';
import theme from '../../../styles/theme';

export const Container = styled.div`
  @keyframes morph {
    0% {
      transform: scale(1.025, 0.975) rotate(2deg);
    }

    25% {
      transform: scale(0.975, 1.025) rotate(-2deg);
    }

    50% {
      transform: scale(1.025, 0.975) rotate(-2deg);
    }

    75% {
      transform: scale(0.975, 1.025) rotate(2deg);
    }
  }

  position: relative;
  width: 2rem;
  height: 2rem;
  padding: 1rem;
  border-radius: 50%;
  transition: all 0.15s ease;

  svg {
    position: absolute;
    width: 2rem;
    height: 2rem;
    transition: all 0.2s ease;
  }

  background-color: ${theme.color.primary[400]};
  color: #fff !important;
  animation: morph 2s ease alternate-reverse infinite;
`;
