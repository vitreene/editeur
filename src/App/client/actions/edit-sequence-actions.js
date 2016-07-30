
import {
  ORDER_VIGNETTES,
  TOGGLE_VISIBILITY,
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
