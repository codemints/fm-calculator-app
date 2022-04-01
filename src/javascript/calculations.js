import { printJSON as p, consoleLog as c } from '@scripts/custom-functions'
import UseState from '@scripts/state'
import { calculate as calc, parseCalc as pCalc, parseString as pString } from '@scripts/parse'

const initState = new UseState({})
const state = initState.store;

const calculations = () => {
  //Setup inital data
  const screen = document.getElementById('calculations');
  const buttons = document.querySelectorAll('.button')
  const numKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
  const opKeys = ['+', '-', '*', '/'];
  const noStart = ['ESCAPE', 'BACKSPACE', 'ENTER', '/', '*', '+',]
  let keyed = new Array();
  
  //Function called by event listener
  const renderInput = (e, eType) => {
    const targ = (eType === 'click') ? e.target : e.key;
    const val = ( eType === 'click' ) ? targ.value : targ;
    let keyX = keyed[state.idx];
    
    initState.setState({}, e)

    //Handle initial non-num clicks
    if ( keyed.length < 1 && noStart.indexOf(val) !== -1 ) return;

    //Track key presses
    if ( state.val === state.prevVal ) {
      initState.setState({count: 1}, e)
    }


    //Handle reset
    if ( state.val === 'ESCAPE' ) {
      state.count = 0;
      state.idx = 0;
      keyed.length = 0;
      return;
    }

    //Handle number keys
    if ( state.type === 'int') {
      if ( keyed.length < 1 ) {
        keyed.push(new Array(state.val));
        return;
      }
      if ( keyed.length > 0 ) {
        if ( (state.val === '.' && state.prevVal === '.') || (state.val === '.' && keyX.indexOf('.') !== -1 ) ) return;
        keyX.push(state.val);
      }
    }
    
    //Handle operator keys
    if ( state.type === 'ops' && state.val !== '-' ) {
      if ( state.type === state.prevType ) return;
      keyX.push(state.val);
      keyed.push(new Array());
      initState.setState({
        idx: 1
      }, e)
    }
    
    //Handle delete key
    if ( state.val === 'BACKSPACE') {
      console.log('hey')
    }
    
    //Handle submission
    if ( state.val === 'ENTER') {
      console.log('hey')
    }
  }
    
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      renderInput(e, 'click');
      screen.value = (keyed.length !== 0 ) ? pString(keyed) : 0;
      p('dump', keyed, 2);
      p('state', state, 2);
    })
  })
}

  // window.addEventListener('keydown', (e) => renderInput(e, 'keydown'));


export default calculations