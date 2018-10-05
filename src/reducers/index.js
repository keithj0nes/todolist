import { combineReducers } from 'redux';

import authReducer, {getAllCount, categories, getTasks} from './authReducer';

export default combineReducers({
  user: authReducer,
  getAllCount,
  categories,
  getTasks
  // capture: captureReducer
})
