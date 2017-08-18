import QUnit from 'qunit';
import Ember from 'ember';
import assertionBuilder from '../utils/defined-attribute-assertion-builder';

QUnit.assert.gitlabRepositoryOk = assertionBuilder([
  'id',
  'fullName',
  'name',
  'description',
  'fork',
  'private',
  'createdAt',
  'updatedAt',
  'pushedAt'
]);

export default Ember.Test.registerHelper(
  'assertGitlabRepositoryOk',
  function (app, assert, repository) {
    assert.gitlabRepositoryOk(repository);
  }
);
