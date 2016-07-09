const requireFields = (...names) => data =>
  names.reduce((errors, name) => {
    if (!data[name]) {
      errors[name] = 'Required'
    }
    // Validate URL
    if (data['url']) {
      var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = data['url'].match(regExp);
      if (!(match && match[2].length == 11)) {
        errors['url'] = 'Invalid Youtube URL or ID';
      }
    }
    return errors
  }, {})

const validateVideo = requireFields('url', 'categories')

const validateDeepForm = data => {
  const errors = {}
  if (!data.name) {
    errors.name = 'Required'
  }
  errors.videos = data.videos.map(validateVideo)
  return errors
}

export default validateDeepForm
