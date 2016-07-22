import React, { Component } from 'react'

class RenderedCategories extends Component {

  render() {
    const { categories, handleClick } = this.props
    if (categories) {
      return (<div>
        {categories.map((category, index) => {
          return (<span key={index}>{category} <span data-category={category} onClick={handleClick}>x</span></span>)
        })}
      </div>)
    }
    else return <span>Add categories separated by tabs or commas</span>
  }
}

export default RenderedCategories;
