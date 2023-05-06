const getRandomBytesHex = (amt) => {
  const arr = new Uint8Array(amt);
  window.crypto.getRandomValues(arr);
  let str = '';
  for(let i = 0; i < arr.length; i++) {
      str += arr[i].toString(16);
  }
  return str
}

export default {
  getRandomBytesHex 
}