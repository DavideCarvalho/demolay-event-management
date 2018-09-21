import database from '../firebase';

export const CHANGE_ENTRY_STATE = 'CHANGE_ENTRY_STATE';
export const ADD_NEW_PERSON = 'ADD_NEW_PERSON';
export const CHANGE_PERSON_LIST = 'CHANGE_PERSON_LIST';
export const LOADING = 'LOADING';

export const changeEntryState = ({ key, value }) => ({
  type: CHANGE_ENTRY_STATE,
  payload: {
    key,
    value,
  },
});

const addToReport = async ({ boughtOnEntry }) => new Promise(async (resolve, reject) => {
  try {
    const reportValue = {
      totalDePessoas: 1,
      compradoNaEntrada: boughtOnEntry ? 1 : 0,
    };
    const reportRef = await database.collection('/report').doc('/pessoas').get();
    if (!reportRef.exists) {
      database.collection('/report').doc('/pessoas').set(reportValue);
      resolve();
      return;
    }
    const existingReportData = reportRef.data();
    let { totalDePessoas, compradoNaEntrada } = existingReportData;
    totalDePessoas = totalDePessoas
      ? totalDePessoas + reportValue.totalDePessoas
      : reportValue.totalDePessoas;
    compradoNaEntrada = compradoNaEntrada
      ? compradoNaEntrada + reportValue.compradoNaEntrada
      : reportValue.compradoNaEntrada;
    const updatedReportData = { ...existingReportData, totalDePessoas, compradoNaEntrada };
    await database.collection('/report').doc('/pessoas').set(updatedReportData);
    resolve();
  } catch (e) {
    reject(e);
  }
});

export const addNewPerson = ({ commandNumber, boughtOnEntry }) => async (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  });
  try {
    const personRef = await database.collection('/pessoas').doc(commandNumber).get();
    if (personRef.exists) throw new Error('already exists');
    const person = {
      comanda: commandNumber,
      compradoNaEntrada: boughtOnEntry,
      pago: false,
    };
    database.collection('/pessoas').doc(commandNumber).set(person);
    addToReport({ boughtOnEntry });
    dispatch({
      type: ADD_NEW_PERSON,
      payload: {
        commandNumber,
        boughtOnEntry,
        paid: false,
      },
    });
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  } finally {
    dispatch({
      type: LOADING,
      payload: false,
    });
  }
};
