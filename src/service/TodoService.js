
const toString = Object.prototype.toString
function saveToLocal(key, data) {
  if (toString.call(data) !== '[object Object]') {
    console.error('localstorage: data must be object')
    return
  }

  window.localStorage.setItem(key, JSON.stringify(data));
}

function getLocal(key) {
  const meta = window.localStorage.getItem(key)
  let result = ''
  if (meta) {
    result = JSON.parse(meta)
  }
  return result
}

