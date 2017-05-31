// let testVal = '今天和女朋友分手了，我好难过。现在我好伤心'
// const keywords = {
//   sad: [{
//     text: '难过',
//     level: 1
//   }, {
//     text: '伤心',
//     level: 2
//   }, {
//     text: '痛苦',
//     level: 3
//   }]
// }
// const soupPool = {
//   sad: {
//     level1: ['不要气馁1', '不要气馁2', '不要气馁3'],
//     level2: ['不要气馁1', '不要气馁2', '不要气馁3'],
//     level3: ['不要放弃1', '不要放弃2', '不要放弃3']
//   }
// }

// function ChickenSoup() {
//   let status, level = 0
//   for (let key in keywords) {
//     keywords[key].forEach(item => {

//     })
//   }

//   const soups = soupPool[status]['level' + level]
//   const randomNumber = _getRandomNumber(0, soups.length)
//   return {
//     status,
//     level,
//     soup: soups[randomNumber]
//   }
// }
// // 解析字符串
// function _parseText(word, text) {
//   let reg = new RegExp(word.text, 'g')
//   if (reg.test(text)) {
//     console.log(word.text + reg.lastIndex)
//     if (reg.lastIndex !== word.text.length) {

//     }
//     status = key
//     level += word.level
//   }
// }

// function _getRandomNumber(start = 0, end = 10) {
//   let sub = end - start;
//   let random = Math.floor(Math.random() * sub) + start;
//   return random;
// }

// const result = ChickenSoup()
// console.log(result)
