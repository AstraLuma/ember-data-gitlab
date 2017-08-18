import GitlabAdapter from './gitlab';

export default GitlabAdapter.extend({
  urlForQueryRecord(query) {
    const repo = query.repo;
    const sha = query.sha;
    delete query.repo;
    delete query.sha;

    return `${this.get('host')}/repos/${repo}/git/blobs/${sha}`;
  }
});
