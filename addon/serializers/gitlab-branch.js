import GitlabSerializer from './gitlab';

export default GitlabSerializer.extend({
  normalize(type, hash, prop) {
    hash = {
      id: hash.recordId || hash.commit.url.replace('https://api.gitlab.com/repos/', '').replace(/\/commits\/.+/, `/branches/${hash.name}`),
      name: hash.name
    };
    return this._super(type, hash, prop);
  }
});
