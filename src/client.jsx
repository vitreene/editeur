import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from 'App/client/store';
import {AppRoutes} from 'App/client/start/routes';




function AppRoot() {
  return (
    <div className="container">
      <Provider store={createStore()}>
        <AppRoutes/>
      </Provider>
    </div>
  );
}


Meteor.startup(() => {
  ReactDOM.render(
    <AppRoot />,
    document.getElementById('app')
  );
});
