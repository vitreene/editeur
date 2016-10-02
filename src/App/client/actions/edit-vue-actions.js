
import {
  SAISIE,
  SAVE_EDIT_VUE,
  UPDATE_CARDVUE,
} from 'App/client/constants/actionTypes'



export function saisie(dispatch, vue_id, name, value) {
//  console.log('ARGUMENTS', arguments);
  return dispatch({
    type : SAISIE,
    saisie : {vue_id, name, value}
  });
}

export function saveVue(dispatch, sequence_id, vue, cardVue, callback){

  console.log('saveVue',sequence_id, vue, cardVue);
/*
saveVue
_id : gfM2cTvZn4joCs7No
vue :  {
  source: Object,
  metas: Object,
  ikono: Object
}
------> Vue{
    "sequence_id" : "liste",
    "source_id" : "01",
    "metas_id" : "met01",
    "modele" : "affiche-produit", <------  choix utilisateur
    "skin" : "default" <------  choix utilisateur
}

cardvue = cardVue : {
  _id: "gfM2cTvZn4joCs7No"
  couleur  : null,
  ordre  :  4,
  titre  :   null,
  vignette  :    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQAB...2cjbRRRQB/9k=",
  visible: null
}
*/
  console.log('saveVue : callback -> ',callback);
/*
saveVue: callback - > callback() {
  return _this2.context.router.push(path);
}
*/
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
    couleur : 'blue', // <------  choix utilisateur
    //modele : 'produit',
    //skin: '',
  };

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

// SaveVue enregistre les données dans source, metas, ikono puis Vues.
// update sequence met à jour CardVues (visible, order, url vignette)
  Meteor.call('saveVue', vue, cardVue.vue_id, sequence_id,
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

        Meteor.call('addToSequence',
         sequence_id,
        Object.assign({},
          cardVue,
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
                type: UPDATE_CARDVUE,
                // l'image-vignette est passée en local
                // renomer key: vignette en key: cardVue
                vignette: Object.assign({}, cardVue, report)
              });

            callback() ;

            }
          }
        );

      }
    }
   ) ;

}
