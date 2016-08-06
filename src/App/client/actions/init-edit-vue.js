import {GET_VUE} from 'App/client/constants/actionTypes'

// a faire :
// distinguer les corrections non validées -> state des publications -> bdd

export default (dispatch, sequence_id, _id) => {
  // console.log('EDITSEQthis', arguments);
  Meteor.call( 'getCurrentVue', sequence_id, _id,
    (error, initialState) => {
      if (error) { // handle error
        console.log('error',error);
        }
      else {
         console.log('EDITVUE initialState',initialState);
        dispatch({
          type: GET_VUE,
          vue: initialState
        });
      }
    }
   ) ;
}
