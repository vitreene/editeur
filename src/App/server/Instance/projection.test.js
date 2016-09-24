import chai  from 'chai';
const {expect} = chai ; // preference and tested with expect
chai.use(require("chai-sorted"));

import  {getOrdreListe } from 'App/server/Instance/process-projection';


console.log("hello, quo vadis ?");
/////////////////////


const liste = [ { "vue_id" : "01", "visible" : true, "ordre" : 2 },
                { "vue_id" : "02", "visible" : false, "ordre" : 1 },
                { "vue_id" : "03", "visible" : true, "ordre" : 0 } ] ;

const liste2 = [ { "vue_id" : "01", "visible" : true, "ordre" : 2 } ] ;
const liste3 = [ ] ;

describe('renvoie le tableau Ordre :', function() {

  it(" [03,02,01] retourne ['03', '01'] ", function() {
    const test = ['03', '01'] ;
    const res = getOrdreListe(liste) ;
    chai.assert.sameDeepMembers( res, test );
  });

  it(" [001] retourne ['01'] ", function() {
    const test = ['01'] ;
    const res = getOrdreListe(liste2) ;
    chai.assert.sameDeepMembers( res, test );
  });

  it(" [ ] retourne [ ] ", function() {
    const test = [ ] ;
    const res = getOrdreListe(liste3) ;
    chai.assert.sameDeepMembers( res, test );
  });


});
