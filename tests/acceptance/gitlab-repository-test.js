/* global Factory */
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import startApp from 'dummy/tests/helpers/start-app';
import Pretender from 'pretender';
import Ember from 'ember';

const { run } = Ember;

let server, app, container, store;

moduleForAcceptance('Acceptance | gitlab repository', {
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

test('finding a repository without authorization', function (assert) {
  assert.expect(4);

  server.get('/repos/User1/Repository1', () => {
    return [200, {}, Factory.build('repository')];
  });

  return run(() => {
    return store.findRecord('gitlabRepository', 'User1/Repository1').then((repository) => {
      assert.gitlabRepositoryOk(repository);
      assert.equal(store.peekAll('gitlabRepository').get('length'), 1, 'loads 1 repository');
      assert.equal(server.handledRequests.length, 1, 'handles 1 request');
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, undefined, 'has no authorization token');
    });
  });
});

test('finding a repository', function (assert) {
  assert.expect(4);

  container.lookup('service:gitlab-session').set('gitlabAccessToken', 'abc123');
  server.get('/repos/user1/repository1', () => {
    return [200, {}, Factory.build('repository')];
  });

  return run(() => {
    return store.findRecord('gitlabRepository', 'user1/repository1').then((repository) => {
      assert.gitlabRepositoryOk(repository);
      assert.equal(store.peekAll('gitlabRepository').get('length'), 1, 'loads 1 repository');
      assert.equal(server.handledRequests.length, 1, 'handles 1 request');
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
    });
  });
});

test('finding all repositories', function (assert) {
  assert.expect(4);

  container.lookup('service:gitlab-session').set('gitlabAccessToken', 'abc123');
  server.get('/repositories', () => {
    let response = [
      Factory.build('repository'),
      Factory.build('repository')
    ];
    return [200, {}, response];
  });

  return run(() => {
    return store.findAll('gitlabRepository').then(function (repositories) {
      assert.equal(repositories.get('length'), 2, 'loads 2 repositories');
      assert.gitlabRepositoryOk(repositories.toArray()[0]);
      assert.equal(server.handledRequests.length, 1, 'handles 1 request');
      assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
    });
  });
});

test('getting a repository\'s owner', function (assert) {
  assert.expect(3);

  container.lookup('service:gitlab-session').set('gitlabAccessToken', 'abc123');
  server.get('/repos/user1/repository1', () => {
    return [200, {}, Factory.build('repository')];
  });
  server.get('/users/user1', () => {
    return [200, {}, Factory.build('user')];
  });

  return run(() => {
    return store.findRecord('gitlabRepository', 'user1/repository1').then((repository) => {
      return repository.get('owner').then(function (owner) {
        assert.gitlabUserOk(owner);
        assert.equal(server.handledRequests.length, 2, 'handles 2 requests');
        assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
      });
    });
  });
});

test('getting a repository\'s default branch', function (assert) {
  assert.expect(3);

  container.lookup('service:gitlab-session').set('gitlabAccessToken', 'abc123');
  server.get('/repos/user1/repository1', () => {
    return [200, {}, Factory.build('repository')];
  });
  server.get('/repos/user1/repository1/branches/branch1', () => {
    return [200, {}, Factory.build('branch')];
  });

  return run(() => {
    return store.findRecord('gitlabRepository', 'user1/repository1').then((repository) => {
      return repository.get('defaultBranch').then(function (branch) {
        assert.gitlabBranchOk(branch);
        assert.equal(server.handledRequests.length, 2, 'handles 2 requests');
        assert.equal(server.handledRequests[0].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
      });
    });
  });
});

test('finding a repository\'s branches', function (assert) {
  assert.expect(4);

  container.lookup('service:gitlab-session').set('gitlabAccessToken', 'abc123');
  server.get('/repos/user1/repository1', () => {
    return [200, {}, Factory.build('repository')];
  });
  server.get('/repos/user1/repository1/branches', () => {
    let response = [
      Factory.build('branch'),
      Factory.build('branch')
    ];
    return [200, {}, response];
  });

  return run(() => {
    return store.findRecord('gitlabRepository', 'user1/repository1').then((repository) => {
      return repository.get('branches').then(function (branches) {
        assert.equal(branches.get('length'), 2, 'loads 2 branches');
        assert.gitlabBranchOk(branches.toArray()[0]);
        assert.equal(server.handledRequests.length, 2, 'handles 2 requests');
        assert.equal(server.handledRequests[1].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
      });
    });
  });
});


test('finding a repository\'s releases', function (assert) {
  assert.expect(4);

  container.lookup('service:gitlab-session').set('gitlabAccessToken', 'abc123');
  server.get('/repos/user1/repository1', () => {
    return [200, {}, Factory.build('repository')];
  });
  server.get('/repos/user1/repository1/releases', () => {
    let response = [
      Factory.build('release'),
      Factory.build('release')
    ];
    return [200, {}, response];
  });

  return run(() => {
    return store.findRecord('gitlabRepository', 'user1/repository1').then((repository) => {
      return repository.get('releases').then(function (releases) {
        assert.equal(releases.get('length'), 2, 'loads 2 releases');
        assert.gitlabReleaseOk(releases.toArray()[0]);
        assert.equal(server.handledRequests.length, 2, 'handles 2 requests');
        assert.equal(server.handledRequests[1].requestHeaders.Authorization, 'token abc123', 'has the authorization token');
      });
    });
  });
});
