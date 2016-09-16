import {
  collecteComposants
} from 'App/server/Instance/utils'

// cherche le modele réel selon la source dans les profils
export default function findModele(source, profils){
  /*
    produit -> requis [titre, prix]+ facultatif
    les autres : tous [a,b,...]
   */
  // construire un tableau à partir des keys de source, sans _id
  const composants = Object.keys(source).filter(key=>key!=='_id') ;

  const out = profils.filter( profil => {
    return collecteComposants(composants, profil)
  })
  return out[0] ;
}
