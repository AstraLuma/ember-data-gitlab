import { moduleForModel, test } from 'ember-qunit';

moduleForModel('gitlab-pull', 'Unit | Model | gitlab pull', {
  // Specify the other units that are required for this test.
  needs: [
    'model:gitlabUser',
    'model:gitlabBranch'
  ]
});

test('it exists', function (assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
