class Store {
  #state;

  constructor(rootReducer, initialState = {}) {
    this.#state = rootReducer({ ...initialState }, { type: 'init' });
    this.listeners = [];
    this.rootReducer = rootReducer;
  }

  on(callback) {
    this.listeners.push(callback);

    return () => {
      this.listeners = this.listeners
        .filter((listener) => listener !== callback);
    };
  }

  dispatch(action) {
    this.#state = this.rootReducer(this.#state, action);
    this.listeners.forEach((listener) => listener(this.#state));
  }

  getState() {
    return this.#state;
  }
}

export const createStore = (
  rootReducer,
  initialState,
) => new Store(rootReducer, initialState);
