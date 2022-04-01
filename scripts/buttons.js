const btnFunc = () => {
  const buttons = Array.from(document.querySelectorAll('.key'));
  const output = document.querySelector('.output input');
  let keyed = [];
  let calc = [];
  let i = 0;
  let lastKey = undefined
  let calcString = '';

  const calculate = (lib) => {
    // let terms = lib.filter((item, index) => index % 2 !== 0);
    // let operation = lib.filter((item, index) => index % 2 === 0);
    
    lib.forEach(item => calcString += item.join(''));
    
    i = 0;
    lastKey = undefined;
    keyed.length = 0;
    calc.length = 0;

    return new Function('return ' + calcString)();
  }

  const parseData = (data, lib) => {
    data.forEach((item, index, array) => {
      lib.push(new Array());

      if ( index !== array.length - 1 ) {
        item.forEach((i, x, a) => {
          if ( x !== a.length -1 ) {
            lib[index].push(i);
          }
        })
      }

      if ( index === array.length - 1 ) {
        item.forEach((i) => {
          lib[index].push(i);
        })
      }
    })

    data.forEach((item, index, array) => {
      if ( index !== array.length - 1 ) {
        const arr = [];
        arr.push(item[item.length - 1]);
        lib.splice(index * 2 + 1, 0, arr);
      }
    })
  }

  const parseString = (data) => {
    let calcString = '';
    data.forEach(item => {
      item.forEach(element => {
        calcString = element;
      })
    })
    return calcString;
  }
  
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {

      const targ = e.target;
      const val = e.target.value;
      
      const dSet = targ.dataset.function;
      const operators = ['+', '-', '*', '/'];

      //Don't add non-number or non-operations signs to array
      if ( !dSet ) {
        if ( val === '.' && keyed.indexOf('.') !== -1 ) return;
        if (keyed.length < 1 ) {
          keyed.push(new Array(val));
        } else {
          keyed[i].push(val);
        }
      }
      
      //Delete everything in the array
      if ( dSet === 'reset' ) {
        keyed.length = 0;
        i = 0;
        lastKey = undefined;
      }

      //Fire calclation function and reset data contains more than 1 array
      if ( dSet === 'submit' && keyed.length > 1 ) {
        parseData(keyed, calc);
        output.value = calculate(calc);
        calcString = '';
        return
      }
      
      //Deal with operator keys
      //If no data in array return
      //Otherwise push to current array index and create a new array
      if ( operators.indexOf(val) !== -1) {
        console.log(val, lastKey);
        if ( (dSet === 'subtract' && keyed.length < 1) || (dSet === 'subtract' && keyed[i]) ) {
          if ( keyed.length < 1 ) {
            keyed.push(new Array(val));
          } else if ( keyed[i].length < 1 ) {
            keyed[i].push(val);
          }
          lastKey = val;
          output.value = parseString(keyed)
          return
        }

        if ( keyed.length < 1 ) {
          lastKey = undefined;
          return
        }

        if ( operators.indexOf(lastKey) !== -1 ) return;

        keyed[i].push(val)
        i++
        keyed.push(new Array());
      }
      
      //Delete last item
      //If empty do nothing and/or reset
      if ( dSet === 'delete' ) {        
        if ( keyed.length < 1 || keyed[0].length < 1 ) {
          keyed.length = 0;
          i = 0;
          lastKey = undefined;
          output.value = '';
          return
        }
        
        if ( keyed[i].length < 1 ) {
          i--;
          keyed.pop();
        }
        keyed[i].pop();
      }
      
      if ( dSet !== 'submit') output.value = parseString(keyed);
      lastKey = val;
    })
  })
}

export default btnFunc
