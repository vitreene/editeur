import * as e from 'App/client/reducers/vue-empty'


export default function newVue(sequence_id, ordre){

// ce n'est pas ici qu'il faut attribuer un id à ikono,mais lors de l'upload.

  const ikono = e.emptyIkono({preview:'#'}) ;
  const source = e.emptySources({ikono_id:ikono._id}) ;
  const metas = e.emptyMetas({
    'accroche.action.aspect' : 'badge',
    'accroche.action.position.badge' : 'libre',
    'ikono[0].zone' : 'defaut'
  }) ;
  // remplacer par emptyCardvue
  const v = e.emptyCards({
    ordre, // +1, compte tenu du comptage à partir de zero
    vignette: '#'
  });

const {_id, ...vignette} = v ;
vignette.vue_id =_id ;

return {
  vignette,
  [_id]:{
    source,
    metas,
    ikono
    }
  }
}
