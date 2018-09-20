// import store from './store';

const connect = (reducer, mapState) => ({
  get: mapState ? () => mapState(reducer.getState()) : () => reducer.getState(),
  connect: (host, key, invalidate) => reducer.subscribe(invalidate),
});

export const connectComponent = (
  reduxStore,
  reduxStoreDictionary = {},
  actionsDictionary = {},
  component,
) => {
  let componentWithProps = { ...component, props: connect(reduxStore) };
  // Object.keys(actionsDictionary).forEach(actionPropertyName => {
  //   componentWithProps.actions[actionPropertyName] = actionsDictionary[actionPropertyName];
  // }
  Object.keys(actionsDictionary).forEach((actionPropertyName) => {
    componentWithProps = {
      ...componentWithProps,
      actions: {
        ...componentWithProps.actions,
        [actionPropertyName]: actionsDictionary[actionPropertyName],
      },
    };
  });
  return componentWithProps;
};

export default connect;
