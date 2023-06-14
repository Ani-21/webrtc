export const formatDate = (date: string): string => {
  const time = date.trim().split(',')[1].split(':');
  return time[0] + ':' + time[1];
};
