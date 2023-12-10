import dayjs from 'dayjs';

export const humanizedDate = (value: Date | string) =>
  dayjs(value).format('DD.MM.YYYY');
