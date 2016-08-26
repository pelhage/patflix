import React, { PropTypes } from 'react'

const Video = (props) => {
  const { youtubeId, description } = props
  return (
    <div className="tile">
      <div className="tile__media">
        <div>
          <img className="tile__img" src={"http://img.youtube.com/vi/"+youtubeId+"/0.jpg"} />
        </div>
      </div>
      <div className="tile__details">
        <div className="tile__title">{description}</div>
      </div>
    </div>
  )
}

Video.propTypes = {
  youtubeId: PropTypes.string.isRequired,
  description: PropTypes.string
}

export default Video
