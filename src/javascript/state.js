export default class UseState {
  constructor(props) {
    this.state = {
      type: props.type,
      val: props.val,
      state: props.state,
      prevType: null,
      prevVal: null,
      prevState: null,
      count: 0,
      idx: 0
    }
  }

  clearState() {
    this.state.count = 0;
    this.state.idx = 0;
  }

  setState(props, event) {
    this.state.prevType = this.state.type;
    this.state.prevState = this.state.state;
    this.state.prevVal = this.state.val;
    this.state.type = event.target.dataset.type;
    this.state.val = event.target.value;
    for ( const key in props ) {
      if ( key && key === 'state' ) {
        this.state.state = props.state;
      }
      if ( key && key === 'count' ) {
        ( props[key] === 0 ) ? this.state.count = 0 : this.state.count += props[key];
      }
      if ( key && key === 'idx' ) {
        ( props[key] === 0 ) ? this.state.count = 0 : this.state.idx += props[key];
      }
    }
  }

  setValue() {

  }
}