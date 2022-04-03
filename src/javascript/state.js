export default class UseState {
  constructor(props) {
    this.store = {
      prevResults: null,
      prevType: null,
      prevVal: null,
      prevFlag: null,
      results: false,
      type: props.type,
      val: props.val,
      flag: false,
      count: 0,
      idx: 0
    }
  }

  setCount(val) { this.store.count += val };
  setIndex(val) { this.store.idx += val };
  setFlag(bool) { this.store.flag = bool };
  setResults(bool) { this.store.results = bool }
  setPrevResults(val) { this.store.prevResults = val }
  
  setState(event) {
    this.store.prevType = this.store.type;
    this.store.prevFlag = this.store.flag;
    this.store.prevVal = this.store.val;
    this.store.type = event.target.dataset.type;
    this.store.val = event.target.value;
  }
}