import GitlabAdapter from './gitlab';

export default GitlabAdapter.extend({
  urlForFindRecord(id, modelName, snapshot) {
    return this._super(id, modelName, snapshot)
      .replace('repositories', 'repos')
      .replace('%2F', '/');
  }
});
