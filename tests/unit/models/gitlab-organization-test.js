import { moduleForModel, test } from 'ember-qunit';

moduleForModel('gitlab-organization', 'Unit | Model | gitlab organization', {
  // Specify the other units that are required for this test.
  needs: [
    'model:gitlabRepository',
    'model:gitlabBranch',
    'model:gitlabUser'
  ]
});

test('it exists', function (assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
