class StoreSubscriber {
  constructor(store) {
    this.store = store;
    this.prevState = JSON.parse(JSON.stringify(this.store.getState()));
    this.unsubscribes = [];
  }

  subscribe(components) {
    const unsubscribe = this.store.on((state) => {
      Object.keys(state).forEach((key) => {
        const isEqual = JSON.stringify(this.prevState[key]) === JSON.stringify(state[key]);

        if (isEqual) return;

        components.forEach((component) => {
          if (!component.subscribeOnStates.includes(key)) return;

          const changedState = { [key]: state[key] };
          component.onStateChanged(changedState);
        });
      });

      this.prevState = JSON.parse(JSON.stringify(this.store.getState()));
    });

    this.unsubscribes.push(unsubscribe);
  }

  unsubscribe() {
    this.unsubscribes.forEach((unsubscribe) => unsubscribe());
  }
}

export const createStoreSubscriber = (store) => new StoreSubscriber(store);
