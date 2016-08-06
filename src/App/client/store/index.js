import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from 'App/client/reducers/rootReducer';

// import Vues from 'App/collections/vues'


const logger = createLogger();

const enhancers = [
  applyMiddleware(ReduxThunk, logger),
  window.devToolsExtension ?
  window.devToolsExtension() :
  f => f
];


// faire : retirer la fonction

export default () => {
const Store = createStore(rootReducer, {}, compose(...enhancers));

  return Store;
};

////////////
