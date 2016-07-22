import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import Input from '../form/Input'
import RenderedCategories from './RenderedCategories'

class CategoriedInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentCategory: '',
      categories: this.props.currentVideo.categories || []
    }

    this.addToCategories = this.addToCategories.bind(this)
    this.handleCategories = this.handleCategories.bind(this)
    this.removeFromCategories = this.removeFromCategories.bind(this)

  }

  addToCategories(e) {
    if ((e.which === 9 || e.which === 9) ||
        (e.keyCode === 188 || e.keyCode === 188)) {
      e.preventDefault()
      let categories = this.state.categories.slice()
      if (categories.indexOf(e.target.value === -1)) {
        categories.push(e.target.value)
      }
      this.setState({ currentCategory: '', categories })
    }
  }

  handleCategories(e) {
    this.setState({ currentCategory: e.target.value })
  }

  removeFromCategories(e) {
    const category = e.target.getAttribute('data-category')
    const categories = this.state.categories.slice()

    categories.splice(categories.indexOf(category), 1)
    this.setState({ categories })
    this.props.onCategoryChange()
  }

  render() {

    return (<div>
      <Input onKeyDown={this.addToCategories} onChange={this.handleCategories} value={this.state.currentCategory} />
      <RenderedCategories categories={this.state.categories} handleClick={this.removeFromCategories} />
    </div>)
  }
}

function mapStateToProps(state) {
  return { currentVideo: state.libraries.currentVideo };
}

export default connect(mapStateToProps, actions)(CategoriedInput);



/*
allCategories[],
featuredCategories[],
featuredVideos[],

allCategories = [
  {
    name: 'Category Name'
    count: 0
  },
  {

  },
]
[]

// addToCategories
  // Add to the individual video's categories
  // Check to see if it exists in allCategories.forEach((item, index) => {})
    // If it does, increment
    // If not, push to allCategories { name: category, count: 1 }

// removeFromCategories (press x next to span)
  // remove from individual video's categories
  // Before moving on, check to see if it exists elsewhere... (eventually a counter will be better Big O)
  // Check to see if it exists in allCategories
    // If it does, decrement
      // If count = 0, remove

// Use currentVideo's categories as what is being added and pushed
// Use currentLib's videos[].reduce().indexOf(category) || allCategories.forEach()


// If count
*/
// Figure out best way to add and remove allCategories
// User clicks on video...
  // Video info populates form
    // Array of categories gets parsed down into string for editing...
    //
