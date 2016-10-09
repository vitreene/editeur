import {lodash} from 'meteor/erasaur:meteor-lodash'


import Sequences from 'App/collections/sequences'
import CardVues from 'App/collections/card-vues'

import Vues from 'App/collections/vues'
import {VueSchema,CardVueSchema, CardSchema} from 'App/collections/schemas'
import {Ikonos} from 'App/collections/ikonos'
//import {Vue} from 'App/collections/vues'

console.log('METHODS');
/*
function findListeVue(sequence_id) {
  const {liste_id} = Sequences.findOne({_id:sequence_id}, {fields:{liste_id:1}} );
  const {liste} = CardVues.findOne({_id:liste_id}, {fields:{liste:1}} ) ;
  return liste ;
}
*/

function updateVisibles(_id) {
  // sortie : vues, tableau contenant la liste ordonnée des vues visibles avec leur duree.
  console.log('updateVisibles id', _id);

  const {liste_id} = CardVues.findOne(_id) ;
  const vues = CardVues.find(
    {liste_id:liste_id, visible:true},
    {fields: {ordre:1, duree:1} }
  ).fetch();
  CardVues.update( liste_id, {$set:{vues}} ) ;
}

function findListeVue(sequence_id) {
  const {liste_id} = Sequences.findOne({_id:sequence_id} );
  //const liste = CardVues.find({liste_id:liste_id, vues:{$exists:false}} ).fetch() ;
  const liste = CardVues.find({liste_id:liste_id}).fetch() ;

  //console.log('LISTE-> ', liste_id, liste );

  return liste ;
}

// mettre à jour cette fonction avec import update from 'immutability-helper'
export function upsert (arr, obj, el){
  const found = arr.map((x)=>x[el]).indexOf( obj[el] );
  if ( -1 < found ) {
    let newArr = arr.slice() ;
    newArr[found] = obj ;
    return newArr ;
  } else { return arr.concat(obj) } ;
}


Meteor.methods({


  getSequence(sequence_id){
    check(sequence_id, String);
  return Sequences.findOne({_id:sequence_id}) ;
  },


  getCurrentSequence(sequence_id){
    check(sequence_id, String);

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
    //  check(sequence_id, String);
    //const {liste_id} = Sequences.findOne({_id:sequence_id});
    listeVue.map( (_id, index) => {
      CardVues.update(_id, {$set:{ordre:index}} ) ;
      // CardVues.update({liste_id:liste_id, _id:_id}, {$set:{ordre:index}} )
    }) ;

    updateVisibles(listeVue[0]) ;

    /*
    const test = CardVues.find({liste_id:liste_id}, {fields:{ordre:1}}).fetch() ;
    console.log('CardVues', test );
    */
  },



  toggleVue(_id,/* sequence_id */){
    check(_id, String) ;
  //  check(sequence_id, String);

  //  console.log('TOGGLE_VISIBILITY', _id);

    // const {liste_id} = Sequences.findOne({_id:sequence_id} );

    const {visible} = CardVues.findOne(_id ) ;
    CardVues.update(_id , {$set:{visible:!visible}}) ;

    updateVisibles(_id) ;
/*
    const {liste} = CardVues.findOne(
      { _id:liste_id, 'liste.vue_id':_id },
      { fields:{'liste.$':1} }
    ) ;
    const visible = liste[0].visible ;

    CardVues.update(
      { _id:liste_id, 'liste.vue_id':_id },
      { $set:{'liste.$.visible' :!visible} }
    );
    */
  },



  addToSequence(sequence_id, card, ikono_id) {
    // ajouter un nouvel item à la liste des vues

    // s'il y a une image
    const ikonoFound = Ikonos.findOne({_id:ikono_id}) ;
    card.vignette =  ('undefined' === typeof ikonoFound ) ?
    '#' :  ikonoFound.vignette ;

    const {vue_id, ...c} = card ;

    check(vue_id, String) ;
    console.log('card', vue_id, c );

    const {liste_id} = Sequences.findOne(sequence_id);

    const vue = Object.assign( {},
      c,
      { _id:vue_id, liste_id: liste_id }
    ) ;

    console.log("VUE:", vue );

    check(vue, CardVueSchema) ;
    CardVues.upsert(vue_id, vue) ;
    updateVisibles(vue_id) ;
    /*
    const {liste_id} = Sequences.findOne({_id:sequence_id}, {fields:{liste_id:1}} );

    //enlever l'ancienne valeur
    const {liste} = CardVues.findOne( { _id:liste_id } );
    //chercher dans la liste un élément qui à vue_id ;
    //si trouvé : remplacer, sinon, ajouter.
    const newListe = upsert (liste, cardVue, 'vue_id') ;
    //console.log('NEWLISTE', liste, newListe);
    return CardVues.update({ _id:liste_id},{ $set:{'liste' :newListe} });
    */
  }

})
