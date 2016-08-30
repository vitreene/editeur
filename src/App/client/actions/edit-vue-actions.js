
import {
  SAISIE,
  SAVE_EDIT_VUE,
  UPDATE_VIGNETTE,
} from 'App/client/constants/actionTypes'



export function saisie(dispatch,_id, name, value) {
  console.log('ARGUMENTS', arguments);
  return dispatch({
    type : SAISIE,
    saisie : {_id, name, value}
  });
}

export function saveVue(dispatch, _id, vue, vignette, callback){

  console.log('saveVue',_id, vue, vignette);
  console.log('saveVue : callback -> ',callback);

  vue.metas.date = Date.now() ;

  /*
  à completer :
  choisir le titre : titre, ou description, ou modele de vue
  */

  const titre = (vue.source.titre) ?
  vue.source.titre.slice(0,24) :
  'sans titre' ;

  const report = {
    titre,
    //vignette: "images-2iADQeK.jpg",
    // ref de l'image
    visible : true,
    couleur : 'blue',
    modele : 'produit',
    skin: '',
  };


  //const vueVignette = Object.assign({}, vignette, report, {vignette: '#'} ) ;

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

        Meteor.call('saveVignette',
         _id,
        Object.assign({},
          vignette,
          report,
          // ne pas passer la vignette vers le serveur
          {vignette: '#'}
        ),
         vue.source.ikono_id,

         (error, res) => {
            if (error) { // handle error
              console.log('error', error);
            } else {
              dispatch({
                type: UPDATE_VIGNETTE,
                vignette: Object.assign({},vignette,report)
              });

            callback() ;

            }
          }
        );

      }
    }
   ) ;

}
