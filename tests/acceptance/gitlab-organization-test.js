/* global Factory */
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import startApp from 'dummy/tests/helpers/start-app';
import Pretender from 'pretender';
import Ember from 'ember';

const { run } = Ember;

let server, app, container, store;

moduleForAcceptance('Acceptance | gitlab organization', {
  beforeEach() {
    server = new Pretender();
    server.prepareBody = function (body) {
      return JSON.stringify(body);
    };
    app = startApp();
    container = app.__container__;
    store = run(container, 'lookup', 'service:store');
  },

  afterEach() {
    server.shutdown();
    run(app, app.destroy);
    Ember.BOOTED = false;
  }
});

test('finding an organization without authorization', function (assert) {
  server.get('/orgs/Organization1', () => {
    return [200, {}, Factory.build('organization')];
  });

  return run(() => {
    return store.findRecord('gitlabOrganization', 'Organization1').then((organization) => {
      assert.gitlabOrganizationOk(organization);
      assert.equal(store.peekAll('gitlabOrganization').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, undefined);
    });
  });
});

test('finding an organization', function (assert) {
  container.lookup('service:gitlab-session').set('gitlabAccessToken', 'abc123');
  server.get('/orgs/organization1', () => {
    return [200, {}, Factory.build('organization')];
  });

  return run(() => {
    return store.findRecord('gitlabOrganization', 'organization1').then((organization) => {
      assert.gitlabOrganizationOk(organization);
      assert.equal(store.peekAll('gitlabOrganization').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123');
    });
  });
});

test(`finding an organization's repositories`, function (assert) {
  container.lookup('service:gitlab-session').set('gitlabAccessToken', 'abc123');
  server.get('/orgs/organization1', () => {
    return [200, {}, Factory.build('organization')];
  });
  server.get('/orgs/organization1/repos', () => {
    let response = [
      Factory.build('repository'),
      Factory.build('repository')
    ];
    return [200, {}, response];
  });

  return run(() => {
    return store.findRecord('gitlabOrganization', 'organization1').then((organization) => {
      return organization.get('gitlabRepositories').then(function (repositories) {
        assert.equal(repositories.get('length'), 2);
        assert.gitlabRepositoryOk(repositories.toArray()[0]);
        assert.equal(server.handledRequests.length, 2);
        assert.equal(server.handledRequests[1].requestHeaders.Authorization, 'token abc123');
      });
    });
  });
});

