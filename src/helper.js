const getRandomBytesHex = (amt) => {
  const arr = new Uint8Array(amt)
  window.crypto.getRandomValues(arr)
  let str = ''
  for(let i = 0; i < arr.length; i++) {
    // add leading 0 to fix "encoding/hex: odd length hex string" error
    let t = arr[i] < 16 ? `0${arr[i].toString(16)}` : arr[i].toString(16) 
    str += t
  }
  return str
}

export default {
  getRandomBytesHex 
}