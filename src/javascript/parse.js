export const calculate = (arr) => {
  // let terms = arr.filter((item, index) => index % 2 !== 0);
  // let ops = arr.filter((item, index) => index % 2 === 0);
  let calcString = '';
  
  arr.forEach(item => calcString += item.join(''));
  return new Function('return ' + calcString)();
}

export const parseCalc = (arr) => {
  const parsed = new Array();
  
  arr.forEach((item, index, array) => {
    parsed.push(new Array());

    if ( index !== array.length - 1 ) {
      item.forEach((i, x, a) => {
        if ( x !== a.length -1 ) {
          parsed[index].push(i);
        }
      })
    }

    if ( index === array.length - 1 ) {
      item.forEach((i) => {
        parsed[index].push(i);
      })
    }
  })

  arr.forEach((item, index, array) => {
    if ( index !== array.length - 1 ) {
      const arr = [];
      arr.push(item[item.length - 1]);
      parsed.splice(index * 2 + 1, 0, arr);
    }
  })

  return parsed;
}

export const parseString = (data) => {
  let calcString = '';
  data.forEach(item => {
    item.forEach(element => {
      calcString += element;
    })
  })
  return calcString;
}