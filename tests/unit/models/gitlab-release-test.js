import { moduleForModel, test } from 'ember-qunit';

moduleForModel('gitlab-release', 'Unit | Model | gitlab release', {
  // Specify the other units that are required for this test.
  needs: ['model:gitlab-user']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
