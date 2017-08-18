import { moduleForModel, test } from 'ember-qunit';

moduleForModel('gitlab-branch', 'Unit | Model | gitlab branch', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function (assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
