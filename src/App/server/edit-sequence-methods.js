import {lodash} from 'meteor/erasaur:meteor-lodash'


import Sequences from 'App/collections/sequences'
import CardVues from 'App/collections/card-vues'

import Vues from 'App/collections/vues'
import {VueSchema,CardSchema} from 'App/collections/schemas'
import {Ikonos} from 'App/collections/ikonos'
//import {Vue} from 'App/collections/vues'

console.log('METHODS');

function findListeVue(sequence_id) {
  const {liste_id} = Sequences.findOne({_id:sequence_id}, {fields:{liste_id:1}} );
  const {liste} = CardVues.findOne({_id:liste_id}, {fields:{liste:1}} ) ;
  return liste ;
}

// mettre à jour avec import update from 'immutability-helper'
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
      .sort( (a,b) => a.ordre - b.ordre );

    /* --->
    VUES = [ {
    * _id: '01',
    * ordre: 0,
    * titre: 'vignette-01',
    * couleur: 'blue',
    * vignette: 'images-2iADQeK.jpg',
    * visible: false,
     sequence_id: 'liste',
     source_id: '01',
     metas_id: 'met01',
     modele: 'affiche-produit',
     skin: 'default' },
   }]
   */
    return liste ;
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
    const {liste} = CardVues.findOne({_id:liste_id}, {fields:{liste:1}} ) ;

    const newListe = liste.map( (item)=>{
    //console.log('item._id',item.vue_id, seq.indexOf( item.vue_id ) );
      item.ordre = seq.indexOf( item.vue_id ) ;
      return item;
    } ) ;
    //console.log('newOrder', newOrder);
    CardVues.update({_id:liste_id}, {$set:{liste:newListe}});
  },



  toggleVue(_id, sequence_id){
    check(_id, String) ;
    check(sequence_id, String);

    console.log('TOGGLE_VISIBILITY', _id);

    const {liste_id} = Sequences.findOne({_id:sequence_id}, {fields:{liste_id:1}} );

    const {liste} = CardVues.findOne(
      { _id:liste_id, 'liste.vue_id':_id },
      { fields:{'liste.$':1} }
    ) ;
    const visible = liste[0].visible ;

    CardVues.update(
      { _id:liste_id, 'liste.vue_id':_id },
      { $set:{'liste.$.visible' :!visible} }
    );
  },



  addToSequence(sequence_id, cardVue, ikono_id) {
    // ajouter un nouvel item à la liste des vues

    // s'il y a une image
    const ikonoFound = Ikonos.findOne({_id:ikono_id}) ;
    cardVue.vignette =  ('undefined' === typeof ikonoFound ) ?
    '#' :  ikonoFound.vignette ;

    //-> mettre à jour CardVues
    check(cardVue, CardSchema) ;

    const {liste_id} = Sequences.findOne({_id:sequence_id}, {fields:{liste_id:1}} );

    //enlever l'ancienne valeur
    const {liste} = CardVues.findOne( { _id:liste_id } );
    /*
    chercher dans la liste un élément qui à vue_id ;
    si trouvé : remplacer, sinon, ajouter.
    */
    const newListe = upsert (liste, cardVue, 'vue_id') ;
    //console.log('NEWLISTE', liste, newListe);
    return CardVues.update({ _id:liste_id},{ $set:{'liste' :newListe} });
  }

})
