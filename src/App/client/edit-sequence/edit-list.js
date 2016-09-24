import { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import SortableList from './list-sortable'

import {
  ADD_VUE,
  EDIT_VUE,
} from 'App/client/constants/actionTypes'


 class EditList extends Component {

  componentWillMount() {
    const { dispatch, sequence_id, initialState } = this.props ;
    //  console.log('this.props', sequence_id, initialState);
    if (!this.props.vignettes.length)
      initialState( dispatch, sequence_id ) ;
    }

  onChange(order){
    const {dispatch,orderList, params:{sequence_id}} = this.props;
    orderList( dispatch, order.filter( x=> x!=='ajouterBtn'), sequence_id ) ;
  }

  onAdd(){
    const {
      dispatch,
      addVue,
      sequence_id,
      vignettes,
      router
     } = this.props ;

    addVue(dispatch, sequence_id, vignettes.length, router)
  }

  onToggle(_id){
    const {dispatch,toggleVue, params:{sequence_id}} = this.props;
    toggleVue(dispatch, _id, sequence_id) ;
  }

  onEditVue(_id){
    const {dispatch,router,editVue, params:{sequence_id} } = this.props ;
    editVue(dispatch, _id, sequence_id, router) ;
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
