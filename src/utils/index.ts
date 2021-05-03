import { EventsListItem } from "../interfaces";

export const getPlural = ( number: number, wordForms: string[]) => {
  let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return `${number} ${wordForms[2]}`;
    }
    n %= 10;
    if (n === 1) {
      return `${number} ${wordForms[0]}`;
    }
    if (n >= 2 && n <= 4) {
      return `${number} ${wordForms[1]}`;
    }
    return `${number} ${wordForms[2]}`;;
}

export const getEventDateString = (event: EventsListItem): string => {

  let result = '';
  const dateStart = new Date(event.dateStart);
  const dateEnd = new Date(event.dateStart);

  return dateStart.toLocaleDateString() + ' c ' + dateStart.toLocaleTimeString().slice(0,-3) + ' до ' + dateEnd.toLocaleTimeString().slice(0,-3);
}