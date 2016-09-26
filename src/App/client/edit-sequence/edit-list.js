import { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import SortableList from './list-sortable'

/*
import {
  ADD_VUE,
  EDIT_VUE,
} from 'App/client/constants/actionTypes'

*/

 class EditList extends Component {

  componentWillMount() {
    const { dispatch, params:{sequence_id}, initialState } = this.props;
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
      params:{sequence_id},
      vignettes,
      router
     } = this.props ;

    addVue(dispatch, sequence_id, vignettes.length, router)
  }

  onToggle(_id){
    const {dispatch,toggleVue, params:{sequence_id}} = this.props;
    toggleVue(dispatch, _id, sequence_id) ;
  }

  onEditVue(vue_id){
    const {dispatch,router, editVue, params:{sequence_id}} = this.props;
    editVue(dispatch, vue_id, sequence_id, router) ;
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
