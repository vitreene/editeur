// import { Methods } from 'meteor/meteor'
 import { Meteor } from 'meteor/meteor'

import Vues from 'App/collections/vues'

console.log('METHODS');

Meteor.methods({
  orderList(data) {
    check(data,[String]);
    
    console.log('ORDERLIST', data);

    for (let i=0 ; i< data.length ; i++){
      Vues.update(data[i], {$set: {ordre:i}})
      }
      /*
    */
    // marche po
    //    const vu =Vues.update( { _id:{$each: data } },
    //      { $push: {ordre:  { $each: [1,2,3,4,5,6,7,8,9,10,11,12] } }}) ;

    // return vu ;
  }

})
