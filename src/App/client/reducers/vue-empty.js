import {lodash} from 'meteor/erasaur:meteor-lodash'

import * as s from 'App/collections/schemas'

///////////////////
// modeles vides //
///////////////////

 export let emptySources = (options) => new Empty(s.SourceSchema, options) ;

 export let emptyMetas = (options) => new Empty(s.MetasSchema, options) ;

 export let emptyIkono = (options) => new Empty(s.IkonoSchema, options) ;

 export let emptyVues = (options) => new Empty(s.VueSchema, options) ;

 /*
 Empty cree un objet vide à partir du schéma passé en entrée.
 */

function Empty( {_schemaKeys }, options ){

  let obj = {} ;

  _schemaKeys.forEach( (key)=>{

    // si l'element est dans un tableau
    if (key.endsWith('$')) return ;
    key = key.split('$.').join('') ;

    //let value = undefined ;
    let value = null ;
    if  (key ==='_id') value = Random.id() ;

    lodash.setWith(obj, key, value, Object);
  });

  if (typeof (options) == 'object')
    for (let key in options) {
      const value = options[key] ;

      lodash.setWith(obj, key, value, Object);
    }

  return obj ;
}
