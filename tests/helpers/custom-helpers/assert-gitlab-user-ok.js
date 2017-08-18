import QUnit from 'qunit';
import Ember from 'ember';
import assertionBuilder from '../utils/defined-attribute-assertion-builder';

QUnit.assert.gitlabUserOk = assertionBuilder([
  'id',
  'login',
  'name',
  'type',
  'avatarUrl',
  'publicRepos',
  'publicGists',
  'followers',
  'following',
  'createdAt',
  'updatedAt',
  'url'
]);

export default Ember.Test.registerHelper(
  'assertGitlabUserOk',
  function (app, assert, user) {
    assert.gitlabUserOk(user);
  }
);
