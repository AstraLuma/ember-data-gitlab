import QUnit from 'qunit';
import Ember from 'ember';
import assertionBuilder from '../utils/defined-attribute-assertion-builder';

QUnit.assert.gitlabBranchOk = assertionBuilder([
  'id',
  'name'
]);

export default Ember.Test.registerHelper(
  'assertGitlabBranchOk',
  function (app, assert, branch) {
    assert.gitlabBranchOk(branch);
  }
);
