export const parseDate = (mDate) => {
  const dateObject = new Date(mDate);
  const date = dateObject.getDate();
  const month = dateObject.getMonth();
  const year = dateObject.getFullYear();

  return (date + '.' + month + '.' + year)
}
