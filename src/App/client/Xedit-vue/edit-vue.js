import { Component, PropTypes } from 'react'
import {Input} from 'rebass'
import { Field } from 'redux-form'


const renderInput = field => {
  console.log('field',field);
  return (
  <div>
    <input {...field.input}/>
    {field.touched &&
     field.error &&
     <span className="error">{field.error}</span>}
  </div>
)}

export default class EditVue extends Component {

  componentWillMount() {
    // charger les sources
    const {getVue, _id } = this.props ;
    getVue(_id);
  }

  render() {
    console.log('PROPS', this.props);
    const { handleSubmit } = this.props ;
    return(
      <div>
        <h1 >
          edition
        </h1>

           <div>
              <label>Titre</label>
              <Field
                name="titre"
                component={renderInput}
                type="text"
                />
            </div>
     </div>
    )
  }
}
