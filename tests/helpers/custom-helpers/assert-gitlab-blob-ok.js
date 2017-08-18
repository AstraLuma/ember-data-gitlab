import QUnit from 'qunit';
import Ember from 'ember';
import assertionBuilder from '../utils/defined-attribute-assertion-builder';

QUnit.assert.gitlabBlobOk = assertionBuilder([
  'id',
  'sha',
  'url',
  'content',
  'size',
  'encoding'
]);

export default Ember.Test.registerHelper(
  'assertGitlabBlobOk',
  function (app, assert, blob) {
    assert.gitlabBlobOk(blob);
  }
);
