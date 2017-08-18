import { moduleForModel, test } from 'ember-qunit';

moduleForModel('gitlab-release', 'Unit | Serializer | gitlab release', {
  // Specify the other units that are required for this test.
  needs: ['serializer:gitlab-release', 'model:gitlab-user']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
