import getRandomInt from './randomInt'

export default function verifyEmailCode() {
  let verifyCode = ''
  for (let i = 1; i <= 11; i++) {
    if (i % 4 == 0) {
      verifyCode += '-'
    } else {
      verifyCode += getRandomInt(0, 9)
    }
  }
  return verifyCode
}
