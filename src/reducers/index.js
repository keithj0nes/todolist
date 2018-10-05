import { combineReducers } from 'redux';

import authReducer, {getAllCount, addCategory, getTasks} from './authReducer';

export default combineReducers({
  user: authReducer,
  getAllCount,
  addCategory,
  getTasks
  // capture: captureReducer
})
