
const toString = Object.prototype.toString

export default function (key) {
  return {
    getLocal() {
      const meta = window.localStorage.getItem(key)
      let result = ''
      if (meta) {
        result = JSON.parse(meta)
      }
      return result
    },
    saveLocal(data) {
      if (toString.call(data) !== '[object Object]') {
        console.error('localstorage: data must be object')
        return
      }
      window.localStorage.setItem(key, JSON.stringify(data));
    },
    removeLocal() {
      window.localStorage.removeItem(key);
    }
  }
}

