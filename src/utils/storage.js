import moment from 'moment';
/**
 * localStorage utils
 * value: value
 * timer: hour
 * date:  Date
 */
class Storage {

  constructor() {
    this.init()
  }

  getCurrentTime() {
    return moment().utc().valueOf()
  }

  init() {
    const list = localStorage;
    const keys = Object.keys(list);
    keys.forEach((key) => {
      let value = list[key];
      if (this.isRemove(value)) {
        localStorage.removeItem(key)
      }
    })
  }

  getItem(name) {
    let value = localStorage.getItem(name)
    if (!value) return null
    if (this.isRemove(value)) {
      localStorage.removeItem(name)
    }
    if (this.isjson(value)) {
      value = JSON.parse(value)
      if (this.isCorrectFormat(value)) {
        return value
      }
    }
    return value
  }

  setItem(name, value, timer) {
    if (!name) return
    let values = {
      value: value,
      timer: timer || 24,
      date: this.getCurrentTime()
    }
    localStorage.setItem(name, JSON.stringify(values));
  }

  isRemove(value) {
    if (!value) return true
    if (this.isjson(value)) {
      value = JSON.parse(value)
      return this.isCorrectFormat(value) && this.getCurrentTime() - value.date > value.timer * 60 * 60 * 1000
    }
    return false
  }

  isCorrectFormat(str) {
    return str.hasOwnProperty('date') || str.hasOwnProperty('timer') || str.hasOwnProperty('value');
  }

  isjson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true
  }

}
export {
  Storage
}
