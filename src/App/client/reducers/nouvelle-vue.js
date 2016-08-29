import * as e from 'App/client/reducers/vue-empty'


export default function newVue(sequence_id, length){

  const ikono = e.emptyIkono({preview:'#'}) ;
  const source = e.emptySources({ikono_id:ikono._id}) ;
  const metas = e.emptyMetas() ;
  const vignette = e.emptyVues({
    sequence_id : sequence_id,
    source_id : source._id,
    metas_id : metas._id,
    ordre: length+1,
    vignette: '#'
    // ikono_id : ikono._id
  })

return {
  vignette,
  [vignette._id]:{
    source,
    metas,
    ikono
    }
  }
}
