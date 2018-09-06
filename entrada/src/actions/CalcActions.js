export const increment = (value = 1) =>
  (dispatch) => {
    dispatch({
      type: 'INCREMENT',
      payload: value
    });
  }

export const decrement = (value = 1) =>
  (dispatch) => {
    dispatch({
      type: 'DECREMENT',
      payload: value
    });
  }