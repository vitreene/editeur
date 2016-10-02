import { termes } from 'App/server/Instance/reglages'

import {
  reCompose,
  getPosition,
  collecteComposants
} from 'App/server/Instance/utils'

// definit quels blocs vont englober les éléments de Source
export default
function processBlocs({composants, nom}, metas, tempo) {


  // à nettoyer
  const composant = composants ;
  //const composant = reCompose(composants) ;

  let blocs = [] ; // recueille la liste des blocs
  let out = {} ;

  // ajouter les badges
  const {accroche: { action, condition, legal }} = metas ;

  //console.log('accroche', action, condition, legal );
  if (action.aspect) composant.push('action') ;
  if (condition.aspect) composant.push('condition') ;
  if (legal.aspect) composant.push('legal') ;

  //console.log('COMPOSANT', composant );

  // identifier les blocs englobants
  for (const bloc of termes.blocs ){
    const _out = collecteComposants(composant, bloc) ;
    if (_out) {
      composant.push(_out) ;
      blocs.push(_out)
    };
  }

  // generer les classes associées aux blocs
  blocs.map( bloc => {
    out[bloc] = {
      position: getPosition(bloc, metas),
      aspect : `${nom}-${bloc}`,
      transition : `${bloc}-${tempo}`
    };
  } )

  return out ;
}
