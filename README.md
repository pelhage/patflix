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
- [ ]  List existing bugs

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

- [ ]  Gather exhaustive list of current dependencies + versions
- [ ]  List out new deps and plan for front end tech
- [ ]  List out longer-term plan for front end tech options

### API Server

- [ ]  Gather exhaustive list of current dependencies + versions
- [ ]  List out new deps and plan for API server tech
- [ ]  List out longer-term API server options

## Add Testing infrastructure with CI/CD

At this point, it might be worthwhile to set up testing infrastructure so that we can add tests on existing behavior before doing a more significant refactor

## Refactor Project Code

This stage is when we are no longer concerned with modernizing the tech stack, but moreso focused around cleaning up the code, improving the architecture, testability, as well as possibly swapping out components for different tech.