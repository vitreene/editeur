import {
  SET_VIGNETTES,
  ORDER_VIGNETTES,
  TOGGLE_VISIBILITY,
  ADD_VUE,
  EDIT_VUE,
} from 'App/client/constants/actionTypes'


export default function  vignettesReducer (state = [], action) {
  switch (action.type) {
    case SET_VIGNETTES:
      return action.vignettes;

    case ORDER_VIGNETTES :
      return setOrder(state,action.list);

    case TOGGLE_VISIBILITY :
      return toggleVisibility(state,action._id);

    case EDIT_VUE :
      return editVue(state,action._id,action.history);

    case ADD_VUE :
      return addVue(state,action.sequence_id);

    case 'GET_VUE' :
      return getVue (state, action.vue)

    default :
      return state;
  }
};

function getVue (state, vue) {
  // remplacer, sinon ajouter la vue
  let flag = true ;
  const vignettes = state.map( vignette => {
    if (vignette.id===vue.id) {
      flag = false ; return vue ;
    } else return vignette ;
  })
  if (flag) vignettes.push(vue) ;

  return vignettes ;
}


function setOrder(state,list){
  return state
    .map( vignette => {
      vignette.ordre = list.findIndex( x=>x===vignette._id ) ;
      return vignette ;
    })
    .sort( (a,b)=>a.ordre-b.ordre ) ;
}


function toggleVisibility ( state , _id ) {
  return state.map( (vignette) => {
      if (_id === vignette._id) {
        return {
          ...vignette,
          visible: !vignette.visible
         }
      }
      return vignette ;
    })
}


function addVue(state, sequence_id) {
  console.log('AJOUTER une vue à la sequence ${sequence_id}');
  return state ;
}

function editVue( state, _id, history) {
  history.push('/sequence/vue/' + _id );
  return state ;
}
