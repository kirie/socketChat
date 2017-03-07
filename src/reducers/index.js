import { combineReducers } from 'redux';
import featureReducer from './feature_reducer';

const rootReducer = combineReducers({
  feature: featureReducer
});

export default rootReducer;
