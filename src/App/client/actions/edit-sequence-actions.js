
import {
  ORDER_VIGNETTES,
  TOGGLE_VISIBILITY,
  ADD_VUE,
  EDIT_VUE,
  LOAD_EDIT_VUE,
} from 'App/client/constants/actionTypes'

import newVue from  'App/client/reducers/nouvelle-vue'


export function orderList(dispatch, list, sequence_id){
  return dispatch( () => {
    Meteor.call('orderList', list, sequence_id,
    (err, res) => {
      if (err) console.log('orderList', list, sequence_id,'error',err) ;
      else
      dispatch({
        type: ORDER_VIGNETTES,
        list
      });
    });
  });
}



export function toggleVue(dispatch, vue_id, sequence_id){
  return dispatch( () => {
    Meteor.call('toggleVue', vue_id, sequence_id,
    (err, res) => {
      if (err) console.log('toggleVue id', vue_id,'error',err) ;
      else
      dispatch({
        type: TOGGLE_VISIBILITY,
        vue_id
      });
    });
  });
}



export function addVue(dispatch, sequence_id, ordre, history) {

  const vue = newVue(sequence_id, ordre) ;
  const {vignette, vignette:{vue_id}, ...vueEdit} = vue ;

// la vignette doit n'etre créée qu'à l'enregistrement de la vue
// à deplacer et ajouter à saveVue
  dispatch({
    type : ADD_VUE,
    vignette
  })

  dispatch({
    type : LOAD_EDIT_VUE,
    vue: vueEdit
  })

  return dispatch({
    type : EDIT_VUE,
    history,
    vue_id,
    sequence_id
  });
}

export function editVue(dispatch, vue_id, sequence_id, history) {

  return dispatch({
    type : EDIT_VUE,
    history,
    vue_id,
    sequence_id
  });
}
