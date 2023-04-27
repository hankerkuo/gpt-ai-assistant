/**
 * 
 * @param {Date} date1 
 * @param {Date} date2 
 * @returns {boolean}
 */

export function isDifferenceGreaterThanOneDay (date1, date2) {
  const timestamp1 = date1.getTime();
  const timestamp2 = date2.getTime();
  const difference = Math.abs(timestamp2 - timestamp1);
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  return difference > oneDayInMilliseconds;
}

export function createToday8amDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  // our target is to set 8 am UTC+8
  // map to 0 am UTC+0, assume the image timezone is UTC+0
  return new Date(year, month, day, 0, 0, 0, 0);
}