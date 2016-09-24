import { Component, PropTypes } from 'react'
import { connect }  from 'react-redux-meteor';

import {
  orderList,
  toggleVue,
  addVue,
  editVue,
} from 'App/client/actions/edit-sequence-actions'
import initialState from 'App/client/actions/init-edit-sequence'

import EditList from './edit-list'

// uses the shorthand form of mapDispatchToProps where each property of the supplied object is expected to be an action creator and is wrapped in a call to dispatch.

// simplifier les actions en envoyant l'index de l'élément qui génere l'action.
// voir http://blog.scottlogic.com/2016/05/19/redux-reducer-arrays.html

// pour tests
const sequence_id = 'liste' ;

/*
ici composer la vue avec :
- la barre du haut -> toggle edit, titre sequence,
- editSequence
- la barre du bas -> telco et options
*/
class EditSequence extends Component {
  render() {
    console.log('EditSequence this.props', this.props);
      return (
        <div>
        <EditSequenceTop editMode= {this.props.editMode}/>
        <EditList {...this.props} />
        <EditSequenceBottom isPlaying= {this.props.isPlaying}/>
        </div>
      )
    }

}

function mapStateToProps(state) {
  return {
    vignettes: state.vignettes || [],
    sequence_id : sequence_id,
    editMode : false,
    isPlaying : true
    }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    addVue,
    editVue,
    orderList,
    toggleVue,
    initialState
    //addVue: (sequence_id, length,history)=>{addVue(dispatch,sequence_id, length,history)},
    // editVue: (_id, history)=>{editVue(dispatch, _id, history)},
    // orderList: (list)=>{orderList(dispatch,list)},
    //toggleVue: (_id)=>{toggleVue(dispatch,_id)},
    //initialState: (sequence_id)=> {initialState(dispatch,sequence_id)}
    }
}

export default connect(
  null,
  mapStateToProps,
  mapDispatchToProps
)(EditSequence) ;


// barres d'etat provisoires
const EditSequenceTop = ({editMode}) => {
  const edit = (editMode) ? 'MODE EDIT' : 'MODE VUE' ;
  return(
    <div>
      barre de menu :  {edit}
   </div>
  )
}

EditSequenceTop.propTypes = {
    editMode: PropTypes.bool
};

const EditSequenceBottom = ({isPlaying}) => {
  const playState = (isPlaying) ?'PLAY' : 'PAUSE' ;
  return(
    <div>
      telco  = {playState}
   </div>
  )
}

EditSequenceBottom.propTypes = {
    isPlaying: PropTypes.bool
};
