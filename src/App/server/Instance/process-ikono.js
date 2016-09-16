import {IkonosStore} from 'App/collections/ikonos'
import {Ikonos} from 'App/collections/ikonos'
import {ProxysStore} from 'App/collections/ikonos'


// creer un proxy à partir de la source, modifié par transform
export default function processIkono(ikono, metas) {

  const fileId = ikono._id ;
  const placement = metas.ikono.placement ;

  // si la propriété transform n'est pas vide, alors appliquer proxy.
  const transform = {
    pox: 500,
    poy: 40,
    rot: -20,
    ech: 1.56,
    pivX: false,
    pivY: false,
  }
  /*
    la methode copy ne permet pas de transferer des parametres supplementaires. La seule façon est de modifier l'enregistrement  Ikono pour y rajouter les parametres, les lire, puis les effacer ensuite.
    */
    // return
  return new Promise( (resolve, reject) => {

    Ikonos.update( fileId, {$set:{transform:transform}},
      (err,res) => {

        if (err) { console.log('ERREUR : ', err); }
        else {

          IkonosStore.copy( fileId, ProxysStore,
            function(err, copyId, copyFile) {

              !err &&
              //console.log(fileId + ' has been copied as ' + copyId) ;
              //console.log(fileId + ' *-------> ' + copyFile.proxy ) ;

              resolve(copyFile.proxy) ;
            }
          );
        } // end else
      } ) ;

    })
  .then ( url => {
    return ( { visuel: { url, placement } }  )
  })
  .catch( error => {
    console.log("l'image n'a pu etre optimisée", fetchError) ;
  })
} // fin de processIkono
