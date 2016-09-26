//import {Vue} from 'App/collections/vues'
// import {Source} from 'App/collections/schemas'
import Vues from 'App/collections/vues'
import Metas from 'App/collections/metas'
import {Ikonos} from 'App/collections/ikonos'
import {SourceSchema} from 'App/collections/schemas'
import Sources from 'App/collections/sources'

import {emptyVues} from 'App/client/reducers/vue-empty'
/*
*/

Meteor.methods({

  getVue(_id, etendu){
    // option est 'vue' ou undefined

    check(_id, String);
    const vue = Vues.findOne({_id:_id}) ;

console.log('new VUE', vue );

    if ('undefined'===vue)
      try {
        throw new Error('Il y a pas d‘enregistrement avec cet id');
      } catch (e) {
        console.log('id : ', _id);
        console.log(e.name + ': ' + e.message);
      }

    const {source_id,metas_id,ikono_id} = vue ;
    // console.log('vue',source_id,metas_id,ikono_id);

    const source = Sources.findOne({_id:source_id}) ;
    const metas = Metas.findOne({_id:metas_id}) ;
    const ikono = Ikonos.findOne({_id:source.ikono_id}) || {};

    // console.log('VUE', vue);

    if ('vue'===etendu) return {
      [_id]:{
        vue,
        source,
        ikono,
        metas
      }
    };

    return {
      [_id]:{
        source,
        ikono,
        metas
      }
    };

  },

  saveVue(vue, _id, sequence_id){
    //check(vue, Object)

    //console.log('VUE',vue);
    const {source,metas,ikono} = vue ;
    const vueUp = {
      sequence_id: sequence_id,
      source_id: source._id,
      metas_id: metas._id,
      // il manque :
      modele:'',
      skin: '',
  };

    SourceSchema.clean(source) ;
    //console.log('Source clean', source);
    check(source,SourceSchema);
    Sources.upsert(source._id, source) ;

// clean, puis check
    Metas.upsert(metas._id, metas) ;

    Vues.upsert( {_id}, {$set:vueUp})
  },

})
