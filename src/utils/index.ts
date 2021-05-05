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

export const getTranslit = (str: string, toLowerCase:boolean = true): string => {

  let src = toLowerCase ? str.toLowerCase() : str;

  const ru: any = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 
    'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i', 
    'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 
    'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 
    'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
  }, nStr = [];

  src = src.replace(/[ъь]+/g, '').replace(/й/g, 'i');
  src = src.replace(/\s+/g, '-');

  for ( var i = 0; i < src.length; ++i ) {
    nStr.push(
            ru[ src[i] ]
        || ru[ src[i].toLowerCase() ] == undefined && src[i]
        || ru[ src[i].toLowerCase() ].toUpperCase()
    );
  }
  return nStr.join('');
}