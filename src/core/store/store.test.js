import { initialState, actions } from '@/store/constants';
import { rootReducer } from '@/store/rootReducer';
import { createStore } from './store';

const store = createStore(rootReducer, initialState);
const handler = jest.fn();

describe('createStore:', () => {
  test('should return store', () => {
    expect(store).toBeDefined();
    expect(store.on).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.getState).toBeDefined();
    expect(store.getState()).toMatchObject(initialState);
  });

  test('should not called listener when unsubscribe occurred', () => {
    const unsubscribe = store.on(handler);
    unsubscribe();
    store.dispatch({ type: actions.appTitleEdit, data: 'appTitle' });
    expect(handler).not.toHaveBeenCalled();
  });

  test('should change state on dispatch action', () => {
    store.dispatch({ type: actions.appTitleEdit, data: 'appTitle' });
    expect(store.getState().appTitle).toBe('appTitle');
  });

  test('should called listener with state payload', () => {
    store.on(handler);
    store.dispatch({ type: actions.appTitleEdit, data: 'appTitle' });
    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(store.getState());
  });
});
