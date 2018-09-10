export const CHANGE_STATE = 'CHANGE_STATE';

export const changeEntryState = ({key, value}) => {
  return {
    type: CHANGE_STATE,
    payload: {
      key,
      value
    }
  }
}