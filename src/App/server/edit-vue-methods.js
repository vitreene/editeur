//import {Vue} from 'App/collections/vues'
// import {Source} from 'App/collections/schemas'
import Vues from 'App/collections/vues'
import Metas from 'App/collections/metas'
import {SourceSchema} from 'App/collections/schemas'

/*
*/

//  import {Source} from 'App/collections/schemas'
import Sources from 'App/collections/sources'

Meteor.methods({

  getVue(_id){
    check(_id, String);
    const vue = Vues.findOne({_id:_id}) ;
    const {source_id,metas_id,ikono_id} = vue ;
    const source = Sources.findOne({_id:source_id}) ;
    const metas = Metas.findOne({_id:metas_id}) ;
    console.log('VUE', vue);
// console.log('getVue(_id)', source_id, source, metas_id, metas);

    return {
      [_id]:{
        source : source,
        ikono: '',
        metas: metas
      }
    }
  },
  saveVue(vue){
    //check(vue, Object)
    //console.log('VUE',vue);
    const {source,metas,ikono} = vue ;
    SourceSchema.clean(source) ;
    //console.log('Source clean', source);
    check(source,SourceSchema);
    Sources.update(source._id, source) ;

// clean, puis check
    Metas.update(metas._id, metas) ;

  }

})

/*
comment trouver l'instance ?
instance dépand d'une zone et d'une vue
L'app doit connaitre tout le temps à quelle zone elle fait référence dans l'éditeur.
->
Instances.findOne( $and:[{zone: zone_id}, {vue : vue_id}])

*/
