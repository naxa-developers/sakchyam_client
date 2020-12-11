const convertDate = isoData => {
  const date = new Date(isoData);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = `0${dt}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  // console.log(`${year}-${month}-${dt}`);
  return `${year}-${month}-${dt}`;
};
export default convertDate;
