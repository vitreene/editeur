import {LOAD_EDIT_VUE} from 'App/client/constants/actionTypes'

// tester si la vue est en cache : actionCreators.js
// http://redux.js.org/docs/recipes/ReducingBoilerplate.html


export default (dispatch, vue_id) => {

  Meteor.call( 'getVue',vue_id,
    (error, initialState) => {
      if (error) { // handle error
        console.log('ID', vue_id,'error',error);
        }
      else {
        console.log('LOAD_EDIT_VUE initialState',initialState);

        dispatch({
          type: LOAD_EDIT_VUE,
          vue: initialState
        });

      }
    }
   );
}
