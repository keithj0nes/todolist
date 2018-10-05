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
  const { uid } = firebase.auth().currentUser;

  console.log('get coutng');
  try {
    firebase.database().ref(`users/${uid}/count`).on('value', snapshot => {
      console.log(snapshot.val(), 'snapshot.val');
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: snapshot.val() || 0
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

export const getTasks = (categoryKey) => dispatch => {
  const { uid } = firebase.auth().currentUser;
console.log(categoryKey, 'CAT KEY IN REDUX');
  console.log('getting tasks');
  return firebase.database().ref(`users/${uid}/categories/${categoryKey}/todos`).on('value', snapshot => {
    dispatch({
      type: 'FETCH_TASKS_SUCCESS',
      payload: snapshot.val() || {}
    })
  })
  // .catch(err => {
  //   dispatch({
  //     type: 'FETCH_TASKS_FAILURE',
  //     payload: err
  //   })
  // })
}

export const addCategory = title => dispatch => {
  const { uid } = firebase.auth().currentUser;

  return firebase.database().ref(`users/${uid}/categories/`).push({
    title
  }).then(() => {
    dispatch({
      type: 'ADD_CAT_SUCCESS',
      // payload: snapshot.val()
    })
  }).catch(err => {
    dispatch({
      type: 'ADD_CAT_FAILURE',
      payload: err
    })
  })
}


// export const addTask = title => dispatch => {
//   const { uid } = firebase.auth().currentUser;
//
// }
