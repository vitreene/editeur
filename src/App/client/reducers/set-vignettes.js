import {
  SET_VIGNETTES,
  ORDER_VIGNETTES,
} from 'App/client/constants/actionTypes'


export default function  vignettesReducer (state = [], action) {
  switch (action.type) {
    case SET_VIGNETTES:
      return action.vignettes;

    case ORDER_VIGNETTES :
      return setOrder(state,action.list);

    default:
      return state;
  }
};


function setOrder(state,list){
  return state
    .map( vignette => {
      vignette.ordre = list.findIndex( x=>x===vignette._id ) ;
      return vignette ;
    })
    .sort( (a,b)=>a.ordre-b.ordre ) ;
}
