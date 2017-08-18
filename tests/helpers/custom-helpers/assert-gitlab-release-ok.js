import QUnit from 'qunit';
import Ember from 'ember';
import assertionBuilder from '../utils/defined-attribute-assertion-builder';

QUnit.assert.gitlabReleaseOk = assertionBuilder([
  'id',
  'url',
  'htmlUrl',
  'assetsUrl',
  'uploadUrl',
  'tarballUrl',
  'zipballUrl',
  'tagName',
  'targetCommitish',
  'name',
  'body',
  'draft',
  'prerelease',
  'createdAt',
  'publishedAt'
]);

export default Ember.Test.registerHelper(
  'assertGitlabReleaseOk',
  function (app, assert, release) {
    assert.gitlabReleaseOk(release);
  }
);
