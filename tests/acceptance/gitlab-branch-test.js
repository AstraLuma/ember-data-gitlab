/* global Factory */
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import startApp from 'dummy/tests/helpers/start-app';
import Pretender from 'pretender';
import Ember from 'ember';

const { run } = Ember;

let server, app, container, store;

moduleForAcceptance('Acceptance | gitlab branch', {
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

test('finding a branch without authorization', function (assert) {
  server.get('/repos/User1/Repository1/branches/Branch1', () => {
    return [200, {}, Factory.build('branch')];
  });

  return run(() => {
    return store.findRecord('gitlabBranch', 'User1/Repository1/branches/Branch1').then((branch) => {
      assert.gitlabBranchOk(branch);
      assert.equal(store.peekAll('gitlabBranch').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, undefined);
    });
  });
});

test('finding a branch', function (assert) {
  container.lookup('service:gitlab-session').set('gitlabAccessToken', 'abc123');
  server.get('/repos/user1/repository1/branches/branch1', () => {
    return [200, {}, Factory.build('branch')];
  });

  return run(() => {
    return store.findRecord('gitlabBranch', 'user1/repository1/branches/branch1').then((branch) => {
      assert.gitlabBranchOk(branch);
      assert.equal(store.peekAll('gitlabBranch').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123');
    });
  });
});

