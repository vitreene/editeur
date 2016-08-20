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
  if (!this.props.vignettes.length)
    initialState( sequence_id ) ;
  }

  onChange(order){
    this.props.orderList( order.filter( x=> x!=='ajouterBtn') )
  }

  onAdd(){
    const {
      addVue,
      sequence_id,
      vignettes,
      router
     } = this.props ;

    addVue(sequence_id, vignettes.length, router)
  }

  onToggle(_id){ this.props.toggleVue( _id) }

  onEditVue(_id){
    const {router,editVue} = this.props ;
    editVue(_id, router) ;
  }

  render() {
      return (
        <SortableList
          items= {this.props.vignettes }
          onChange = {this.onChange.bind(this)}
          onAdd = {this.onAdd.bind(this)}
          onToggle = {this.onToggle.bind(this)}
          onEditVue = {this.onEditVue.bind(this)}
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
