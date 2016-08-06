import {SET_VIGNETTES} from 'App/client/constants/actionTypes'

export default (dispatch, sequence_id) => {
  // console.log('EDITSEQthis', arguments);
  Meteor.call( 'getCurrentSequence', sequence_id,
    (error, initialState) => {
      if (error) { // handle error
        console.log('error',error);
        }
      else {
        // console.log('initialState',initialState);
        dispatch({
          type: SET_VIGNETTES,
          vignettes: initialState
        });
      }
    }
   ) ;
}
