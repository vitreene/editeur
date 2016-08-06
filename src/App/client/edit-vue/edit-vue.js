import { Component, PropTypes } from 'react'

export default class EditVue extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {getVue,currentVue,sequence_id } = this.props ;
    const _id = this.props.params._id ;

    if (0<currentVue.length) {
      console.log('get vue', _id);
      getVue(
        sequence_id,
        _id
      );
    }
  }
  render() {
    const {currentVue} = this.props ;
    console.log('VUE currentVue',currentVue );
    if (currentVue)
    return(
      <h1 style={{'color': currentVue.couleur}}>
        edition : {currentVue.titre}

     </h1>
    )
    else return (
      <h2 > chargement </h2>
    )
  }
}
