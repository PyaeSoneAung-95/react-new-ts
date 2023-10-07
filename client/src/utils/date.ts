export function range(start: number, end: number, step: number = 1) {
  const result = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
}

export const getYear = (date: Date) => date.getFullYear();

export const getMonth = (date: Date) => date.getMonth();

export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];