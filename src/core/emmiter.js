class Emitter {
  constructor() {
    this.listeners = {};
  }

  emit(eventName, params) {
    if (eventName in this.listeners) {
      this.listeners[eventName].forEach((listener) => listener(params));
    }
  }

  subscribe(eventName, callback) {
    if (eventName in this.listeners) {
      this.listeners[eventName].push(callback);
    } else {
      this.listeners[eventName] = [callback];
    }

    return () => {
      this.listeners[eventName] = this.listeners[eventName]
        .filter((listener) => listener !== callback);
    };
  }
}

export const createEmitter = () => new Emitter();
