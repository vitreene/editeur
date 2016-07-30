
import {combineReducers} from 'redux';
//import orderList  from './order-vignettes';
import vignettes from './set-vignettes';
//import toggleVue from './toggle-visibility';

const rootReducer = combineReducers({
//  orderList,
  vignettes,
//  toggleVue
});

export default rootReducer;
