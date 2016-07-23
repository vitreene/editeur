import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';


import  Vues  from 'App/collections/vues';

//console.log('Vues :', Vues.findOne({_id:'WYhTar2FPAbSFoSgE'}) );

// App component - represents the whole app
class App extends Component {
  renderVues() {
    console.log('Vues', this.props.vues );

    return this.props.vues.map((vue) => (
      <Vue key={vue._id} vue={vue} />
    ));
  }

  render() {
      return (
        <div className="container">
          <header>
            <h1>Vues</h1>
          </header>

          <ul>
            {this.renderVues()}
          </ul>
        </div>
      );
    }
  }


App.propTypes = {
  vues: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('vues');
  console.log('fetch', Vues.find().fetch() );
  return {
    vues: Vues.find().fetch().vues,
  };
}, App);


class Vue  extends Component {
  render() {
    console.log('props', this.props);
    return (
      <li>{this.props.vue.titre}</li>
    );
  }
}

Vue.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  vue: PropTypes.object.isRequired,
};
