import { useEffect, useState } from 'react';
import { IHookStateInitAction, IHookStateSetAction, resolveHookState } from './hookState';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export function createGlobalState<S = any>(
  initialState: IHookStateInitAction<S>
): () => [S, (state: IHookStateSetAction<S>) => void];
export function createGlobalState<S = undefined>(): () => [
  S,
  (state: IHookStateSetAction<S>) => void
];

export function createGlobalState<S>(initialState?: S) {
  const store: {
    state: S;
    setState: (state: IHookStateSetAction<S>) => void;
    setters: any[];
  } = {
    state: initialState instanceof Function ? initialState() : initialState,
    setState(nextState: IHookStateSetAction<S>) {
      store.state = resolveHookState(nextState, store.state);
      store.setters.forEach((setter) => setter(store.state));
    },
    setters: [],
  };

  return () => {
    const [globalState, stateSetter] = useState<S | undefined>(store.state);

    useEffect(
      () => () => {
        store.setters = store.setters.filter((setter) => setter !== stateSetter);
      },
      []
    );

    useIsomorphicLayoutEffect(() => {
      if (!store.setters.includes(stateSetter)) {
        store.setters.push(stateSetter);
      }
    });

    return [globalState, store.setState];
  };
}

export default createGlobalState;
