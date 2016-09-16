import Instance from 'App/server/Instance'


Meteor.methods({

  runInstance(_id = '01'){
    check(_id, String);
    const res = Instance(_id) ;
    console.log('INSTANCE', res);
    return res ;
  },

})
