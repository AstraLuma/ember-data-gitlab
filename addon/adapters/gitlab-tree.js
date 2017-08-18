import GitlabAdapter from './gitlab';

export default GitlabAdapter.extend({
  urlForQueryRecord(query) {
    const repo = query.repo;
    const sha = query.sha;
    delete query.repo;
    delete query.sha;

    if (query.recursive) {
      query.recursive = 1;
    }

    return `${this.get('host')}/repos/${repo}/git/trees/${sha}`;
  }
});
