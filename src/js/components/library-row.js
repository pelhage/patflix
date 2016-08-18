import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Link } from 'react-router';

export default class LibraryRow extends Component {

  render() {
    return (
      <div key={index} className="bg--med">
        // <h2>{library.libName}</h2>
        <p>Library Size: <strong>{library.size}</strong> videos</p>
        <p>Library _id:    {library._id}</p>
        <p>Library libraryId:    {library.libraryId}</p>
        <Link className="btn btn-secondary" to={"/d/"+library.libraryId}>Edit Library</Link>
        <Link className="btn btn-secondary" to={"/r/"+library.libraryId}>DELETE Library</Link>
        <Link className="btn btn-secondary" to={"/l/"+library.libraryId}>VIEW Library</Link>
      </div>
    )
  }


}
