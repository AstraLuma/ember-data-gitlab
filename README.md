# Ember Data Gitlab

[![Build Status](https://travis-ci.org/astronouth7303/ember-data-gitlab.svg?branch=master)](https://travis-ci.org/astronouth7303/ember-data-gitlab)
[![Ember Observer Score](http://emberobserver.com/badges/ember-data-gitlab.svg)](http://emberobserver.com/addons/ember-data-gitlab)
[![Code Climate](https://codeclimate.com/github/astronouth7303/ember-data-gitlab/badges/gpa.svg)](https://codeclimate.com/gitlab/astronouth7303/ember-data-gitlab)

Ember Data abstraction for the [GitLab API](https://docs.gitlab.com/ce/api/).

## Installation

```
ember install ember-data-gitlab
```

## Usage

You need to choose how you wish to authenticate your GitLab requests using OAuth. `ember-data-gitlab` provides a simple
and direct mechanism that is specific to itself. Alternatively, you can use a more general authentication framework like
`ember-simple-auth`.

### Authenticating Directly

TODO

### Retrieving GitLab Data
The following examples show how to retrieve each supported GitLab entity as you might use it in your `model` hook.
```js
this.get('store').findRecord('gitlab-user', '#'); // get the current user
this.get('store').findRecord('gitlab-user', 'jimmay5469'); // get a user
this.get('store').findRecord('gitlab-repository', 'jimmay5469/old-hash'); // get a repository
this.get('store').findRecord('gitlab-branch', 'jimmay5469/old-hash/branches/master'); // get a branch
this.get('store').queryRecord('gitlab-branch', { repo: 'jimmay5469/old-hash', branch: 'master' }); // get a specific branch
this.get('store').query('gitlab-branch', { repo: 'jimmay5469/old-hash' }); // get a repo's branches
this.get('store').queryRecord('gitlab-release', { repo: 'jimmay5469/old-hash', releaseId: 1 }); // get a specific release
this.get('store').query('gitlab-release', { repo: 'jimmay5469/old-hash' }); // get a repo's releases
this.get('store').queryRecord('gitlab-blob', { repo: 'jimmay5469/old-hash', sha: '47c5438403ca875f170db2aa07d1bfa3689406e3' }); // get a file's contents
```

## Contributing

### Installation

* `git clone git@gitlab.com:astronouth7303/ember-data-gitlab.git`
* `cd ember-data-gitlab`
* `npm install`
* `bower install`

### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
