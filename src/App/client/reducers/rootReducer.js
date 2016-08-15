import {combineReducers} from 'redux';
//import {reducer as formReducer} from 'redux-form';
import vignettes from './edit-sequence-reducers';
import vue from './edit-vue-reducers';

const rootReducer = combineReducers({
//  form:formReducer,
  vignettes,
  vue,
});

export default rootReducer;
