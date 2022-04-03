import { printJSON as p, consoleLog as c } from '@scripts/custom-functions'
import UseState from '@scripts/state'
import { calculate as calc, parseCalc as pCalc, parseString as pString } from '@scripts/parse'

const initState = new UseState({})

p('dump', [[]], 2);
p('state', initState.store, 2);

const calculations = () => {
  //Setup inital data
  const screen = document.getElementById('calculations');
  const buttons = document.querySelectorAll('.button')
  const numKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
  const opKeys = ['+', '-', '*', '/'];
  const noStart = ['ESCAPE', 'BACKSPACE', 'ENTER', '/', '*', '+',]
  let keyed = new Array([]);

  //Function called by event listener
  const renderInput = (e, eType) => {
    const targ = (eType === 'click') ? e.target : e.key;
    const val = ( eType === 'click' ) ? targ.value : targ;
    const state = initState.store;
    let keyX = keyed[state.idx];
    //Handle initial non-num clicks
    if ( !keyed.length > 1 && noStart.indexOf(val) !== -1 ) return;

    //Track key presses
    initState.setState(e);
    initState.setCount(1);
    if ( state.val !== state.prevVal ) state.count = 1;
    if ( state.idx < 0 ) state.idx = 0;

    //Handle reset
    if ( state.val === 'ESCAPE' ) {
      state.count = 0;
      state.idx = 0;
      keyed.length = 1;
      keyed[0].length = 0;
      initState.setResults(false);
      initState.setPrevResults(null);
      return;
    }

    //Handle number keys
    if ( state.type === 'int') {
      if ( state.results && state.val === '.' ) {
        if ( state.prevResults % 1 !== 0 ) return;
        initState.setResults(false);
      };

      if ( state.results ) return;

      if ( (state.val === '.' && state.prevVal === '.') || (state.val === '.' && keyX.indexOf('.') !== -1 ) ) return;

      if ( keyX.at(-1) === ')') return;

      if ( state.prevType !== 'int' && !state.prevResults ) {
        if( opKeys.includes(keyX.at(-1)) ) {
          initState.setFlag(false);
          numKeys.forEach(key => {
            if ( keyX.includes(key) ) {
              initState.setFlag(true)
            };
          })
          if ( !state.flag && prevResults !== null ) {
            keyX.push(state.val);
            return;
          }
        }
      }

      if( opKeys.includes(keyX.at(-1)) ) {
        keyed.push(new Array(val))
        initState.setIndex(1);
        return;
      }

      initState.setFlag(false);
      keyX.push(state.val);
    }
    
    //Handle operator keys
    if ( state.type === 'ops' ) {
      initState.setResults(false);
      if ( keyX.at(-1) === '.' ) return;
      
      if ( state.prevType !== 'int' ) {
        if ( state.count > 2 ) {
          return;
        } else {
          if ( keyed[0] < 1 && state.val === '-' ) return keyed[0].push(val);

          const isNum = parseInt(keyX.at(-1));
          if ( keyX.at(-1) === ')' && state.val !== '-' || Number.isInteger(isNum)) return keyX.push(val);

          if ( keyX.length < 2 || state.val !== '-' ) return;

          if ( keyX.at(0) === '(' && state.count > 1 && !keyX.includes(')') ) return;

          keyed.push(new Array('('));
          initState.setIndex(1);
          keyX = keyed[state.idx];
          keyX.push(val);
          return;
        }
      }

      if ( keyX.at(0) === '(' && !keyX.includes(')') ) {
        keyX.push(')');
      }

      keyX.push(state.val);
      return
    }
    
    //Handle delete key
    if ( state.val === 'BACKSPACE') {
      initState.setResults(false);
      if ( keyed[0].length < 1 ) return;

      if ( keyX.at(0) === '(' && keyX.at(1) === '-' && keyX.length < 3 ) {
        keyed.pop();
        initState.setIndex(-1);
        return;
      }

      if ( keyX.length < 2 && state.idx !== 0 ) {
        keyed.pop();
        initState.setIndex(-1);
        return;
      }

      if ( keyX.at(-1) === ')' ) keyX.pop();
      keyX.pop();
    }
    
    //Handle submission
    if ( state.val === 'ENTER') {
      if ( keyX.at(-1) === '.' ) return;

      if ( keyX.indexOf('(') !== -1 && keyX.indexOf(')') === -1 ) keyX.push(')');

      if ( keyed.length < 2 || keyX.length < 1 ) return;

      const results = Math.round(100*calc(pCalc(keyed)))/100;
      keyed.length = 1;
      keyed[0].length = 0;
      state.idx = 0;
      state.count = 0;
      initState.setFlag(false);
      initState.setResults(true);
      initState.setPrevResults(results);
      keyX = keyed[state.idx];
      keyX.push(results);
    }
  }
    
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      renderInput(e, 'click');
      screen.value = (keyed.length === 1 && keyed[0] < 1 ) ? 0 : pString(keyed);
      p('dump', keyed, 2);
      p('state', initState.store, 2);
    })
  })
}

  // window.addEventListener('keydown', (e) => renderInput(e, 'keydown'));


export default calculations