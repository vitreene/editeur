import {ORDER_VUES} from 'App/client/constants/actionTypes'

// reducer enregistre la liste des vues
export default function orderList ( state =[] , action ) {
  // action.data contient un array des _ids dans l'ordre
    switch (action.type) {
      case ORDER_VUES :
      return action.data;
      default:
      return state;
  }
}
