import GitlabAdapter from './gitlab';

export default GitlabAdapter.extend({
  urlForFindRecord(id, modelName, snapshot) {
    let builtURL = this._super(id, modelName, snapshot);
    if (id === '#') {
      builtURL = builtURL.replace('users/%23', 'user');
    }
    return builtURL;
  }
});
