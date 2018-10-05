import firebase from 'firebase';

// export function fetchSearchData(args) {
//   return async (dispatch) => {
//     // Initiate loading state
//     dispatch({
//       type: FETCH_SEARCH_DATA
//     });
//     try {
//       // Call the API
//       const result = await fetchSearchData(args.pageCount, args.itemsPerPage);
//
//      // Update payload in reducer on success
//      dispatch({
//         type: FETCH_SEARCH_SUCCESS,
//         payload: result,
//         currentPage: args.pageCount
//       });
//     } catch (err) {
//      // Update error in reducer on failure
//      dispatch({
//         type: FETCH_SEARCH_FAILURE,
//         error: err
//       });
//     }
//   };
// }

export const getCount = () => dispatch => {
  console.log('get coutng');
  const { uid } = firebase.auth().currentUser;
  try {
    firebase.database().ref(`users/${uid}/count`).on('value', snapshot => {
      console.log(snapshot.val(), 'snapshot.val');
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: snapshot.val()
      })
    })
  }
  catch (err) {
    console.log(err, 'errorrrr');
    dispatch({
      type: 'FETCH_FAILURE',
      payload: err
    })
  }
  //   firebase.database().ref(`users/${uid}/categories`).on('value', snapshot => {
  //
  // }
}
