export const formatDate = (date: string) => {
  const dateArr = date.slice(0, 10).split("-");
  const time = date.slice(11, 16);

  const [year, month, day] = dateArr;

  const newDate = `${day}.${month}.${year} ${time}`;

  return newDate;
};
