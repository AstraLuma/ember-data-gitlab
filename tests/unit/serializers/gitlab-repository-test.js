import { moduleForModel, test } from 'ember-qunit';

moduleForModel('gitlab-repository', 'Unit | Serializer | gitlab repository', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:gitlab-repository',
    'model:gitlabBranch',
    'model:gitlabUser',
    'model:gitlabPull',
    'model:gitlabRelease'
  ]
});

// Replace this with your real tests.
test('it serializes records', function (assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
