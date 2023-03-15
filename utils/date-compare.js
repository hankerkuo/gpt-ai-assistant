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
  return new Date(year, month, day, 8, 0, 0, 0);
}