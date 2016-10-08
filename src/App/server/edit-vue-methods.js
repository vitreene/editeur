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
    const vue = Vues.findOne(_id) ;

    if ('undefined' == typeof vue)
      try {
        throw new Error('Il y a pas d‘enregistrement avec cet id');
      } catch (e) {
        console.log('id : ', _id);
        console.log(e.name + ': ' + e.message);
      }

    const {source_id,metas_id,ikono_id} = vue ;

    const source = Sources.findOne(source_id) ;
    const metas =  Metas.findOne(metas_id) ;
    const ikono =  Ikonos.findOne(source.ikono_id) || {};

    // console.log('VUE', vue);

    if ('vue'===etendu) return {
      [_id]:{
        vue,
        source, ikono, metas }
    };

    return {
      [_id]:{ source, ikono, metas }
    };

  },

  saveVue( {source,metas /*,ikono */}, _id, sequence_id){
    //check(vue, Object)

    SourceSchema.clean(source) ;
    check(source,SourceSchema);
    Sources.upsert(source._id, source) ;

    // clean, puis check desactivé tant que les specs ne sont pas figées
    //check(metas,MetasSchema);
    Metas.upsert(metas._id, metas) ;

    const vue = {
      _id,
      // sequence_id: sequence_id, // a supprimer ?
      source_id: source._id,
      metas_id: metas._id,
      // il manque :
      modele:'affiche-produit',
      skin: '',
    };

    VueSchema.clean(vue) ;
    check(vue,VueSchema);
    Vues.upsert( _id, {$set:vue}) ;


    // Publier l'instance de la vue pour le pProjecteur
    const promesse = new Promise(
      function(resolve, reject) {
           resolve( Instance(_id) ) ;
      }
    )
    .then(
      (instance) => {
        console.log('INSYANCE', instance, typeof(instance) );
        Diyapo.upsert( _id, {$set:instance} ) ;
      }
    )
    .catch( err =>
      console.log('Diyapo : l’enregistrement de l’instance à échoué', err)
    )
    ;

  },

})
