/**
 * Hex 색상값의 R, G, B 값의 합을 10진수로 리턴합니다.
 * @param {string} hex 합을 구할 10진수 값
 * @returns {number} RGB 값의 합
 */
export const getRgbSum = (hex: string): number => {
  return (
    parseInt(hex.substring(1, 3), 16) +
    parseInt(hex.substring(3, 5), 16) +
    parseInt(hex.substring(5, 7), 16)
  );
};
