import QUnit from 'qunit';
import Ember from 'ember';
import assertionBuilder from '../utils/defined-attribute-assertion-builder';

QUnit.assert.gitlabOrganizationOk = assertionBuilder([
  'id',
  'login',
  'name',
  'avatarUrl'
]);

export default Ember.Test.registerHelper(
  'assertGitlabOrganizationOk',
  function (app, assert, organization) {
    assert.gitlabOrganizationOk(organization);
  }
);
