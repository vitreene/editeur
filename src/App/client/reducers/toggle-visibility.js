import {TOGGLE_VISIBILITY} from 'App/client/constants/actionTypes'

import Vues from 'App/collections/vues'


// pas bon du tout
export default function toggleVue ( state = [] , action ) {
  // action.data contient un array des _ids dans l'ordre
  console.log('state, action', state, action);
  const edit = state.vues.find( x=>x._id===action._id) ;
  console.log('edit', edit, {...state, edit : !edit} ) ;
    switch (action.type) {
      case TOGGLE_VISIBILITY :
      return {...state, edit : !edit};
      default:
      return state;
  }
}
