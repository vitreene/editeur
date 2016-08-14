import {
  LOAD_EDIT_VUE,
  SAISIE,
} from 'App/client/constants/actionTypes'


export default function  vueReducer (state = {}, action) {
  switch (action.type) {

    case LOAD_EDIT_VUE :
      return loadEditVue(state,action.vue);

    case SAISIE :
      return saisie(state,action.modif);

    default :
      return state;
  }
};



function loadEditVue(state, vue) {
  console.log('loadEditVue', vue);
  return vue ;
}

function saisie(state,{_id, name, value}) {
  console.log('STATE', state, state[_id]);
  console.log('STATE.source', state[_id].source);
  return {
    ...state,
    [_id] : {
      ...state[_id],
      source: {
      ...state[_id].source,
      [name]:value
      }
    }
  }
}
/*
function getVue (state, vue) {
  // remplacer, sinon ajouter la vue
  let flag = true ;
  const vignettes = state.map( vignette => {
    if (vignette._id===vue._id) {
      flag = false ; return vue ;
    } else return vignette ;
  })
  if (flag) vignettes.push(vue) ;

  return vignettes ;
}
*/
