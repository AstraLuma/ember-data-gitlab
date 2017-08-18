import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:gitlab-user', 'Unit | Adapter | gitlab user', {
  needs: ['service:gitlab-session']
});

test('it exists', function (assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});

test('it builds the current user URL correctly', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');

  assert.equal(adapter.buildURL('gitlab-user', '#', null, 'findRecord'), `${host}/user`);
});

test('it builds specified user URLs correctly', function(assert) {
  let adapter = this.subject();
  const host = adapter.get('host');
  const user = 'elwayman02';

  assert.equal(adapter.buildURL('gitlab-user', user, null, 'findRecord'), `${host}/users/${user}`);
});
