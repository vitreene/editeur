import { chai } from 'meteor/practicalmeteor:chai';
//import chai  from 'chai';
//import { shallow } from 'enzyme';

import  {aDansB, aSomeB, aTousB} from 'App/Instance/utils';

console.log("anybody out there ?");
//import 'App/server/edit-vue-methods.js'

const a = ["titre", "description", "ikono_id", "prix_promo", "offre", "prix", "accroche", "bloc-titre", "bloc-prix", "bloc-message","bloc-zone"] ;


describe('a est dans b', function() {

  it("['titre', 'description'] retourne true", function() {
    const b = ['titre', 'description'] ;
    chai.assert.isTrue(aDansB(a,b));
  });

  it( "['totox', 'description'] retourne false", function() {
    const b = ['totox', 'description'] ;

    //console.log( 'TEST :', aDansB(a,b));

    chai.assert.isFalse(aDansB(a,b));
  });

  it('  []  retourne true ', function() {
    const b = [] ;
    chai.assert.isTrue(aDansB(a,b) );
  });

  it('undefined  retourne true ', function() {
    const b = undefined ;
    chai.assert.isTrue(aDansB(a,b) );
  });

});



describe('a egale b', function() {

  it(" ['accroche','titi']  retourne true ", function() {
    const a = ['accroche','titi']  ;
    const b = ['accroche','titi']  ;
    chai.assert.isTrue(aTousB(a,b));
  });

  it(" b: undefined retourne true ", function() {
    const a = ['accroche','toto'] ;
    const b = undefined  ;
    chai.assert.isTrue(aTousB(a,b));
  });

  it(" a:['accroche'] retourne false ", function() {
    const a = ['accroche']  ;
    const b = ['accroche','toto']  ;
    chai.assert.isFalse(aTousB(a,b));
  });

  it(" a:['accroche','titre'] retourne false ", function() {
    const a = ['accroche','titre']  ;
    const b = ['accroche','toto']  ;
    chai.assert.isFalse(aTousB(a,b));
  });

  it(" []  retourne true ", function() {
    const a = []  ;
    const b = []  ;
    chai.assert.isTrue(aTousB(a,b));
  });

})

describe('certains de a sont dans b', function() {

    it(" ['accroche','toto']  retourne true ", function() {
      const b = ['accroche','toto']  ;
      chai.assert.isTrue(aSomeB(a,b));
    });

    it(" ['toto', 'titi']  retourne false ", function() {
      const b = ['toto', 'titi'] ;
      chai.assert.isFalse(aSomeB(a,b));
    });

    it("['accroche','condition'] retourne true", function() {
      const b = ['accroche','condition'] ;
      chai.assert.isTrue(aSomeB(a,b));
    });

    it('  []  retourne false ', function() {
      const b = [] ;
      chai.assert.isFalse(aSomeB(a,b));
    });


    it('undefined  retourne true ', function() {
      const b = undefined ;
      chai.assert.isTrue(aSomeB(a,b));
    });

 });


/*
*/
describe('Mocha', function () {
  it('il fonctionne', function () {
    // This code will be executed by the test driver when the app is started
    // in the correct mode
  })
})
/*
  describe('Hello', function() {
    it('should start with Hello', function() {
      const wrapper = shallow(<Hello name="Bob" />);
      chai.assert.equal(wrapper.text().indexOf('Hello'), 0);
    });

    it('should display the name', function() {
      const wrapper = shallow(<Hello name="Bob" />);
      chai.assert.above(wrapper.text().indexOf('Bob'), -1);
    });
  });
*/

/*
  const _ID_01 = {
    titre : 'ma vignette 01',
    ikono_id:'ik01',
    description: 'Test de la source',
    offre : 'trois pour le prix d’un !',
    prix:50,
    prix_promo:49
  };

*/
