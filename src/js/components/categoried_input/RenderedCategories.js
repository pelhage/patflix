import React, { Component } from 'react'

class RenderedCategories extends Component {

  render() {
    const { categories, handleClick } = this.props
    if (categories.length) {
      return (<div>
        {categories.map((category, index) => {
          return (<span className="category-tag" key={index}>{category} <span className="category-close" data-category={category} onClick={handleClick}>x</span></span>)
        })}
      </div>)
    }
    else {
      return <span>Add categories separated by tabs or commas</span>
    }
  }
}

export default RenderedCategories;
