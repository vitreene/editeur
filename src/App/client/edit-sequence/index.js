import React, { Component, PropTypes } from 'react'
import { connect }  from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data'
import {orderList} from 'App/client/actions/edit-sequence-actions'

import SortableList from './list-sortable'

import Vues from 'App/collections/vues'


export class EditSequence extends Component {
  onChange(order){
    orderList( order.filter( x=> x!=='ajouterBtn') )
  }
  onAdd(){ addVue({type : 'ORDER_LIST'})
  }
  onToggle(){ toggleVue({type : 'TOGGLE_VUE'})
  }

  render() {
     console.log('PROPS ',  this.props );
      return (
        <SortableList
          items= {this.props.liste}
          onChange = {this.onChange.bind(this)}
          onAdd = {this.onAdd.bind(this)}
          onToggle = {this.onToggle.bind(this)}
          />
      );
    }
  }

const EditSequenceContainer = createContainer(() => {
  const listeSubs = Meteor.subscribe('vues', 'liste');
  return {
    listeReady: listeSubs.ready(),
    liste: Vues.find({}, { sort: { ordre: 1 } }).fetch() ,
  };
}, EditSequence);


// export default EditSequenceContainer


function mapStateToProps(state) {
  return {
    orderList: state.orderList,
  }
}

export default connect(mapStateToProps)(EditSequenceContainer);




/// ACTIONS CREATORS
/*
function  orderList(action){
  const{data} = action ;
  Meteor.call('orderList', data) ;
  }
  */



  /*
  for (let i=0 ; i< data.length ; i++){
    Vues.update(data[i], {$set: {ordre:i}})
    }
    Vues.update( { _id:{$each:data} },
      { $push: {ordre:  { $each: [1,2,3,4,5,6,7,8,9,10,11,12] } }})
      */

  /*
    const vues = this.props.liste ;
    const newOrder = order
      .filter( o => { return o!=='ajouterBtn'} )
      .map( o => {
        return vues.find( x => x.ordre.toString() === o.toString() )
      } ) ;
    this.setState({ liste: newOrder });
  */

function addVue() {
  console.log('AJOUTER une vue');

}

function toggleVue() {
  console.log('Basculer l’affichage');

}
