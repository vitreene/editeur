import { Component, PropTypes } from 'react'
import { connect }  from 'react-redux'
import { bindActionCreators } from 'redux'
import {Toolbar,NavItem,Space} from 'rebass'
import { Link, NavLink } from 'react-router'

import loadVue from 'App/client/actions/init-edit-vue'
import {saveVue, saisie} from 'App/client/actions/edit-vue-actions'

import EditVue from 'App/client/edit-vue/edit-vue'


/*
EditVueContainer est le conteneur des trois parties de l'éditeur.
il charge les données et les dispatche dans les parties.
-> des données sont aussi transmises à la zone "options"

*/

class EditVueContainer extends Component {
  constructor(props) {
  super(props);
  this.state = {};
  this.onSaisie = this.onSaisie.bind(this);
  this.onClick = this.onClick.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
}

  componentWillMount() {
    console.log('THIS PROPS', this.props.loadVue, this.props );
    // charger les sources
    const {loadVue, _id } = this.props ;
    loadVue(_id);
  }

  onSaisie(e){
    e.preventDefault() ;
    const {saisie, _id } = this.props ;
    const {name, value} = e.target ;
    saisie(_id, name, value) ;
  }

  onClick(e){
    e.preventDefault() ;
    this.refs['editvue'].submit() ;

  }
  onSubmit(){
    const path = '/sequence' ;
    const callback = ()=>this.context.router.push(path) ;
    const {_id, vue,saveVue} = this.props ;
    saveVue(_id, vue, callback ) ;

    console.log('--> SUBMIT') ;
  }

  render() {

      return (
        <div>
        <EditVueTop
          onClick={this.onClick}
        />
        <EditVue
          ref={'editvue'}
          onSubmit={this.onSubmit}
          onSaisie={this.onSaisie}
          {...this.props}
          />
        <EditVueBottom />
        </div>
      )
    }

}
EditVueContainer.contextTypes = {
  router: PropTypes.object
}
EditVueContainer.propTypes = {
}

function mapStateToProps(state,ownProps) {
  // la vue est en cache dans state
  // en cas de reload, on perd le contenu.
  // à mettre en localstate ?
  const _id = ownProps.params._id ;
  const vue = state.vue[_id] ;
  const init = vue ? vue.source : undefined ;
/*
initialValues doit garder intactes les valeurs de départ, à partir desquelles les values sont copiées pour etre appliquées au formulaire.
cependant, sa toute première valeur sera 'vide', cette variable doit etre intitialisée au résultat de getEdit, (ou avec un statut loaded)
*/
  return {
    _id : _id,
    vue : vue,
    initialValues: init,

    }
}

function mapDispatchToProps(dispatch) {

  /* marche pas !
    return  bindActionCreators(
      {
        loadVue:loadVue,
        saisie: saisie
      },
      dispatch
      )

    return {
      actions : bindActionCreators(
      Object.assign({}, loadVue, saisie),
      dispatch
      )
    }
    */

  return {
    loadVue: (_id)=>{
      loadVue(dispatch, _id)
    },
    saveVue: (_id, vue,callback)=>{
      saveVue(dispatch, _id, vue,callback)
    },
    saisie: (_id, name, value)=>{
      saisie(dispatch, _id, name, value)
    },
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(EditVueContainer) ;


////////////////////////////////////
// barres d'etat provisoires
const EditVueTop = ({onClick}) =>{
  return(
    <Toolbar>
      <Link to="/sequence">annuler</Link>
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
