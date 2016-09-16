import {termes} from 'App/server/Instance/reglages'

// presente les elements du profil : tous, ou requis+facultatif
export function reCompose(composants){
  const  { requis, facultatif, tous } = composants ;
  if (tous) return tous ;
  if (requis && facultatif) return requis.concat(facultatif);
  return null ;
}


// definit les termes de Position
export function getPosition(item, metas){
  if (item==='ikono_id') {
    item = 'ikono' ;
    const {placement} = metas.ikono ;
    return `${item}-${placement}` ;
  };

  const {position, lien} = metas.source ;
  const pos = termes.position[position] ;
  const lier = (item==='description' && lien) ? 'lien-' : '' ;
  return `${item}-position-${lier}${pos}` ;
}


// renvoie le nom du modele s'il correspond à la source
export function collecteComposants(composants, profil) {
  const { nom, composants:{requis, oneOf, tous} } = profil ;

  if (typeof requis === "undefined"
   && typeof oneOf === "undefined"
   && typeof tous === "undefined"
  ) return null ;

  const req = aDansB(composants, requis) ;
  const opt = aSomeB(composants, oneOf) ;
  const all = aTousB(composants, tous) ;

  if (req && opt && all) return nom ;
  return null ;
}


// a et b contiennent les memes elements
export function aTousB(composants, tous){
  if (typeof tous === "undefined" || tous.length===0) return true ;

  let out = false ;

  if (composants.length === tous.length ) {
    out = tous.reduce( (prec, cour) =>{
      return (prec && (composants.indexOf(cour) > -1) )
    }, true );
  }
  // console.log('OUT', out );
  return out ;
}


// tous les éléments requis sont dans composants
export function aDansB(composants, requis){
  if (typeof requis === "undefined") return true ;
  // true si requis est dans  composants
  return requis.reduce( (prec, cour) =>{
    return (prec && (composants.indexOf(cour) > -1) )
  }
   ,true)
}


// au moins un des éléments de oneOf se trouve dans composants
export function aSomeB(composants, oneOf) {
  if (typeof oneOf === "undefined") return true ;
  return oneOf.reduce( (prec, cour) =>{
    return (prec || (composants.indexOf(cour) > -1) )
  }, false);
}
