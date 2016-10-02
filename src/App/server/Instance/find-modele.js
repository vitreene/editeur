import {
  collecteComposants
} from 'App/server/Instance/utils'

// cherche le modele réel selon la source dans les profils
// en sortie :
// nom : nom du modele validé
// composants :  les composants non vides
export default function findModele(source, profils){
  /*
    produit -> requis [titre, prix]+ facultatif
    les autres : tous [a,b,...]
   */

  // construire un tableau à partir des keys de source, sans _id et sans valeur nulle

  const composants = Object.keys(source).filter(
    key => key !=='_id' && source[key]
  ); // OK

  const {nom} = profils.filter( profil => {
    return collecteComposants(composants, profil)
  })[0] ;
  //const {nom} = out[0] ;

  // return out[0] ;
  return( { nom, composants } )
};
