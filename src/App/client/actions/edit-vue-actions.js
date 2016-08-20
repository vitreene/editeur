
import {
  SAISIE,
  SAVE_EDIT_VUE,
  UPDATE_VIGNETTE,
} from 'App/client/constants/actionTypes'



export function saisie(dispatch, _id, name, value) {
  return dispatch({
    type : SAISIE,
    saisie : {_id, name, value}
    });
}

export function saveVue(dispatch, _id, vue, vignette, callback){

  console.log('saveVue',_id, vue, vignette);
  console.log('saveVue : callback -> ',callback);

const report = {
  titre:vue.source.titre.slice(0,24),
  vignette: "images-2iADQeK.jpg",
  visible: true,
  couleur : 'blue',
  modele : 'produit',
  skin: '',
};


const vueVignette = Object.assign({}, vignette, report ) ;
/*
-  call saveVue :
-si ok, call save vignette, en lui donnant :
 vignette,titre, visibilité, couleur
si ok, se rendre sur sequence ;
- si error, signaler

// si ok, dans reducer :
- callbck : aller à sequence

si nouvelle vue, il faut enregistrer aussi vignette dans Vue
*/

Meteor.call('saveVue', vue,
  (error, res) => {
    if (error) { // handle error
      console.log('error',error);
      }
    else {
      // console.log('initialState',initialState);
      dispatch({
        type: SAVE_EDIT_VUE,
        vue
      });

      Meteor.call('saveVignette', _id, vueVignette,
        (error, res) => {
          if (error) { // handle error
            console.log('error', error);
          } else {
            // console.log('initialState',initialState);
            dispatch({
              type: UPDATE_VIGNETTE,
              vignette:vueVignette
            });

          callback() ;

          }
        }
      );

    }
  }
 ) ;

}
 /*
 return dispatch( () => {
 Meteor.call('saveVue', vue) ;
 return dispatch({
 type: SAVE_EDIT_VUE,
 vue: vue
 });
 })
 }
 */
