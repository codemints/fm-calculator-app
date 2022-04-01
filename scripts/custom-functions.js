export const printJSON = (el, val) => document.getElementById('test').innerHTML = JSON.stringify(el, null, val);
export const consoleLog = (...arr) => console.log(arr);