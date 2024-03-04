import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { goalReducer } from '../AddGoal/goalActionTypes';

const rootReducer = combineReducers({
  auth: authReducer,
  goal: goalReducer,
});

export default rootReducer;
