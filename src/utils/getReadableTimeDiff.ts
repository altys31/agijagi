export const getReadableTimeDiff = (date: Date): string => {
  const timeDiff = Math.floor(
    new Date(new Date().getTime() - date.getTime()).getTime() / 1000
  );

  if (timeDiff <= 0 || isNaN(timeDiff)) {
    return '방금 전';
  }

  if (timeDiff < 60) {
    return `${timeDiff}초 전`;
  }

  if (timeDiff < 3600) {
    return `${Math.floor(timeDiff / 60)}분 전`;
  }

  if (timeDiff < 3600 * 24) {
    return `${Math.floor(timeDiff / 3600)}시간 전`;
  }

  return `${Math.floor(timeDiff / 3600 / 24)}일 전`;
};
