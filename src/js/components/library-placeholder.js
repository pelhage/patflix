import React, { Component } from 'react'
import { Link } from 'react-router'

class LibraryPlaceholder extends Component {
  render() {
    return (<div className="flex justify-center">
      <div className="flex--lg flex-col">
        <h1 className="text-center">You Have No Libraries</h1>
        <div className="bg--light padding--med margin-btm--med text-center">
          <h3>Creating a library is simple!</h3>
          <div>
            <p>Paste YouTube video URLs, then tag them with categories.</p>
            <p>Patflix will generate the layout based on your tags, and create a shareable link.</p>
          </div>
          <Link className="btn btn-primary full-width" to={"/dashboard"}>Create A Library</Link>
        </div>
      </div>
    </div>)
  }
}

export default LibraryPlaceholder
