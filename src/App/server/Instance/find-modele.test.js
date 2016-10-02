import chai  from 'chai';
const {expect} = chai ; // preference and tested with expect
chai.use(require("chai-sorted"));

import  findModele from 'App/server/Instance/find-modele';
import { profils } from 'App/server/Instance/reglages'



console.log("hello, tu quoque ?");
/////////////////////

describe('findModele : trouve le modele en fonction des champs :', function() {

  it(" produit ", function() {
    const modele = 'produit' ;
    const source = {
      "_id" : "sZL6oRrnyqbKeRrEa",
      "titre" : "ma vignette du soir, espoirT",
      "description" : "une belle edition",
      "offre" : null,
      "prix" : 0.01,
      "prix_promo" : null,
      "ikono_id" : "CgKS9pcGLSqKuAbnF"
      } ;
    const res = findModele(source, profils) ;
    chai.assert.equal( res.nom, modele );
  });


  it(" intitule ", function() {
    const modele = 'intitule' ;
    const source = {
      "_id" : "sZL6oRrnyqbKeRrEa",
      "titre" : "ma vignette du soir, espoirT"
      } ;
    const res = findModele(source, profils) ;
    chai.assert.equal( res.nom, modele );
  });

});
