//import { Meteor } from 'meteor/meteor'

import {maSource} from 'App/imports/import-sources'
import Sources from 'App/collections/sources'

import {composite} from 'App/imports/demo-produits-01'
import Projections from 'App/collections/projections'

import {liste} from 'App/imports/vues-liste'
import Vues from 'App/collections/vues'

import './vue-methods'
import './edit-vue-methods'

/*
// attention, j'efface tout !
Projections.remove('test');
if (Projections.find({}).count()===0) Projections.insert(composite);
*/

Sources.remove('01');
if (Sources.find({}).count()===0) Sources.insert(maSource[0]);

Vues.remove({sequence_id:'liste'});
if (Vues.find({}).count()===0) {

  liste.vignettes.map( vignette => {
  //  vignette.sequence_id = liste._id ;
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
