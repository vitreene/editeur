import {IkonosStore} from 'App/collections/ikonos'
import {Ikonos} from 'App/collections/ikonos'
import {ProxysStore} from 'App/collections/ikonos'

function getTransformFromZone(metas, zone) {
  // console.log('metas, zone',metas, zone);
  return metas.ikono.filter(
    transform => transform.zone===zone
  )
}

// creer un proxy à partir de la source, modifié par transform
export default function processIkono(ikono, metas, zone) {

  const fileId = ikono._id ;

  const metaIkono = getTransformFromZone(metas, zone) ;
  const { pristine, placement,pox,poy,rot,ech,pivX,pivY } = metaIkono ;
  // si la propriété transform n'est pas vide, alors appliquer proxy.
  const transform = {
    pox : pox || 0,
    poy : poy || 0,
    rot : rot || 0,
    ech : ech || 1,
    pivX : pivX || false,
    pivY : pivY || false,

    pristine : pristine || false,
    zone: zone || 'ecran01',
    placement: placement || "libre"
  };

  /*
  const transform = {
    pristine: false,
    zone:'ecran01',
    placement:libre,
    pox: 500,
    poy: 40,
    rot: -20,
    ech: 1.56,
    pivX: false,
    pivY: false,
  }
   "transform" : {
    "pristine": false,
    "zone":'ecran01',
    "placement":"libre",
    "pox": 500,
    "poy": 40,
    "rot": -20,
    "ech": 1.56,
    "pivX": false,
    "pivY": false,
  }
*/
  /*
    la methode copy ne permet pas de transferer des parametres supplementaires.
    La seule façon est de modifier l'enregistrement Ikono pour y rajouter les parametres, les lire, puis les effacer ensuite.
    */
  return new Promise( (resolve, reject) => {
    // si l'image n'a pas été manipulée, renvoyer proxy[zone]
    if (pristine) {
      const {proxy} = Ikonos.findOne(fileId) ;
      const ilono = proxy.filter(x => x.zone===zone)
      resolve(ikono.src)
      }
    else {
    Ikonos.update( fileId, {$set:{transform:transform}},
      (err,res) => {
        if (err) { console.log('ERREUR : ', err); }
        else {
          IkonosStore.copy( fileId, ProxysStore,
            function(err, copyId, copyFile) {
              !err && resolve(copyFile.proxy) ;
            });
        } // end else
      });
    }
  })
  .then ( url => {
    return ( { visuel: { url, placement } }  )
  })
  .catch( error => {
    console.log("l'image n'a pu etre optimisée", fetchError) ;
  })
} // fin de processIkono
