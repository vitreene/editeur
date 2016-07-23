import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'

import SortableList from './list-sortable'
import {liste} from 'App/imports/vues-liste'
import Vues from 'App/collections/vues'
//console.log(liste);

export default class App extends Component {
  onChange(order){
    orderList({
      type : 'ORDER_LIST',
      data : order
    })
  }
  onAdd(){ addVue({type : 'ORDER_LIST'})
  }

  render() {
     console.log('PROPS ',  this.props );
      return (
        <SortableList
          items= {this.props.liste}
          onChange = {this.onChange.bind(this)}
          onAdd = {this.onAdd.bind(this)}
          />
      );
    }
  }

export default createContainer(() => {
  Meteor.subscribe('vues', 'liste');
  return {
    liste: Vues.find({}, { sort: { ordre: 1 } }).fetch() ,
  };
}, App);



/// ACTIONS CREATORS
function  orderList(action){
  //console.log('orderList',action.data, Vues.find({}).fetch());
  for (let i=0 ; i< action.data.length ; i++){
    Vues.update(action.data[i], {$set: {ordre:i}})
  }
  /*
    const vues = this.props.liste ;
    const newOrder = order
      .filter( o => { return o!=='ajouterBtn'} )
      .map( o => {
        return vues.find( x => x.ordre.toString() === o.toString() )
      } ) ;
    this.setState({ liste: newOrder });
  */
}

function addVue() {
  console.log('AJOUTER une vue');

}
