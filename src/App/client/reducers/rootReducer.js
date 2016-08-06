import {combineReducers} from 'redux';
import vignettes from './edit-sequence-reducers';

const rootReducer = combineReducers({
  vignettes,
});

export default rootReducer;
