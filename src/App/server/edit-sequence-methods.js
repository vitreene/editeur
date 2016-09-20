import Sequences from 'App/collections/sequences'
import ListeVues from 'App/collections/liste-vues'

import Vues from 'App/collections/vues'
import {VueSchema} from 'App/collections/schemas'
import {Ikonos} from 'App/collections/ikonos'
//import {Vue} from 'App/collections/vues'

console.log('METHODS');

function findListeVue(sequence_id) {
  const {liste_id} = Sequences.findOne({_id:sequence_id}, {fields:{liste_id:1}} );
  const {liste} = ListeVues.findOne({_id:liste_id}, {fields:{liste:1}} ) ;
  return liste ;
}

Meteor.methods({

  getCurrentSequence(sequence_id = 'liste'){
    /*
    recuperer la liste dans Sequences ;
    recupérer les vues,
    leur attribuer l'ordre récupéré de Sequences
    */
    check(sequence_id, String);

    const liste = findListeVue(sequence_id) ;

    const vues = liste.map( ({vue_id,visible,ordre}) => {

      const vue = Vues.findOne ({ _id: vue_id });
      vue.visible = visible ;
      vue.ordre = ordre ;
      //console.log('RESULTAT : ', vue);
      return vue ;
    })
    .sort( (a,b) => a.ordre - b.ordre );

    console.log('VUES', vues);

    return vues ;
  },

  getCurrentVue( _id){
    //console.log('_ID', _id);
    check(_id, String);
    return Vues.findOne({ _id:_id }) ;
  },

  orderList(seq, sequence_id) {
    check(seq, [String]);
    check(sequence_id, String);

    //console.log('ORDERLIST', sequence_id, seq);

    const {liste_id} = Sequences.findOne({_id:sequence_id}, {fields:{liste_id:1}} );
    const {liste} = ListeVues.findOne({_id:liste_id}, {fields:{liste:1}} ) ;

    const newOrder = liste.map( (item)=>{
      //console.log('item._id',item.vue_id, seq.indexOf( item.vue_id ) );
      item.ordre = seq.indexOf( item.vue_id ) ;
      return item;
    } ) ;
    //console.log('newOrder', newOrder);
    ListeVues.update({_id:liste_id}, {$set:{liste:newOrder}});
  },

  toggleVue(_id){
    check(_id, String) ;
    
    console.log('TOGGLE_VISIBILITY', _id);

    const visible = Vues.findOne({_id:_id}).visible ;
    Vues.update( {_id:_id}, {$set: {visible: !visible} }) ;
  },

  saveVignette(_id, vignette, ikono_id) {
    // mettre à jour la vignette
    const vgn = Ikonos.findOne(ikono_id) ;

    console.log('ikono_id, vgn',ikono_id, vgn );

    vignette.vignette = vgn.vignette ;
    VueSchema.clean(vignette) ;
    check(vignette, VueSchema) ;
    return Vues.upsert(vignette._id, vignette) ;
  }

})
