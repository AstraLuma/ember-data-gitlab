import QUnit from 'qunit';
import Ember from 'ember';
import assertionBuilder from '../utils/defined-attribute-assertion-builder';

QUnit.assert.gitlabTreeOk = assertionBuilder([
  'id',
  'sha',
  'url',
  'files',
  'directories',
  'blobs',
  'trees',
  'truncated'
]);

export default Ember.Test.registerHelper(
  'assertGitlabTreeOk',
  function (app, assert, tree) {
    assert.gitlabTreeOk(tree);
  }
);
