import toISOString from './toISOString';

const now = (): string => {
  return toISOString(new Date());
};

export default now;
