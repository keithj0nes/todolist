import { combineReducers } from 'redux';

import authReducer, {counts, categories, tasks} from './authReducer';

export default combineReducers({
  user: authReducer,
  counts,
  categories,
  tasks
  // capture: captureReducer
})
