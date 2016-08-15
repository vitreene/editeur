import {LOAD_EDIT_VUE} from 'App/client/constants/actionTypes'

// a faire :
// distinguer les corrections non validées -> state des publications -> bdd

export default (dispatch,_id) => {
  // console.log('EDITSEQthis', arguments);
  Meteor.call( 'getVue', _id,
    (error, initialState) => {
      if (error) { // handle error
        console.log('error',error);
        }
      else {
         console.log('LOAD_EDIT_VUE initialState',initialState);
        dispatch({
          type: LOAD_EDIT_VUE,
          vue: initialState
        });
      }
    }
   ) ;
}
/*
export default (dispatch,_id) => {
  // console.log('EDITSEQthis', arguments);
  Meteor.call( 'getCurrentVue', _id,
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
*/
