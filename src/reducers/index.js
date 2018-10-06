import { combineReducers } from 'redux';

import authReducer, {getAllCount, categories, tasks} from './authReducer';

export default combineReducers({
  user: authReducer,
  getAllCount,
  categories,
  tasks
  // capture: captureReducer
})
