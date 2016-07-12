import React, { Component, PropTypes } from 'react'
import PureInput from './PureInput'
import PureTextArea from './PureTextArea'
import Thumbnail from './Thumbnail';

class Video extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.url !== nextProps.url ||
      this.props.description !== nextProps.description ||
      this.props.categories !== nextProps.categories ||
      this.props.isFeatured !== nextProps.isFeatured
  }


  render() {
    // console.log('Video Component Props: ', this.props);
    const { url, description, categories, isFeatured } = this.props

    return (<div>
      <div className="form__input-container">
        <label className="form__label">YouTube URL {url.touched && url.error && <span>{url.error}</span>}</label>
        <PureInput type="text"
          placeholder="Video URL"
          field={url}
          title={url.error}
        />
        {!url.error && <div><Thumbnail url={url.value} /></div>}
      </div>
      <div className="form__input-container">
        <label>Feature this video in your library</label>
        <PureInput type="checkbox"
          className="form__checkbox"
          field={isFeatured}
          checked={isFeatured.value}
          />
      </div>
      <div className="form__input-container">
        <label className="form__label">Description</label>
        <p>Write a short summary of what this video is about.</p>
        <PureTextArea placeholder="Video Description"
          field={description}
          title={description.error}/>
      </div>
      <div className="form__input-container">
        <label className="form__label">Categories</label>
        <PureInput type="text"
          placeholder="Categories"
          field={categories}
          title={categories.error}
          />
      </div>
    </div>
    )
  }
}

// Video.propTypes = {
//   url: PropTypes.object.isRequired,
//   description: PropTypes.object.isRequired,
//   categories: PropTypes.object.isRequired,
//   isFeatured: PropTypes.object.isRequired
// }

export default Video
