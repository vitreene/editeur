
import {
  SAISIE,
  SAVE_EDIT_VUE,
} from 'App/client/constants/actionTypes'



export function saisie(dispatch,_id, name, value) {
//  console.log('AJOUTER une Vue');
  return dispatch({
    type : SAISIE,
    modif : {_id, name, value}
    });
}

export function saveVue(dispatch, _id, vue,callback){
  console.log('saveVue', vue);
callback() ;
/*
- attendre le retour du call :
-si ok, se rendre sur sequence ;
- si error, signaler

// si ok, dans reducer :
- effacer l'entrée dans vue
- callbck : aller à sequence
*/
  return dispatch( () => {
    Meteor.call('saveVue', vue) ;
    return dispatch({
      type: SAVE_EDIT_VUE,
      vue: vue
    });
  })
}
