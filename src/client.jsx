import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from 'App/client/store';
import App from 'App/client/edit-sequence';

function AppRoot() {
  return (
    <div className="container">
      <Provider store={createStore()}>
        <App/>
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
