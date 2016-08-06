
import {
  ORDER_VIGNETTES,
  TOGGLE_VISIBILITY,
  ADD_VUE,
  EDIT_VUE,
} from 'App/client/constants/actionTypes'


// ajouter error, result en retour de meteor.call

export function orderList(dispatch, list){
  console.log('orderList(list)', list);

  return dispatch( () => {
    Meteor.call('orderList', list) ;
    return dispatch({
      type: ORDER_VIGNETTES,
      list: list
    });
  })
}

export function toggleVue(dispatch, _id){
  console.log('TOGGLE_VISIBILITY', _id);

  return dispatch( () => {
    Meteor.call('toggleVue', _id) ;
    return dispatch({
      type: TOGGLE_VISIBILITY,
      _id: _id
    });
  })
}

export function addVue(dispatch,sequence_id) {
//  console.log('AJOUTER une Vue');
  return dispatch({
    type : ADD_VUE,
    sequence_id : sequence_id
    });
}

export function editVue(dispatch, _id, history) {

//  const action ={type : EDIT_VUE, _id:_id};
//  console.log('EDITER la Vue', history, _id);
//  history.push(`/edit-vue/{_id}`);
  return dispatch({
    type : EDIT_VUE,
    history : history,
    _id:_id
    });
}
