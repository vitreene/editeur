import React, { Component, PropTypes } from 'react'
import { connect }  from 'react-redux';
// import { createContainer } from 'meteor/react-meteor-data'
import {orderList, toggleVue} from 'App/client/actions/edit-sequence-actions'

import SortableList from './list-sortable'


// import SubscribeComponent from 'App/client/store/SubscribeComponent';

// import Vues from 'App/collections/vues'


export class EditSequence extends Component {
// monter le composant quand listeSubs est ready ;
/*
  componentWillMount() {
    this.props.subscribe('vues', 'liste');
  }
*/
  onChange(order){
    orderList( this.props.dispatch, order.filter( x=> x!=='ajouterBtn') )
  }
  onAdd(){ addVue({type : 'ORDER_LIST'})
  }
  onToggle(_id){ toggleVue(this.props.dispatch, _id)
  }

  render() {
     console.log('PROPS ' , this.props );

      return (
        <SortableList
          items= {this.props.vignettes }
          onChange = {this.onChange.bind(this)}
          onAdd = {this.onAdd.bind(this)}
          onToggle = {this.onToggle.bind(this)}
          />
      );
    }
  }


function mapStateToProps(state) {
  return {
    // orderList: ['01','02','03','04','05'] //state.orderList || [] ,
  // orderList: state.orderList || [] ,
    vignettes: state.vignettes || [] ,
  }
}
//export default connect(mapStateToProps) ( SubscribeComponent(EditSequence) );
export default connect(mapStateToProps)(EditSequence) ;




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
/*
function toggleVue() {
  console.log('Basculer l’affichage');

}
*/
