import { Meteor } from 'meteor/meteor'

import {composite} from 'App/imports/demo-produits-01'
import Projections from 'App/collections/projections'

import {liste} from 'App/imports/vues-liste'
import Vues from 'App/collections/vues'

import './methods'

// attention, j'efface tout !
Projections.remove('test');
if (Projections.find({}).count()===0) Projections.insert(composite);

Vues.remove('liste');
if (Vues.find({}).count()===0) {

  liste.vignettes.map( vignette => {
    vignette.sequence_id = liste._id ;
    Vues.insert(vignette);
    })
}

console.log('PUBLISH');
Meteor.publish('projection', function(test) {
  return Projections.find({});
});

/*
Meteor.publish('vues', function(_id) {
  return Vues.find({sequence_id:_id} );
});
*/
