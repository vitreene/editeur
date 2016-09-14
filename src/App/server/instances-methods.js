import Instance from 'App/server/Instance'


Meteor.methods({

  runInstance(_id = '01'){
    check(_id, String);
    Instance(_id) ;
  },

})
