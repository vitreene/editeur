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
const zone = 'ecran01' ;


export default function Instance(_id) {
  // ->  source, ikono, metas, + vue
  const vue = Meteor.call('getVue', _id, 'vue') ;
  return creerInstance(vue[_id]) ;
}


function  creerInstance( { source, ikono, metas, vue } ){

  if (Meteor.isClient) console.log('INSTANCE est sur CLIENT');
  if (Meteor.isServer) console.log('INSTANCE est sur SERVEUR');

  // identifier le modele selon la source
  const modele = findModele(source, profils) ;
  //console.log('modele', modele);

  // les options venant de Vue
  const opt = {
    _id: vue._id,
    modele: modele.nom,
    duree: vue.duree || 2600,
  };

  // traiter la source
  const instanceSource = processSource( modele, source, metas ) ;
  //console.log('instanceSource', instanceSource);

  // traiter les blocs de placement
  const instanceBlocs = processBlocs( modele, metas ) ;
  //console.log('instanceBlocs', instanceBlocs);

  // traiter l'image
  const instanceIkono = processIkono(ikono, metas, zone) ;
  //console.log('instanceIkono', instanceIkono);

  // assembler le résultat
  return Promise.all ([
    instanceSource,
    instanceBlocs,
    instanceIkono
  ])
  .then(([source,blocs,ikono]) => {
    return Object.assign({}, source,blocs,ikono, opt)
  })
  .catch( err =>
    console.log('La création de l’instance à échoué', err)
  )
  ;
}
