//import {Vue} from 'App/collections/vues'
// import {Source} from 'App/collections/schemas'
import Diyapo from 'App/collections/diyapo'
import Vues from 'App/collections/vues'
import Metas from 'App/collections/metas'
import {Ikonos} from 'App/collections/ikonos'
import {
  SourceSchema,
  VueSchema
  } from 'App/collections/schemas'
import Sources from 'App/collections/sources'

import Instance from 'App/server/Instance'

/*
import {emptyVues} from 'App/client/reducers/vue-empty'
*/

Meteor.methods({

  getVue(_id, etendu){
    // option est 'vue' ou undefined

    check(_id, String);
    const vue = Vues.findOne({_id:_id}) ;

// console.log('VUE', vue );

    if ('undefined' == typeof vue)
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

  saveVue( {source,metas,ikono}, _id, sequence_id){
    //check(vue, Object)

    //console.log('VUE',vue);

    const vue = {
      _id,
      sequence_id: sequence_id,
      source_id: source._id,
      metas_id: metas._id,
      // il manque :
      modele:'affiche-produit',
      skin: '',
  };

    SourceSchema.clean(source) ;
    check(source,SourceSchema);
    Sources.upsert(source._id, source) ;

// clean, puis check
    Metas.upsert(metas._id, metas) ;

    VueSchema.clean(vue) ;
    check(vue,VueSchema);
    Vues.upsert( {_id}, {$set:vue}) ;

    //mattre à jour la projection
    // desactivé en attendant une description plus précise de accroche

    // creer promise
    const promesse = new Promise(
      function(resolve, reject) {
           resolve( Instance(_id) ) ;
      }
    )
    .then(
      (instance) => {
        console.log('INSYANCE', instance, typeof(instance) );
        Diyapo.upsert( {_id}, {$set:instance} ) ;
      }
    )
    .catch( err =>
      console.log('Diyapo : l’enregistrement de l’instance à échoué', err)
    )
    ;
//       const instance = Instance(_id) ;




  },

})
