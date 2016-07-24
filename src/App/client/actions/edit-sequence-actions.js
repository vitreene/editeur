
import {ORDER_VUES} from 'App/client/constants/actionTypes'
import {dispatch} from 'App/client/store'

/*
les actions creator generent un appel à une methode Meteor
*/

// action creator : engeristrer sur meteor

export function orderList(data){
  console.log('orderList(data)', data);
  return dispatch( () => {
    Meteor.call('orderList', data) ;
    return dispatch({
      type: ORDER_VUES,
      data: data
    });
  })
}
