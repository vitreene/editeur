import chai  from 'chai';

import {upsert} from 'App/server/edit-sequence-methods'


describe('upsert remplace ou ajoute si manquant', function() {

  const arr = [
    {x:1,y:2},
    {x:3,y:4},
    {x:8, y:9}
  ];
  const el = 'x' ;

  const arr2 = [
        {
            "vue_id" : "01",
            "visible" : true,
            "ordre" : 2,
            "titre" : "ma vignette 01",
            "couleur" : "blue",
            "vignette" : "http://localhost:3000/ufs/vignettes/b8qN78gmpn28huzRS/3912201.jpg"
        },
        {
            "vue_id" : "02",
            "visible" : false,
            "ordre" : 1,
            "titre" : "ma vignette 02",
            "couleur" : "red",
            "vignette" : "http://localhost:3000/ufs/vignettes/soh2jY6es4SA5bByz/815547-agar-art-microbes-mosaique.jpg"
        },
        {
            "vue_id" : "03",
            "visible" : false,
            "ordre" : 3,
            "titre" : "ma vignette 03",
            "couleur" : "green",
            "vignette" : "http://localhost:3000/ufs/vignettes/Eg8ozkJnHffnfoa2t/205439_6577026_pm.jpg"
        },
        {
            "vue_id" : "2efxxkjFf8FcoDbuJ",
            "ordre" : 0,
            "visible" : true,
            "titre" : "ma vignette du soir, fin",
            "vignette" : "http://localhost:3000/ufs/vignettes/AMRngbpRjivHAhf54/205439_6577026_pm.jpg",
            "couleur" : "blue"
        }
    ] ;
  const obj2 = {
      "vue_id" : "01",
      "visible" : true,
      "ordre" : 2,
      "titre" : "ma vignette du soir, esp",
      "couleur" : "blue",
      "vignette" : "http://localhost:3000/ufs/vignettes/7rCo7YpRgWmgxgmfR/2014MMB58.jpg"
  };
  const el2 = "vue_id" ;

  it("remplace un element ", function() {
      const obj = {x:8,y:6666} ;
      const res =  upsert(arr, obj, el) ;
    //  console.log('UPSERT', res );
      chai.assert.lengthOf(res,3 );
    });

  it("ajoute un element ", function() {
    const obj = {x:5,y:6} ;
    const res =  upsert(arr, obj, el) ;
  //  console.log('UPSERT', res );
    chai.assert.lengthOf(res , 4);
  });


  it("remplace une vue ", function() {
    const res =  upsert(arr2, obj2, el2) ;
  //    console.log('UPSERT', res );
    chai.assert.lengthOf(res,4 );
  });

});
