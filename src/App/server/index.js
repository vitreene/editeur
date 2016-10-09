//import { Meteor } from 'meteor/meteor'

import Sequences from 'App/collections/sequences'
import Zones from 'App/collections/zones'
import CardVues from 'App/collections/card-vues'

//import {source} from 'App/imports/import-sources'
//import Sources from 'App/collections/sources'
import  'App/collections/ikonos'
/*
import {Ikonos} from 'App/collections/ikonos'
import {Proxys} from 'App/collections/ikonos'
import {
  IkonosStore,
  ProxysStore
} from 'App/collections/ikonos'
*/
import {metas} from 'App/imports/import-sources'
import Metas from 'App/collections/metas'

import {composite} from 'App/imports/demo-produits-01'
import Projections from 'App/collections/projections'

import {liste} from 'App/imports/vues-liste'
import Vues from 'App/collections/vues'

import './edit-sequence-methods'
import './edit-vue-methods'
import './instances-methods'

/*
// attention, j'efface tout !
Projections.remove('test');
if (Projections.find({}).count()===0) Projections.insert(composite);

Sources.remove('01');
if (Sources.find({}).count()===0) Sources.insert(maSource[0]);
*/
//const test = Proxys.find({}).fetch() ;
// console.log('Proxys', test);
/*
if (Metas.find({}).count()===0) Metas.insert(metas[0]);

Vues.remove({sequence_id:'liste'});
if (Vues.find({}).count()===0) {

  liste.vignettes.map( vignette => {
  //  vignette.sequence_id = liste._id ;
    Vues.insert(vignette);
    })
}
*/
console.log('PUBLISH');
//console.log('__dirname', __dirname);
//console.log('process.env.PWD ', process.env.PWD );
Meteor.publish('ex-projection', function() {
  return Projections.find({_id:'test'});
});

Meteor.publish('projection', function(liste_id) {
/*
  return CardVues.find(
    {liste_id:liste_id, visible:true},
    {fields: {duree:1,ordre:1} }
  ) ;
  */
  return CardVues.find( liste_id ) ;

});

/*
Meteor.publish('vues', function(_id) {
  return Vues.find({sequence_id:_id} );
});
*/
