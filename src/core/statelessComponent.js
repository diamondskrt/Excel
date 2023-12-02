import { Component } from './сomponent';

export class StatelessComponent extends Component {
  constructor(root, options) {
    super(root, options);
    this.state = null;
  }

  get template() {
    return JSON.stringify(this.state);
  }

  initState(state) {
    this.state = { ...state };
  }

  setState(state) {
    this.state = { ...this.state, ...state };
    this.root.el.innerHTML = this.template;
  }
}
