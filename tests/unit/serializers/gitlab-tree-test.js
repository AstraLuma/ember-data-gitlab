import { moduleForModel, test } from 'ember-qunit';

moduleForModel('gitlab-tree', 'Unit | Serializer | gitlab tree', {
  // Specify the other units that are required for this test.
  needs: ['serializer:gitlab-tree', 'model:gitlab-blob']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
