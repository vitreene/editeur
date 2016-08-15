/*
import Vues from 'App/collections/vues'
import {Vue} from 'App/collections/vues'
*/

//  import {Source} from 'App/collections/schemas'
import Sources from 'App/collections/sources'

Meteor.methods({

  getVue(_id){
    check(_id, String);
    const source = Sources.findOne({_id:_id}) ;
  //  console.log('getVue(_id)', _id, source);
    return {
      [_id]:{
        source : source,
        ikono: '',
        instance: ''
      }
    }
  }

})

/*
comment trouver l'instance ?
instance dépand d'une zone et d'une vue
L'app doit connaitre tout le temps à quelle zone elle fait référence dans l'éditeur.
->
Instances.findOne( $and:[{zone: zone_id}, {vue : vue_id}])

*/
