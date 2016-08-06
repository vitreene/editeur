import { Component, PropTypes } from 'react'
import { connect }  from 'react-redux';
import getVue from 'App/client/actions/init-edit-vue'
import EditVue from 'App/client/edit-vue/edit-vue'

class EditVueContainer extends Component {

  render() {
      return (
        <div>
        <EditVueTop />
        <EditVue {...this.props} />
        <EditVueBottom />
        </div>
      )
    }

}
// temporaire
const sequence_id = 'liste' ;

function mapStateToProps(state,ownProps) {
  // si la vue est en cache dans state
  const currentVue = state.vignettes.filter(
    x=>x._id===ownProps.params._id
  )[0];
  /*
  const currentVue =null ;
  */
  return {
    currentVue : currentVue || [],
    sequence_id : sequence_id,
    }
}

function mapDispatchToProps(dispatch) {
  return {
    getVue: (sequence_id,_id)=>{
      getVue(dispatch, sequence_id, _id)
    },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditVueContainer) ;


////////////////////////////////////
// barres d'etat provisoires
const EditVueTop = () =>{
  return( <div> barre de menu : </div> )
}
EditVueTop.propTypes = {};

const EditVueBottom = () => {
  return(<div> fond </div> )
}
EditVueBottom.propTypes = {};
