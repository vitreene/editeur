import Vues from 'App/collections/vues'
import {VueSchema} from 'App/collections/schemas'
import {Ikonos} from 'App/collections/ikonos'
//import {Vue} from 'App/collections/vues'

console.log('METHODS');


Meteor.methods({

  getCurrentSequence(sequence_id = 'liste'){
    check(sequence_id, String);
    return Vues.find ({ sequence_id: sequence_id }, { sort: { ordre: 1 } }).fetch() ;
  },

  getCurrentVue( _id){
    //console.log('_ID', _id);
    check(_id, String);
    return Vues.findOne({ _id:_id }) ;
  },

  orderList(list) {
    check(list, [String]);
    //console.log('ORDERLIST', list);
    // list devrait se trouver plutot dans sequence ?
    /*
    for (let i=0 ; i< list.length ; i++){
      const vue = Vue.findOne(list[i]);
      vue.ordre = i ;
      vue.save() ;
    }
    */
    for (let i=0 ; i< list.length ; i++){
      Vues.update(list[i], {$set: {ordre:i}})
      }
  },

  toggleVue(_id){
    check(_id, String) ;
    console.log('TOGGLE_VISIBILITY', _id);
    /*
    let vue = Vue.findOne(_id) ;
    vue.toggle_visibility() ;
    vue.save() ;
*/
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
