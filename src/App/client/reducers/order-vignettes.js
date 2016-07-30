import {ORDER_VIGNETTES} from 'App/client/constants/actionTypes'

import Vues from 'App/collections/vues'


export default function orderVignettes ( state = [] , action ) {
  // action.data contient un array des _ids dans l'ordre
    switch (action.type) {
      case ORDER_VIGNETTES :
      return action.list;
      default:
      return state;
  }
}
