<details>
<summary>
Environment Set up:
* Have docker installed
</summary>

Client Server:
```
cd client && docker-compose up
```

API/Backend Server:
```
cd api-server && docker-compose up
```
</details>

# Patflix 2020 Re-Write
Patflix was a project started in late 2015 and completed in 2016. It's been 4 years since its last commit, and I've been wanting to revisit this project, clean it up, and add new features based on my learnings since then.

## **Motivations:**

- Desire to apply knowledge gained since 4 years ago
- This project is featured on my Github, and its worthwhile to keep it clean and representative of my current skillset
- Update tech stack that is 4 years old
- No CI/CD, awkward tooling and CLI commands
- Dated architecture from when I was less experienced
- Existing bugs that need fixing
- Wishes to expand and build new features

## **Plan:**

- Document existing flows, use cases, bugs, etc.
- Small high-level project restructure separating client and back end code
- Update existing dependencies, retaining existing tech as much as possible
- Add testing infrastructure and initial CI/CD pipeline
- Incrementally swap out certain deps for better alternatives that are close to the existing stack, that also align with future plans of the project
- Improve project infrastructure, CI/CD, testing, etc.

## **Success Criteria:**

- FE is updated to latest versions of core dependencies
- BE is updated to latest versions of core dependencies
- Initial CI/CD pipeline is set up, with basic testing infrastructure
- Address and fix known bugs

## Documenting the current system

- [ ]  List current user stories
    * As a guest, I can only view the sign in, signup, and about pages
        * Trying to create a library at any point redirects me to sign in
    * As a user, I can view the home page for patflix.co and see the currently used tech stack
    * As a user, I can signout, and see a signout message
    * SIGN UP:
        * Inline validation when entering password saying they must match; can't submit
        * Validation upon submit of whether email is valid
        * Upon user creation, I am redirected to libraries page
    * LIBRARIES PAGE:
        * When empty, there is text prompting me to create a library
        * Clicking the button takes me to "Dashboard"
    * DASHBOARD PAGE:
        * Pasting a youtube URL shows a thumbnail 
        * Entering a category puts the video in a new row
        * Not entering a category places it in an "Uncategorized" category
        * Clicking feature this library places it in the carousel, as well as in a row
        * Can delete a library
        * Can edit a library

- [ ]  List existing bugs
    * Creating a library and hitting the play button on featured carousels will direct you to the video; Hitting back on browser erases your entire library.
    * Adding a single video to a category displays 3 videos
        * Adding another alternates the videos and duplicates them
    * Confirm deletion button on dashboard page is kinda hacky
    * Saving Library section in dashboard overflows
    * Menu Dropdown is also kinda hacky
    * Sometimes library doesn't save- network request fails, probably invalid payload
        * Added a video that was featured, with description, three tags
- [ ]  List improvements
    * Redirect to sign up instead of sign in
    * Improve Components Layout
    * allow individual video entries to be updated
    * Put add library button within the Dashboard UI too.
    * Add share link inside dashboard button for library items
    * Make completely mobile responsive
    * Have actual empty states, not an image (lol)
    * i18n support
    * BE-driven UI


## Initial project re-structure

As a pre-requisite for the refactors and tech upgrades, we'll split up the front end and back end code bases so that the high level project structure is clearer and more obvious.

**Existing Project Structure**

    /config
    /controllers
    /dist
    /models
    /scripts
    /server
    /services
    /src
    /views
    .babelrc
    .gitignore
    app.js
    config.js
    package.json
    README.md
    routes.js
    server.js
    webpack.config.js

**Proposed Project Structure**

This fundamentally re-structures the app with minimal code changes. The longer-term goal will be to further modularize the different services/layers of our stack.

    /api-server
    	/models
    	/controllers
    	/services
    	server.js
    	routes.js
    /client
    	/dist
    	/src
    	/views
    	server.js
    	webpack.config.js
    /scripts
    package.json

## Updating Existing Dependencies

### **Front End Client**

- [x]  Gather exhaustive list of current dependencies + versions
    * `"axios": "^0.12.0"` (high priority)
    * `"body-parser": "^1.15.1"` (high priority)
    * `"express": "^4.13.4"` (high priority)
    * `"hashids": "1.0.2"` (low priority)
    * `"jsonwebtoken": "^7.0.1"`
    * `"lodash": "^4.14.0"` (high)
    * `"morgan": "^1.7.0"`
    * `"pug": "^2.0.0-beta5"` (low)
    * `"react": "^0.14.3"` (HIGH)
    * `"react-dom": "^0.14.3"` (HIGH)
    * `"react-redux": "^4.4.5"` (HIGH)
    * `"react-router": "^2.4.1"` (HIGH)
    * `"react-simple-dropdown": "^1.1.4"` (HIGH)
    * `"react-slick": "^0.12.2"` (HIGH)
    * `"redux": "^3.5.2"`(HIGH)
    * `"redux-form": "^5.2.5"` (HIGH)
    * `"redux-thunk": "^2.1.0` (HIGH)
- [x]  List out new deps and plan for front end tech
    * Update the client server, and build tooling as much as possible:
        * express
        * pug
        * babel
    * Then update react to safest version possible, likely react 15?
        * Consider making the full leap, but almost everything will break.
        * And redux might not even be needed anymore for this simple app
        * ^^ got a strong dep on redux-form though.
- [ ]  List out longer-term plan for front end tech options
    *  Kill redux
    *  Introduce apollo for api fetching layer

### API Server

- [x]  Gather exhaustive list of current dependencies + versions
- [x]  List out new deps and plan for API server tech
- [ ]  List out longer-term API server options

## Add Testing infrastructure with CI/CD

At this point, it might be worthwhile to set up testing infrastructure so that we can add tests on existing behavior before doing a more significant refactor



## Refactor Project Code

This stage is when we are no longer concerned with modernizing the tech stack, but moreso focused around cleaning up the code, improving the architecture, testability, as well as possibly swapping out components for different tech.