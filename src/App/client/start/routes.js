import { Component, PropTypes } from 'react'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import editSequence from 'App/client/edit-sequence';
import editVue from 'App/client/edit-vue';
// import Instance from 'App/server/Instance';



export class AppRoutes extends Component {

  render() {
    console.log('PROPS', this.props);
      return (
        <Router history={browserHistory} >
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="sequence" component={editSequence} />
          <Route path="sequence/vue/:_id" component={editVue} />
          <Route path="instance" component={ShowInstance} />
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
function runInstance(_id) {

return  Meteor.call('runInstance',_id, (err, res) => {
    if (err) {
    //  console.log(err);
    } else {
      console.log('instance',res);
    }
  });
}


class ShowInstance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      out: 'rien' //runInstance('01')
    };
  }
  componentDidMount(){
    const _id = '01' ;
    Meteor.call('runInstance',_id, (err, res) => {
        if (err) {
        //  console.log(err);
        } else {
          console.log('instance',res, this.state.out);
          this.setState({out:res}) ;
        }
      });
  }
  render() {
    console.log('OUT', this.state.out);

    return(
      <div>
        <h2> resultat instance </h2>
        <p> {JSON.stringify(this.state.out,4)} </p>
      </div>
    )
  }
}
