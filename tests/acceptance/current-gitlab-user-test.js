/* global Factory */
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import startApp from 'dummy/tests/helpers/start-app';
import Pretender from 'pretender';
import Ember from 'ember';

const { run } = Ember;

let server, app, container, store;

moduleForAcceptance('Acceptance | current gitlab user', {
  beforeEach() {
    server = new Pretender();
    server.prepareBody = function (body) {
      return JSON.stringify(body);
    };
    app = startApp();
    container = app.__container__;
    store = run(container, 'lookup', 'service:store');
    container.lookup('service:gitlab-session').set('gitlabAccessToken', 'abc123');
    server.get('/user', () => {
      return [200, {}, Factory.build('user')];
    });
  },

  afterEach() {
    server.shutdown();
    run(app, app.destroy);
    Ember.BOOTED = false;
  }
});

test('finding current user', function (assert) {
  return run(() => {
    return store.findRecord('gitlabUser', '#').then((user) => {
      assert.gitlabUserOk(user);
      assert.equal(store.peekAll('gitlabUser').get('length'), 1);
      assert.equal(server.handledRequests.length, 1);
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123');
    });
  });
});

test(`finding current user's repositories`, function (assert) {
  server.get('/user/repos', () => {
    let response = [
      Factory.build('repository'),
      Factory.build('repository')
    ];
    return [200, {}, response];
  });

  return run(() => {
    return store.findRecord('gitlabUser', '#').then((user) => {
      return user.get('gitlabRepositories').then((repositories) => {
        assert.equal(repositories.get('length'), 2);
        assert.gitlabRepositoryOk(repositories.toArray()[0]);
        assert.equal(server.handledRequests.length, 2);
        assert.equal(server.handledRequests[1].requestHeaders.Authorization, 'token abc123');
      });
    });
  });
});

