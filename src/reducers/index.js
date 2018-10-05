import { combineReducers } from 'redux';

import authReducer, {getAllCount, addCategory} from './authReducer';

export default combineReducers({
  user: authReducer,
  getAllCount,
  addCategory
  // capture: captureReducer
})
