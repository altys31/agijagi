const toISOString = (source: Date | string): string => {
  const date = new Date(source);
  const pad = (num: number) => String(num).padStart(2, '0');

  const isoString =
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    'T' +
    pad(date.getHours()) +
    ':' +
    pad(date.getMinutes()) +
    ':' +
    pad(date.getSeconds());

  return isoString;
};

export default toISOString;
