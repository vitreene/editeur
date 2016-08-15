//import {Vue} from 'App/collections/vues'
// import {Source} from 'App/collections/schemas'
import Vues from 'App/collections/vues'
import {SourceSchema} from 'App/collections/schemas'

/*
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
  },
  saveVue(vue){
    //check(vue, Object)
    //console.log('VUE',vue);
    const {source,instance,ikono} = vue ;
    SourceSchema.clean(source) ;
    console.log('Source clean', source);
    check(source,SourceSchema);
    Sources.update(source._id, source) ;


  }

})

/*
comment trouver l'instance ?
instance dépand d'une zone et d'une vue
L'app doit connaitre tout le temps à quelle zone elle fait référence dans l'éditeur.
->
Instances.findOne( $and:[{zone: zone_id}, {vue : vue_id}])

*/
