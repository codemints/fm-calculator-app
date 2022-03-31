const calculations = () => {
  const prt = (el) => document.getElementById('test').innerHTML = el;
  const screen = document.getElementById('calculations');
  const buttons = document.querySelectorAll('.button')
  const numKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
  const opKeys = ['+', '-', '*', '/', '=', 'ENTER', 'BACKSPACE', 'ESCAPE'];
  const keyed = [];
  const sets = [];
  let prevKey = '';
  let i = 0;

  const renderInput = (e, type) => {
    const targ = (type === 'click') ? e.target : e.key;
    const val = ( type === 'click' ) ? targ.value : targ;

    //Clear screen
    if ( keyed.length < 1 && opKeys.indexOf(val) === -1 ) screen.value = '';

    //Manage reset
    if ( val === 'ESCAPE' ) {
      screen.value = 0;
      keyed.length = 0;
      sets.length = 0;
      prevKey = '';
      i = 0;
      return
    }

    //Manage delete
    if ( val === 'BACKSPACE') {
      if ( keyed[0] < 1 || keyed.length < 1 ) {
        prevKey = undefined;
        screen.value = 0;
        i = 0;
        return
      }

      if ( keyed[i].length < 1 ) {
        i--;
        keyed.pop();
      }

      keyed[i].pop();
      prevKey = undefined;
      ( keyed[0].length < 1) ? screen.value = 0 : screen.value = keyed;
      return
    }

    //Manage submission
    if ( val === 'ENTER' ) {
      console.log('enter')
    }

    //Manage operations keys
    if ( opKeys.indexOf(val) !== -1 ) {
      if ( (val !== '-' && keyed.length < 1) || (val === 'BACKSPACE'  || val === "ENTER") ) {
        return;
      }
      
      if ( val === '-' ) {
        if ( keyed.length < 1 ) {
          screen.value = '';
          keyed.push(new Array(val));
          prevKey = val;
          screen.value += val;
        } else if ( keyed.length > 1 && keyed[i].length < 1) {
            keyed[i].push(val);
            prevKey = val;
        } else {
          keyed[i].push(val);
          prevKey = val;
          screen.value = keyed;
          keyed.push(new Array());
          i++
        }
      }

      if ( opKeys.indexOf(prevKey) !== -1 && val !== '-' ) return;

      if (  prevKey !== '-' && prevKey !== val ) {
        keyed[i].push(val);
        prevKey = val;
        keyed.push(new Array());
        i++;
      }
    }

    //Manage number keys 
    if ( numKeys.indexOf(val) !== -1 ) {
      if ( keyed.length < 1 ) {
        keyed.push(new Array(val));
      } else {
        keyed[i].push(val);
      }
      prevKey = val;
    }

    screen.value = keyed;
  }

  buttons.forEach(button => {
    button.addEventListener('click', (e) => renderInput(e, 'click'))
  })

  window.addEventListener('keydown', (e) => renderInput(e, 'keydown'));
}

export default calculations