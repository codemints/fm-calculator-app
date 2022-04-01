import { printJSON as p, consoleLog as c } from '@scripts/custom-functions'

const calculations = () => {
  const screen = document.getElementById('calculations');
  const buttons = document.querySelectorAll('.button')
  const numKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
  const opKeys = ['+', '-', '*', '/'];
  let keyed = new Array();
  let prevKey = undefined;
  let op = false;
  let i = 0;

  const calculate = (arr) => {
    // let terms = arr.filter((item, index) => index % 2 !== 0);
    // let ops = arr.filter((item, index) => index % 2 === 0);
    let calcString = '';
    
    arr.forEach(item => calcString += item.join(''));
    
    i = 0;
    prevKey = undefined;

    return new Function('return ' + calcString)();
  }

  const parseCalc = (arr) => {
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

  const parseString = (data) => {
    let calcString = '';
    data.forEach(item => {
      item.forEach(element => {
        calcString += element;
      })
    })
    return calcString;
  }

  const renderInput = (e, type) => {
    const targ = (type === 'click') ? e.target : e.key;
    const val = ( type === 'click' ) ? targ.value : targ;
    let keyX = keyed[i];

    //Return if array is empty
    if ( opKeys.indexOf(val) !== -1 || val === 'BACKSPACE' || val === 'ENTER' ) if ( keyed.length < 1 ) return;

    //Clear screen
    if ( keyed.length < 1 && opKeys.indexOf(val) === -1 ) screen.value = '';

    //Manage reset
    if ( val === 'ESCAPE' ) {
      keyed.length = 0;
      prevKey = '';
      i = 0;
      return
    }

    //Manage number keys 
    if ( numKeys.indexOf(val) !== -1 ) {
      if ( keyed.length < 1 ) {
        return keyed.push(new Array(val));
      } else {
        if ( prevKey === 'ENTER') return;
        return keyX.push(val);
      }
    }
    
    //Manage operations keys
    if ( opKeys.indexOf(val) !== -1 && val !== '-' ) {
      if ( prevKey === 'BACKSPACE' ) {
        op = false;
        prevKey = undefined;
      }

      if ( prevKey === 'ENTER' ) prevKey = undefined;

      numKeys.forEach(num => {
        if ( keyX.at(0) === num || keyX.at(-1) === num ) {
          op = false;
        }
      })

      if ( !op ) {
        if ( keyX.indexOf('(') !== -1 && keyX.at(-1) !== ')' ) keyX.push(')');
        keyX.push(val);
        op = true;
        keyed.push(new Array());
        i++;
        return;
      }
    }

    //Manage subtract
    if ( val === '-') {
      if ( keyX.length < 1 ) {
        op = false;
        keyX.push('(')
      }

      numKeys.forEach(num => {
        if ( keyX.at(-1) === num ) {
          if ( keyX.indexOf('(') !== -1 ) keyX.push(')');
          keyX.push(val);
          op = true;
          keyed.push(new Array());
          i++;
          return;
        }
      })

      if ( !op ) {
        keyX.push(val);
        op = true;
        return;
      }
    }

    //Manage delete
    if ( val === 'BACKSPACE') {
      prevKey = val;
      if ( keyX.length < 1 ) {
        keyed.pop();
        ( keyed.length < 1 ) ? i = 0 : i--;

        keyX = keyed[i]

        if ( keyX.length > 0 ) {
          opKeys.forEach(key => {
            if ( keyX.at(-1) === key ) {
              keyX.pop();
            }
          })
        }

        return;
      }

      if ( keyX.length > 0 ) {
        if ( keyX.at(1) === '-' && keyX.length < 3 ) {
          keyX.splice(0, 2);
        } else {
          keyX.pop();
        }
        if ( keyed[0].length < 1 ) {
          keyed.pop();
          i = 0;
        }
        return;
      }

    }

    //Manage submission
    if ( val === 'ENTER' ) {
      if ( keyX.length < 1 ) return prevKey = undefined;
      if ( keyX.length > 1 ) {
        if ( keyX.at(0) === '(' ) keyX.push(')');
      }
      const results = calculate(parseCalc(keyed));
      keyed.length = 0;
      i = 0;
      op = false;
      prevKey = 'ENTER',
      keyed.push(new Array());
      keyed[i].push(results);
    }
  }
  
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      renderInput(e, 'click');
      p('test', keyed, 2);
      c(prevKey);
      screen.value = (keyed.length !== 0 ) ? parseString(keyed) : 0;
    })
  })

  // window.addEventListener('keydown', (e) => renderInput(e, 'keydown'));
}

export default calculations