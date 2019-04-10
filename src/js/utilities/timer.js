/**
 * time js file created by Tamara G. Mack on 08-Apr-19 for tamaramack.github.io
 */

export default class Timer {
  constructor(id, date) {
    Object.defineProperties(this, {
      timestamp: {
        value: new Date()
      },
      datetime: {
        value: new Date(date),
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
  date = new Date(date);
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
  date = new Date(date).getTime();
  let now = Date.now();
  now = new Date(Date.now() - date);
  return timeString(now);
}

function twoDigitFormat(num) {
  num = num.toString();
  return num.length > 1 ? num : `0${num}`;
}
