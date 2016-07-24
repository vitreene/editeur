import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from 'App/client/store';
import App from 'App/client/edit-sequence';
// import App from 'App/client/HelloApp';

function AppRoot() {
  return (
    <div className="container">
      <Provider store={Store}>
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
