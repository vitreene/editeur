import { Component, PropTypes } from 'react'
import { connect }  from 'react-redux';
import {orderList, toggleVue} from 'App/client/actions/edit-sequence-actions'
import SortableList from './list-sortable'
import initialState from 'App/client/actions/init-edit-sequence'

// import SubscribeComponent from 'App/client/store/SubscribeComponent';
// import Vues from 'App/collections/vues'
// import { createContainer } from 'meteor/react-meteor-data'

/*
ici composer la vue avec :
 - la barre du haut -> toggle edit, titre sequence,
 - editSequence
 - la barre du bas -> telco et options
*/

// uses the shorthand form of mapDispatchToProps where each property of the supplied object is expected to be an action creator and is wrapped in a call to dispatch.

// simplifier les actions en envoyant l'index de l'élément qui génere l'action.
// voir http://blog.scottlogic.com/2016/05/19/redux-reducer-arrays.html

// pour tests
const sequence_id = 'liste' ;

class EditSequence extends Component {

  componentWillMount() {
    initialState(this.props.dispatch, sequence_id ) ;
  }

  onChange(order){
    orderList(
      this.props.dispatch,
      order.filter( x=> x!=='ajouterBtn')
    )
  }

  onAdd(){
    addVue({type : 'ORDER_LIST'})
  }

  onToggle(_id){
    toggleVue(this.props.dispatch, _id)
  }

  render() {
    //   console.log('PROPS ' , this.props );
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
  return { vignettes: state.vignettes || []  }
}

export default connect(mapStateToProps)(EditSequence) ;

//export default connect(mapStateToProps) ( SubscribeComponent(EditSequence) );




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
