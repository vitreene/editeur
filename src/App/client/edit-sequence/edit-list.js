import { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import SortableList from './list-sortable'

import {
  ADD_VUE,
  EDIT_VUE,
} from 'App/client/constants/actionTypes'


 class EditList extends Component {

  componentWillMount() {
    let { sequence_id, initialState } = this.props ;
  //  console.log('this.props', sequence_id, initialState);
    initialState( sequence_id ) ;
  }

  onChange(order){
    this.props.orderList( order.filter( x=> x!=='ajouterBtn') )
  }

  onAdd(){
    this.props.addVue(this.props.sequence_id)
  }

  onToggle(_id){ this.props.toggleVue( _id) }

  onEeditVue(_id){
  this.props.editVue(_id, this.props.router)
  }

  render() {
      return (
        <SortableList
          items= {this.props.vignettes }
          onChange = {this.onChange.bind(this)}
          onAdd = {this.onAdd.bind(this)}
          onToggle = {this.onToggle.bind(this)}
          onEeditVue = {this.onEeditVue.bind(this)}
          />
      );
    }
  }

export default withRouter(EditList)

  /*
function addVue() {
  console.log('AJOUTER une vue');
}

function editVue(action, history) {
  console.log('EDITER la vue', history, action._id);  history.push(`/edit-vue/{action._id}`);
}
*/
