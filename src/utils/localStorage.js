
const toString = Object.prototype.toString
export function saveLocal(key, data) {
  if (toString.call(data) !== '[object Object]') {
    console.error('localstorage: data must be object')
    return
  }

  window.localStorage.setItem(key, JSON.stringify(data));
}

export function getLocal(key) {
  const meta = window.localStorage.getItem(key)
  let result = ''
  if (meta) {
    result = JSON.parse(meta)
  }
  return result
}


