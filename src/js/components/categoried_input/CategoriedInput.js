import React, { Component, PropTypes } from 'react'
import { Input } from '../form'
import RenderedCategories from './RenderedCategories'

class CategoriedInput extends Component {
  constructor(props) {
    super(props)
    // console.log('CategoriedInput re-render: ', props)
    this.state = {
      currentCategory: ''
    }
    // Bind helper methods
    this.addToCategories = this.addToCategories.bind(this)
    this.handleCategories = this.handleCategories.bind(this)
    this.removeFromCategories = this.removeFromCategories.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    // console.log('Component receiving next props: ', nextProps)
    this.setState({ categories: nextProps.categories })
  }

  // Push a category to the component's state
  addToCategories(e) {
    // Check the key the user has pressed
    const commaOrTabPress = (e.which === 9 || e.which === 9) ||
        (e.keyCode === 188 || e.keyCode === 188)
    const inputValue = e.target.value.trim()

    if (commaOrTabPress) {
      e.preventDefault()
      if (inputValue.length) {
        let categories = this.props.categories.slice()
        if (categories.indexOf(inputValue) === -1) {
          categories.push(inputValue)
        }
        this.setState({ currentCategory: '', categories })
        this.props.onCategoryChange(categories)
      }
    }
  }
  // Update the current category being worked on
  handleCategories(e) {
    // // console.log('CategoriedInput state', this.state)
    this.setState({ currentCategory: e.target.value })
  }

  // Remove the category from component state, and call
  removeFromCategories(e) {
    const category = e.target.getAttribute('data-category')
    // console.log('remove ', category, ' from', this.state.categories)
    const categories = this.state.categories.slice()
    categories.splice(categories.indexOf(category), 1)
    this.setState({ categories })
    this.props.onCategoryChange(categories)
  }

  render() {
    return (<div>
      <Input onKeyDown={this.addToCategories} placeholder={this.props.placeholder} onChange={this.handleCategories} value={this.state.currentCategory} />
      <RenderedCategories categories={this.props.categories} handleClick={this.removeFromCategories} />
    </div>)
  }
}

CategoriedInput.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
}

export default CategoriedInput;



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
