const connect = (store, mapState) => ({
  get: mapState ? () => mapState(store.getState()) : () => store.getState(),
  connect: (host, key, invalidate) => store.subscribe(invalidate),
});

export const connectComponent = (reduxStore, reduxStoreDictionary, component) => {
  const store = reduxStore.getState();
  console.log(store);
  Object.keys(store).forEach(reduxStoreName => {
    const componentProperty = reduxStoreDictionary[reduxStoreName];
    component.props[componentProperty] = store[reduxStoreName];
  });
  console.log(component);
  return component;
}

export default connect;