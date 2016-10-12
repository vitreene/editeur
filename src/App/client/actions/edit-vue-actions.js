
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
// il y a un conflit de nom avec vignette qui désigne :
// - le thumbnail de la liste des vues,
// - les vues abrégées que je renomme ici et coté serveur "cardVues"
  console.log('saveVue',sequence_id, vue, cardVue);

  vue.metas.date = Date.now() ;

  /*
  à completer :
  choisir le titre : titre, ou description, ou modele de vue
  */
  const titre = (vue.source.titre) ?
    vue.source.titre.slice(0,24) :
    'sans titre' ;

  const report = {
    // vue_id : devient _id coté serveur
    //vignette: "#" pour le serveur, l'url pour le client
    // ordre :
    //"liste_id" : "ma-liste",

    titre,
    visible : true,
    couleur : 'blue', // <------  choix utilisateur
    duree: '2' //duree : moyenne
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
