import {lodash} from 'meteor/erasaur:meteor-lodash'

import * as s from 'App/collections/schemas'

///////////////////
// modeles vides //
///////////////////

 export let emptySources = (options) => new Empty(s.SourceSchema, options) ;

 export let emptyMetas = (options) => new Empty(s.MetasSchema, options) ;

 export let emptyIkono = (options) => new Empty(s.IkonoSchema, options) ;

 export let emptyVues = (options) => new Empty(s.VueSchema, options) ;

 export let emptyCards = (options) => new Empty(s.CardVueSchema, options) ;
 /*
 Empty cree un objet vide à partir du schéma passé en entrée.
 */

function Empty( {_schemaKeys }, options ){

  let obj = {} ;

  _schemaKeys.forEach( (key)=>{

    // si l'element est dans un tableau
    if (key.endsWith('$')) return ;
    key = key.split('.$').join('[0]') ;

    let value = null ;
    if  (key ==='_id' || key==='vue_id') value = Random.id() ;

    lodash.set(obj, key, value);
    //lodash.setWith(obj, key, value, Object);
  });

  //console.log('OBJ', obj);

  if (typeof (options) == 'object')
    for (let key in options) {
      const value = options[key] ;

      lodash.set(obj, key, value);
    }

  return obj ;
}
