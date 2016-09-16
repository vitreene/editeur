import {
  reCompose,
  getPosition,
} from 'App/server/Instance/utils'

// definit les attributs de chaque élément de Source
export default
function processSource( {composants, nom}, source, metas ){
  // composant = tous ou requis+facultatif
  const composant = reCompose(composants) ;
  let out = {} ;
  // donner les definitions precises des termes
  composant.map(function (item) {
     out[item] = {
       text : this[item],
       position: getPosition(item, metas),
       aspect : `${nom}-${item}`,
       transition : '' // ajouter
     } ;
  },source) ;

  return out ;
}
