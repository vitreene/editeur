import ReactDOM from 'react-dom';
import App from 'App/client/list-vues';
// import App from 'App/client/HelloApp';
import React from 'react';

Meteor.startup(() => {
  ReactDOM.render(
    <App />,
    document.getElementById('react-app')
  );
});
