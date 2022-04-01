export default class UseState {
  constructor(props) {
    this.state = {
      prevState: null,
      prevVal: null,
      state: props.state,
      type: props.type,
      val: props.val,
      count: 0,
      idx: 0
    }
  }

  setState(obj) {
    this.state.prevState = this.state.state,
    this.state.prevVal = this.state.val,
    this.state.state = obj.state,
    this.state.type = obj.type,
    this.state.val = obj.val,
    this.state.count = ('up') ? this.state.count + 1 : this.state.count -1,
    this.state.idx = obj.idx
  }
}