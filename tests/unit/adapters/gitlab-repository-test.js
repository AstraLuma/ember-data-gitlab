import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:gitlab-repository', 'Unit | Adapter | gitlab repository', {
  needs: ['service:gitlab-session']
});

test('it exists', function (assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});

test('it builds the index URL correctly', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');

  assert.equal(adapter.buildURL('gitlab-repository', null, null), `${host}/repositories`);
});

test('it builds the specified repo URL correctly', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');

  const repo = 'astronouth7303/ember-data-gitlab';
  assert.equal(adapter.buildURL('gitlab-repository', repo, null, 'findRecord'), `${host}/repos/${repo}`);
});
