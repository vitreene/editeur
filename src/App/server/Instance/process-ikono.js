

import {IkonosStore} from 'App/collections/ikonos'
import {Ikonos} from 'App/collections/ikonos'
import {ProxysStore} from 'App/collections/ikonos'
import {Proxys} from 'App/collections/ikonos'

function getTransformFromZone(metas, zone) {
  // console.log('metas, zone',metas, zone);
  return metas.ikono.filter( x => x.zone===zone)[0] ;
}

// creer un proxy à partir de la source, modifié par transform
export default function processIkono(ikono, metas, zone) {

  // s'il n'y a pas d'image ;
  const {_id:fileId} = ikono ;

  console.log('fileId', fileId);

  if ('undefined' == typeof fileId) return (
    { visuel: {
      src:'#',
      placement:'vide'
      }
    } ) ;

console.log('processIkono : ikono, metas, zone', ikono, metas, zone);

  const metaIkono = getTransformFromZone(metas, zone) ;

  // à simplifier : passer simplement l'objet
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
    zone: zone, // || 'ecran01',
    placement: placement || "libre"
  };
  //console.log('placement', placement, metas );
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


/*
si l'image a ete uploadee, mais la vue n'a pas encore eté enregistrée, alors pristine = false, mais proxy n'a pas été  défini ?
le contexte ecran devrait exister : defaut au moins, sinon le nom.
*/
  return new Promise( (resolve, reject) => {

    console.log('PRISTINE', pristine);

    // si l'image n'a pas été manipulée, renvoyer proxy[zone]
    if (pristine) {
      const {proxy} = Ikonos.findOne(fileId) ;
      const {src}  = proxy.filter(x => x.zone===zone)[0]
      resolve(src) ;
      }
    else {
    Ikonos.update( fileId, {$set:{transform:transform}},
      (err,res) => {
        if (err) { console.log('ERREUR : Ikonos.update', err); }
        else {
          IkonosStore.copy( fileId, ProxysStore,
          function(err, copyId, copyFile) {
            if (err)
            console.log('ERREUR : IkonosStore', err, copyId, copyFile);

            const  {url:src} = Proxys.findOne(copyId) ;
            // console.log('SRC', src );
            !err && resolve(src) ;
          });
        } // end else
      });
    }
  })
  .then ( src => {
    return ( { visuel: { src, placement } }  )
  })
  .catch( error => {
    console.log("l'image n'a pu etre optimisée", error) ;
  })
} // fin de processIkono
