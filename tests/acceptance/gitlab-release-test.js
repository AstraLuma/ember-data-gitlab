/* global Factory */
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import startApp from 'dummy/tests/helpers/start-app';
import Pretender from 'pretender';
import Ember from 'ember';

const { run } = Ember;

let server, app, container, store;

moduleForAcceptance('Acceptance | gitlab release', {
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

test('finding a release without authorization', function (assert) {
  assert.expect(4);

  server.get('/repos/user1/repository1/releases/1', () => {
    return [200, {}, Factory.build('release')];
  });

  return run(() => {
    return store.queryRecord('gitlabRelease', { repo: 'user1/repository1', releaseId: '1' }).then((release) => {
      assert.gitlabReleaseOk(release);
      assert.equal(store.peekAll('gitlabRelease').get('length'), 1, 'loads 1 release');
      assert.equal(server.handledRequests.length, 1, 'handles 1 request');
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, undefined, 'has no authorization token');
    });
  });
});

test('finding a release', function (assert) {
  assert.expect(4);

  container.lookup('service:gitlab-session').set('gitlabAccessToken', 'abc123');
  server.get('/repos/user1/repository1/releases/1', () => {
    return [200, {}, Factory.build('release')];
  });

  return run(() => {
    return store.queryRecord('gitlabRelease', { repo: 'user1/repository1', releaseId: '1' }).then((release) => {
      assert.gitlabReleaseOk(release);
      assert.equal(store.peekAll('gitlabRelease').get('length'), 1, 'loads 1 release');
      assert.equal(server.handledRequests.length, 1, 'handles 1 request');
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
    });
  });
});

test('finding all releases', function (assert) {
  assert.expect(4);

  container.lookup('service:gitlab-session').set('gitlabAccessToken', 'abc123');
  server.get('/repos/user1/repository1/releases', () => {
    return [200, {},
      [
        Factory.build('release'),
        Factory.build('release')
      ]
    ];
  });

  return run(() => {
    return store.query('gitlabRelease', { repo: 'user1/repository1' }).then((releases) => {
      assert.gitlabReleaseOk(releases.toArray()[0]);
      assert.equal(store.peekAll('gitlabRelease').get('length'), 2, 'loads 2 releases');
      assert.equal(server.handledRequests.length, 1, 'handles 1 request');
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
    });
  });
});

test('getting a releases\' author', function (assert) {
  assert.expect(4);

  container.lookup('service:gitlab-session').set('gitlabAccessToken', 'abc123');
  server.get('/repos/user1/repository1/releases/1', () => {
    return [200, {}, Factory.build('release')];
  });
  server.get('/users/user1', () => {
    return [200, {}, Factory.build('user')];
  });

  return run(() => {
    return store.queryRecord('gitlabRelease', { repo: 'user1/repository1', releaseId: '1' }).then((release) => {
      return release.get('user').then(function (user) {
        assert.gitlabUserOk(user);
        assert.equal(store.peekAll('gitlabUser').get('length'), 1, 'loads 1 user');
        assert.equal(server.handledRequests.length, 2, 'handles 2 requests');
        assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
      });
    });
  });
});
