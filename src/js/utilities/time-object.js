/**
 * time js file created by Tamara G. Mack on 08-Apr-19 for tamaramack.github.io
 */

export default class TimeObject {
  constructor(id, date) {
    Object.defineProperties(this, {
      timestamp: {
        value: new Date()
      },
      datetime: {
        value: isValidDate(date),
        enumerable: true
      },
      id: {
        value: id || 'time',
        enumerable: true
      }
    });
  }

  get endTime() {
    return getEndTime(this.datetime);
  }

  get time() {
    return timeString(this.datetime);
  }
}

function timeString(date) {
  date = isValidDate(date);
  const hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds(),
    millisecond = date.getMilliseconds();

  let time = '';
  if (hour && date.getTime() > 10000) time += `${twoDigitFormat(hour)}:`;

  time += `${twoDigitFormat(minute)}:${twoDigitFormat(second)}`;

  if (millisecond) time += `.${millisecond}`;

  return time;
}

function getEndTime(date) {
  date = isValidDate(date).getTime();
  let now = new Date(Date.now() - date);
  return timeString(now);
}

function twoDigitFormat(num) {
  return `${num}`.length > 1 ? num : `0${num}`;
}

function isValidDate(date) {
  date = new Date(date);
  if (!(Object.prototype.toString.call(date) === '[object Date]'
    && Number.isFinite(Number(date)))) date = new Date();
  return date;
}
