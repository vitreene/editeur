/*
  Instance se charge de creer une Projection à partr des données enregistrées.
  en entrée : _id de la vue
  en sortie : vue dans Projection,
    vignette à jour dans Vues.

  Etapes updateVue
  - redefinir le bon modele
  - charger le profil du modele
  - recueillir les metas de positionnement, le rythme et le tempo
  - determiner les influences de positionnement
  - générer les données pour chaque element de la vue.
  - mettre à jour Projection
  - pour l'image : y-a t'il eu modification ? si oui, generer proxy

  Etapes Creer Projection
  - assigné à une zone ? oui -> dimensions non-> default
  - sequence principale
  - reperer toutes ls séquences utilisées par la projection

  Etapes Creer sequence

*/

import { profils, termes } from 'App/server/Instance/reglages'

import {
  reCompose,
  getPosition,
  collecteComposants
} from 'App/server/Instance/utils'

import findModele    from 'App/server/Instance/find-modele'
import processSource from 'App/server/Instance/process-source'
import processBlocs  from 'App/server/Instance/process-blocs'
import processIkono  from 'App/server/Instance/process-ikono'

//temp : nom de la zone de diffusion
// const zone = 'ecran01' ;


export default function Instance(vue_id, sequence_id='liste') {
  // ->  source, ikono, metas, + vue
  const vue = Meteor.call('getVue', vue_id, 'vue') ;
  const seq = Meteor.call('getSequence', sequence_id ) ;
  return creerInstance(vue[vue_id], seq) ;
}


function  creerInstance( { source, ikono, metas, vue }, seq ){

  if (Meteor.isClient) console.log('INSTANCE est sur CLIENT');
  if (Meteor.isServer) console.log('INSTANCE est sur SERVEUR');

  const {zone, tempo, rythme} = seq ;
  const tempoTerme = termes.tempo[tempo] ;
  // identifier le modele selon la source

  const modele = findModele(source, profils) ;
  //console.log('modele', modele);

  // les options venant de Vue
  const opt = {
    _id: vue._id,
    modele: modele.nom,
    // vient de cardVue ! -> à retirer.
    // duree: vue.duree || 2600, // + rythme
  };

  // traiter la source
  const instanceSource = processSource( modele, source, metas, tempoTerme );
  // console.log('instanceSource S: ', instanceSource);

  // traiter les blocs de placement
  const instanceBlocs = processBlocs( modele, metas, tempoTerme );
  // console.log('instanceBlocs', instanceBlocs);

  // traiter l'image
  const instanceIkono = processIkono(ikono, metas, zone);
  //console.log('instanceIkono', instanceIkono);

  // assembler le résultat
  return Promise.all ([
    instanceSource,
    instanceBlocs,
    instanceIkono
  ])
  .then(([source,blocs,ikono]) => {
    console.log('[source,blocs,ikono]', [source,blocs,ikono] );
    return Object.assign({}, opt, source, blocs, ikono)
  })
  .catch( err =>
    // [ReferenceError: fetchError is not defined]
    console.log('La création de l’instance à échoué', err)
  )
  ;
}
