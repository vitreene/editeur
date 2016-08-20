import {
  SET_VIGNETTES,
  ORDER_VIGNETTES,
  UPDATE_VIGNETTE,
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

    case UPDATE_VIGNETTE :
      return updateVignette(state,action.vignette);

    case TOGGLE_VISIBILITY :
      return toggleVisibility(state,action._id);

    case EDIT_VUE :
      return editVue(state,action._id,action.history);

    case ADD_VUE :
      return addVue(state,action.vignette);

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
    if (vignette._id===vue._id) {
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


function addVue(state, vignette) {
  //console.log('AJOUTER une vue à la sequence', state, vignette);
  return state.concat([vignette]) ;
}

function editVue( state, _id, history) {
  history.push('/sequence/vue/' + _id );
  return state ;
}

function updateVignette(state, vignette){
  return state.map( vue => (vue._id === vignette._id) ? vignette : vue ) ;
}
