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



export const counts = (state = {}, action) => {
  const {type, payload} = action;
  switch(type){
    case "FETCH_SUCCESS":
      return {...state, total: payload, };
    case "GET_CLOSED_SUCCESS":
      return {...state, closed: payload, };
    case "FETCH_FAILURE":
      console.log(payload, 'fetch failed');
      return {...state, error: payload, };
    default:
      return state;
  }
}

export const tasks = (state = {}, action) => {
  const {type, payload} = action;
  switch(type){
    case "FETCH_TASKS_SUCCESS":
    console.log(payload, 'PAYLOAD IN TAKSTS SUCESS');
      return {...state, payload: payload};
    case "FETCH_TASKS_FAILURE":
      console.log(payload, 'fetch tasks failed');
      return {...state, error: payload};
    case "ADD_TASK_SUCCESS":
      return {...state};
    case "ADD_TASK_FAILURE":
      return {...state, error: payload};
    case "DELETE_TASK_FAILURE":
      return {...state, error: payload};
    default:
      return state;
  }
}



export const categories = (state = {}, action) => {
  const {type, payload} = action;
  switch(type){
    case "ADD_CAT_SUCCESS":
      return {...state, };
    case "ADD_CAT_FAILURE":
      console.log(payload, 'addCategory failed');
      return {...state, error: payload, };
    case "ADD_CAT_KEY":
      return {...state, categoryKey: payload, };
    case "GET_CATEGORIES_SUCCESS":
      return {...state, allCategories: payload};
    case "GET_CATEGORIES_FAILURE":

    console.log(payload, 'get all categories failed');
      return {...state, error: payload};
    case "GET_CATEGORIES_COUNT_SUCCESS":

      console.log('payload', payload);
      return {...state};
    case "UPDATE_CAT_COUNT":
      console.log(state, 'checking count!!');


    case "NULLIFY_TITLE":
      return {...state}



    default:
      return state;
  }

}


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
