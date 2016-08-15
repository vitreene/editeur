import { Component, PropTypes } from 'react'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import editSequence from 'App/client/edit-sequence';
import editVue from 'App/client/edit-vue';



export class AppRoutes extends Component {

  render() {
    console.log('PROPS', this.props);
      return (
        <Router history={browserHistory} >
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="sequence" component={editSequence} />
          <Route path="sequence/vue/:_id" component={editVue} />
      </Route>
    </Router>
      )
    }
}

/*
*/
class App extends Component {
  render() {
    return this.props.children;
  }
}


class Home extends Component {
  render() {
    return(
      <div>
        <h2>  Bienvenue dans Diyapo </h2>
        <Link to="/sequence">editer la sequence</Link>
         {this.props.children}
     </div>
    )
  }
}

/*
class editVue extends Component {
  render() {
    return(
      <div>
        <h2>  editer la vue  {this.props.params._id}</h2>
     </div>
    )
  }
}
*/
