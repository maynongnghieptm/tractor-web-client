// action type
export const UPDATE_SOCKET_DATA = 'UPDATE_SOCKET_DATA';

// action creator
export const updateSocketData = (data) => ({
  type: UPDATE_SOCKET_DATA,
  payload: data,
});
export const getDataFromRedux = (data) => ({
    type: 'GET_DATA_FROM_REDUX',
    payload: data,
  });