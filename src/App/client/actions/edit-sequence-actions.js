
import {
  ORDER_VIGNETTES,
  TOGGLE_VISIBILITY,
  ADD_VUE,
  EDIT_VUE,
  LOAD_EDIT_VUE,
} from 'App/client/constants/actionTypes'

import newVue from  'App/client/reducers/nouvelle-vue'


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

export function addVue(dispatch,sequence_id,length, history) {
//console.log('add vue history', history);

  const vue = newVue(sequence_id, length) ;
  const {vignette, ...vueedit} = vue ;

  dispatch({
  type : ADD_VUE,
  vignette
  })

  dispatch({
  type : LOAD_EDIT_VUE,
  vue: vueedit
  })

  return dispatch({
    type : EDIT_VUE,
    history : history,
    _id:vignette._id
  });
}

export function editVue(dispatch, _id, history) {
//  const action ={type : EDIT_VUE, _id:_id};
//  console.log('EDITER la Vue', history, _id);
//  history.push(`/edit-vue/{_id}`);
  return dispatch({
    type : EDIT_VUE,
    history,
    _id
  });
}
