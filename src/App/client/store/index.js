import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from 'App/client/reducers/rootReducer';

import Vues from 'App/collections/vues'
import {SET_VIGNETTES} from 'App/client/constants/actionTypes'


import DevTools from './DevTools';
const logger = createLogger();

const enhancers = [
  applyMiddleware(ReduxThunk, logger),
  DevTools.instrument()
];


export default () => {
const Store = createStore(rootReducer, {}, compose(...enhancers));

////////////////////
//const listeSubs = Meteor.subscribe('vues', 'liste');
/////////////////////////

const sequence_id = 'liste' ;

Meteor.call( 'getCurrentSequence', sequence_id,
  (error, initialState) => {
    if (error) { // handle error
      console.log('error',error);
      }
    else {
      console.log('initialState',initialState);
      Store.dispatch({
        type: SET_VIGNETTES,
        vignettes: initialState
      });
    }
  }
 ) ;


/*
  Tracker.autorun( () => {
    Store.dispatch({
      type: SET_VUES,
      vues: Vues.find({}, { sort: { ordre: 1 } }).fetch(),
    });
  });
*/
  return Store;
};

////////////
