export default class UseState {
  constructor(props) {
    this.store = {
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
    this.store.count = 0;
    this.store.idx = 0;
  }

  setState(props, event) {
    this.store.prevType = this.store.type;
    this.store.prevState = this.store.state;
    this.store.prevVal = this.store.val;
    this.store.type = event.target.dataset.type;
    this.store.val = event.target.value;
    for ( const key in props ) {
      if ( key && key === 'state' ) {
        this.store.state = props.state;
      }
      if ( key && key === 'count' ) {
        ( props[key] === 0 ) ? this.store.count = 0 : this.store.count += props[key];
      }
      if ( key && key === 'idx' ) {
        ( props[key] === 0 ) ? this.store.count = 0 : this.store.idx += props[key];
      }
    }
  }

  setValue() {

  }
}