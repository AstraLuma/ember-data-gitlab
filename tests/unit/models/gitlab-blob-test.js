import { moduleForModel, test } from 'ember-qunit';

moduleForModel('gitlab-blob', 'Unit | Model | gitlab blob', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
