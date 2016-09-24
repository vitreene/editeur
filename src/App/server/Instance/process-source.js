import {
  reCompose,
  getPosition,
} from 'App/server/Instance/utils'

// definit les attributs de chaque élément de Source
export default
function processSource( {composants, nom}, source, metas, tempo ){
  // composant = tous ou requis+facultatif
  const composant = reCompose(composants) ;
  let out = {} ;
  // donner les definitions precises des termes
  composant.map(function (item) {
    //ignorer ikono_id, ikono est traité à part.
    if (item==='ikono_id') return null ;
    out[item] = {
      text : this[item],
      position: getPosition(item, metas),
      aspect : `${nom}-${item}`,
      transition : `${item}-${tempo}` // tempo est défini dans séquence
    } ;
  },source) ;

  return out ;
}
