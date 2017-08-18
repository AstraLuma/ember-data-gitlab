import GitlabAdapter from './gitlab';

export default GitlabAdapter.extend({
  buildURL(type, id, snapshot) {
    let builtURL = this._super(type, id, snapshot);
    builtURL = builtURL.replace('organizations', 'orgs');
    return builtURL;
  }
});
