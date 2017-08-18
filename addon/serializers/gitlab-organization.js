import GitlabSerializer from './gitlab';

export default GitlabSerializer.extend({
  normalize(type, hash, prop) {
    hash = {
      id: hash.recordId || hash.login,
      login: hash.login,
      name: hash.name,
      avatarUrl: hash.avatar_url,
      links: {
        gitlabUsers: hash.members_url.replace(/\{\/member\}/, ''),
        gitlabRepositories: hash.repos_url
      }
    };
    return this._super(type, hash, prop);
  }
});
