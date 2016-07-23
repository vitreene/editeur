import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import  Reorder from 'react-reorder'
import './list-import'

const list = [
  {
    _id : '01',
    ordre : 1,
    titre : 'vignette-01',
    couleur : 'blue'
  },
  {
    _id : '02',
    ordre : 2,
    titre : 'vignette-02',
    couleur : 'red'
  },
  {
    _id : '03',
    ordre : 3,
    titre : 'vignette-03',
    couleur : 'green'
  },
  {
    _id : '04',
    ordre : 4,
    titre : 'vignette-04',
    couleur : 'purple'
  },
  {
    _id : '05',
    ordre : 5,
    titre : 'vignette-05',
    couleur : 'coral'
  },
  {
    _id : '06',
    ordre : 6,
    titre : 'vignette-06',
    couleur : 'royalblue'
  },
];

// App component - represents the whole app
class App extends Component {

  render() {
      return (

        <Reorder
          itemKey='_id'
          holdTime='500'
          list={list}
          template={ListItem}
          callback={this.callback}
          listClass='list-vues'
          itemClass='list-vue'
          itemClicked={this.itemClicked}
          selectedKey='_id'
          disableReorder={false}/>
      );
    }
  }

class ListItem extends Component {
  render(){
  //  console.log('ListItem', this.props);
    return (
      <div
        style={ {backgroundColor:this.props.item.couleur} }
        >
        {this.props.item.titre}
      </div>
    )
  }
}

export default createContainer(() => {
//  Meteor.subscribe('vues');

  return {
  //  vues: Vues.find().fetch().vues,
  };
}, App);


/*
<Reorder
  // The key of each object in your list to use as the element key
  itemKey='name'
  // Lock horizontal to have a vertical list
  lock='horizontal'
  // The milliseconds to hold an item for before dragging begins
  holdTime='500'
  // The list to display
  list={[
    {name: 'Item 1'},
    {name: 'Item 2'},
    {name: 'Item 3'}
  ]}
  // A template to display for each list item
  template={ListItem}
  // Function that is called once a reorder has been performed
  callback={this.callback}
  // Class to be applied to the outer list element
  listClass='my-list'
  // Class to be applied to each list item's wrapper element
  itemClass='list-item'
  // A function to be called if a list item is clicked (before hold time is up)
  itemClicked={this.itemClicked}
  // The item to be selected (adds 'selected' class)
  selected={this.state.selected}
  // The key to compare from the selected item object with each item object
  selectedKey='uuid'
  // Allows reordering to be disabled
  disableReorder={false}/>
*/
