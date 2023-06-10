export const formatDate = (date: string): string => {
  return new Date(date).getHours() + ':' + new Date(date).getMinutes();
};
