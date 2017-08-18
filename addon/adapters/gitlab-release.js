import GitlabAdapter from './gitlab';

export default GitlabAdapter.extend({
  urlForQuery(query) {
    const repo = query.repo;
    delete query.repo;
    return `${this.get('host')}/repos/${repo}/releases`;
  },

  urlForQueryRecord(query) {
    const repo = query.repo;
    const releaseId = query.releaseId;
    delete query.repo;
    delete query.releaseId;

    return `${this.get('host')}/repos/${repo}/releases/${releaseId}`;
  }
});
