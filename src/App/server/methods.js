import Vues from 'App/collections/vues'

console.log('METHODS');

Meteor.methods({

  getCurrentSequence(sequence_id = 'liste'){
    check(sequence_id, String);
    return Vues.find ({ sequence_id: sequence_id }, { sort: { ordre: 1 } }).fetch() ;
  },

  getCurrentVue(sequence_id = 'liste', _id){
    console.log('_ID', _id);
    check(sequence_id, String);
    check(_id, String);
    return Vues.findOne({ _id:_id }) ;
  },

  orderList(list) {
    check(list, [String]);
    console.log('ORDERLIST', list);

    for (let i=0 ; i< list.length ; i++){
      Vues.update(list[i], {$set: {ordre:i}})
      }
  },

  toggleVue(_id){
    check(_id, String) ;
    console.log('TOGGLE_VISIBILITY', _id);

    const visible = Vues.findOne({_id:_id}).visible ;
    Vues.update( {_id:_id}, {$set: {visible: !visible} }) ;
  }

})
