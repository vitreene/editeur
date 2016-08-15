import { Component, PropTypes } from 'react'
import { connect }  from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import {Toolbar,NavItem,Space} from 'rebass'
import getVue from 'App/client/actions/init-edit-vue'
import EditVue from 'App/client/edit-vue/edit-vue'

class EditVueContainer extends Component {

  onClick(e){
    e.preventDefault() ;
    console.log('this.refs.editvue', this.refs.editvue );
    // this.refs.editvue.getWrappedInstance().submit() ;
    this.refs.editvue.submit() ;
  }
  onSubmit(fields){
    console.log('submit', fields) ;
  }

  render() {

      return (
        <div>
        <EditVueTop
          onClick={this.onClick.bind(this)}
        />
        <EditVue
          ref={'editvue'}
          onSubmit={this.onSubmit.bind(this)}
          {...this.props}
          />
        <EditVueBottom />
        </div>
      )
    }

}

const EditVueFormContainer = reduxForm(
  { form: 'edit-source' }
  )(EditVueContainer);


function mapStateToProps(state,ownProps) {
  // la vue est en cache dans state
  // en cas de reload, on perd le contenu.
  // à mettre en localstate ?

  const currentVue = state.vignettes.filter(
    x=>x._id===ownProps.params._id
  )[0];
  return {
    currentVue : currentVue,
    _id : ownProps.params._id,
    vue : state.vue,
    initialValues: state.vue.source,

    }
}

function mapDispatchToProps(dispatch) {
  return {
    getVue: (_id)=>{
      getVue(dispatch, _id)
    },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditVueFormContainer) ;


////////////////////////////////////
// barres d'etat provisoires
const EditVueTop = ({onClick}) =>{
  return(
    <Toolbar>
      <NavItem is="a">
        annuler
      </NavItem>
      <Space  auto  x={1} />
      <NavItem onClick={onClick} >
        OK
      </NavItem>
    </Toolbar>
   )
}
EditVueTop.propTypes = {};

const EditVueBottom = () => {
  return(<div> fond </div> )
}
EditVueBottom.propTypes = {};
