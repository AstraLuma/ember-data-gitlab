import { moduleForModel, test } from 'ember-qunit';

moduleForModel('gitlab-organization', 'Unit | Serializer | gitlab organization', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:gitlab-organization',
    'model:gitlabRepository',
    'model:gitlabBranch',
    'model:gitlabUser'
  ]
});

// Replace this with your real tests.
test('it serializes records', function (assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
