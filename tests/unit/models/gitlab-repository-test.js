import { moduleForModel, test } from 'ember-qunit';

moduleForModel('gitlab-repository', 'Unit | Model | gitlab repository', {
  // Specify the other units that are required for this test.
  needs: [
    'model:gitlabUser',
    'model:gitlabBranch',
    'model:gitlabPull',
    'model:gitlabRelease'
  ]
});

test('it exists', function (assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
