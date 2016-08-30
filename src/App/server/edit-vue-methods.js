//import {Vue} from 'App/collections/vues'
// import {Source} from 'App/collections/schemas'
import Vues from 'App/collections/vues'
import Metas from 'App/collections/metas'
import {Ikonos} from 'App/collections/ikonos'
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

    console.log('vue',source_id,metas_id,ikono_id);

    const source = Sources.findOne({_id:source_id}) ;
    const metas = Metas.findOne({_id:metas_id}) ;
    const ikono = Ikonos.findOne({_id:source.ikono_id}) || {};

    console.log('VUE', vue);

    return {
      [_id]:{
        source,
        ikono,
        metas
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
    Sources.upsert(source._id, source) ;

// clean, puis check
    Metas.upsert(metas._id, metas) ;
  }

})

/*
comment trouver l'instance ?
instance dépand d'une zone et d'une vue
L'app doit connaitre tout le temps à quelle zone elle fait référence dans l'éditeur.
->
Instances.findOne( $and:[{zone: zone_id}, {vue : vue_id}])

*/
