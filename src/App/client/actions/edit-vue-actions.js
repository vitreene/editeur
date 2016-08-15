
import {
  SAISIE,
} from 'App/client/constants/actionTypes'



export function saisie(dispatch,_id, name, value) {
//  console.log('AJOUTER une Vue');
  return dispatch({
    type : SAISIE,
    modif : {_id, name, value}
    });
}
