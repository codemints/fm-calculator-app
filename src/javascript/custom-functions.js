export const printJSON = (id, array, config) => document.getElementById(id).innerHTML = JSON.stringify(array, null, config);
export const consoleLog = (...data) => console.log(data);