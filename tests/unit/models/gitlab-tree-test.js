import { moduleForModel, test } from 'ember-qunit';

moduleForModel('gitlab-tree', 'Unit | Model | gitlab tree', {
  // Specify the other units that are required for this test.
  needs: ['model:gitlab-blob']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
