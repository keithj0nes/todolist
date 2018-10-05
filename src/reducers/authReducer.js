export default authReducer = (state = {}, action) => {

const {type, payload} = action;
  switch(action.type){
    case 'AUTH_SET_USER':
    // console.log(payload, 'loging payload in authReducer');
      return payload;
    case 'AUTH_LOG_OUT':
    const newState = {...state, payload: null}
      return {...state, payload: null}
    default:
      return state
  }
}


export const addStoryReducer = (state = {}, action) => {

  const {type, payload} = action;
  // console.log(type, payload, 'type and payload');
  switch(action.type){
    case 'UPDATE_DESCRIPTION':
      return {...state, description: payload};
    case 'UPDATE_TAGS':
      return {...state, tags: payload};
    case 'UPDATE_NAME_OF_SUBJECTS':
      return {...state, nameOfSubjects: payload};
    default:
      return state;
  }
}



export const getAllCount = (state = {}, action) => {
  const {type, payload} = action;
  switch(type){
    case "FETCH_SUCCESS":
      return {...state, payload: payload, isLoading: false};
    case "FETCH_FAILURE":
      console.log(payload, 'fetch failed');
      return {...state, error: payload, isLoading: false};
    default:
      return state;
  }
}

export const getTasks = (state = {}, action) => {
  const {type, payload} = action;
  switch(type){
    case "FETCH_TASKS_SUCCESS":
    console.log(payload, 'PAYLOAD IN TAKSTS SUCESS');
      return {...state, payload: payload, isLoading: false};
    case "FETCH_TASKS_FAILURE":
      console.log(payload, 'fetch tasks failed');
      return {...state, error: payload, isLoading: false};
    default:
      return state;
  }
}



export const addCategory = (state = {}, action) => {
  const {type, payload} = action;
  switch(type){
    case "ADD_CAT_SUCCESS":
      return {...state, isLoading: false};
    case "ADD_CAT_FAILURE":
      console.log(payload, 'addCategory failed');
      return {...state, error: payload, isLoading: false};
    default:
      return state;
  }

}

// export const getCount = (state = {}, action) => {
//   const { type, payload } = action;
//   // switch(type){
//   //   case
//   // }
// }


//
// export default(state = null, action) => {
//   const {type, payload} = action;
//   switch (type) {
//
//     case 'city_SET':
//       return payload;
//     case 'city_CREATE':
//       return [
//         payload, ...state
//       ];
//     case 'city_UPDATE':
//       return state.map(item => (item.id === payload.id
//         ? payload
//         : item));
//     case 'city_DELETE':
//       return state.filter(item => item.id !== payload.id);
//     default:
//       return state;
//   }
// };
