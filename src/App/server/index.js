import { Meteor } from 'meteor/meteor'

import {composite} from 'App/imports/demo-produits-01'
import Projections from 'App/collections/projections'

import {liste} from 'App/imports/vues-liste'
import Vues from 'App/collections/vues'



// attention, j'efface tout !
Projections.remove('test');
if (Projections.find({}).count()===0) Projections.insert(composite);

Vues.remove('liste');
if (Vues.find({}).count()===0) {

  liste.vues.map( vue => {
    vue.sequence = liste._id ;
    Vues.insert(vue);
    })
}


Meteor.publish('projection', function(test) {
  return Projections.find({});
});

Meteor.publish('vues', function(_id) {
  return Vues.find({sequence:_id} );
});
