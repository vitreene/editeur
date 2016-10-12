// import {lodash} from 'meteor/erasaur:meteor-lodash'

import Sequences from 'App/collections/sequences'
import CardVues from 'App/collections/card-vues'
import Vues from 'App/collections/vues'
import {Ikonos} from 'App/collections/ikonos'

import {VueSchema,CardVueSchema} from 'App/collections/schemas'

console.log('METHODS');

function updateVisibles(_id) {
  // sortie : vues, tableau contenant la liste ordonnée des vues visibles avec leur duree.
  const {liste_id} = CardVues.findOne(_id) ;
  const vues = CardVues.find(
    {liste_id:liste_id, visible:true},
    {fields: {ordre:1, duree:1} }
  ).fetch();
  CardVues.update( liste_id, {$set:{vues}} ) ;
}

function findListeVue(sequence_id) {
  const {liste_id} = Sequences.findOne({_id:sequence_id} );
  return CardVues.find({liste_id:liste_id}).fetch() ;
}

Meteor.methods({


  getSequence(sequence_id){
    check(sequence_id, String);

  return Sequences.findOne({_id:sequence_id}) ;
  },


  getCurrentSequence(sequence_id){
    check(sequence_id, String);

    // en front, _id devient vue_id pour des raisons de clarté
    const liste = findListeVue(sequence_id)
      // _id est changé en vue_id
      .map( (x)=> {x.vue_id = x._id ; delete x._id ; return x })
      // la liste est triée dans l'ordre
      .sort( (a,b) => a.ordre - b.ordre );
      //console.log('liste triee', liste);
    return liste ;
  },


  getCurrentVue( _id){
    check(_id, String);

    return Vues.findOne({ _id:_id }) ;
  },



  orderList(listeVue,/* sequence_id */) {
    check(listeVue, [String]);

    listeVue.map( (_id, index) => {
      CardVues.update(_id, {$set:{ordre:index}} ) ;
    }) ;
    updateVisibles(listeVue[0]) ;
  },



  toggleVue(_id){
    check(_id, String) ;

    const {visible} = CardVues.findOne(_id ) ;
    CardVues.update(_id , {$set:{visible:!visible}}) ;
    updateVisibles(_id) ;
  },



  addToSequence(sequence_id, card, ikono_id) {
    // ajouter un nouvel item à la liste des vues

    // s'il y a une image
    const ikonoFound = Ikonos.findOne({_id:ikono_id}) ;
    card.vignette =  ('undefined' === typeof ikonoFound ) ?
    '#' :  ikonoFound.vignette ;

    const {vue_id, ...c} = card ;

    check(vue_id, String) ;
    //console.log('card', vue_id, c );

    const {liste_id} = Sequences.findOne(sequence_id);

    const vue = Object.assign( {},
      c,
      { _id:vue_id, liste_id: liste_id }
    ) ;

    //console.log("VUE:", vue );

    check(vue, CardVueSchema) ;

    CardVues.upsert(vue_id, vue) ;
    updateVisibles(vue_id) ;
  }

})
