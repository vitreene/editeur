
//import { Meteor } from 'meteor/meteor';
import { Component } from 'react';

export default ComposedComponent => class extends Component {
  constructor() {
    super();
    this.subs = {};
  }

  subscribe(name, ...args) {
    if (this.subs[name])
      this.subs[name].stop();

    this.subs[name] = Meteor.subscribe(name, ...args);
  }

  subscriptionReady(name) {
    if (this.subs[name].ready())
      return this.subs[name].ready();
  }

  componentWillUnmount() {
    Object.keys(this.subs).map(key => this.subs[key].stop());
  }

  render() {
    // console.log('SUBS', this.subscribe);
    return (
      <ComposedComponent
        {...this.props}
        subscribe={this.subscribe.bind(this)}
        subscriptionReady={this.subscriptionReady.bind(this)}
      />
    );
  }
};
