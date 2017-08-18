import GitlabSerializer from './gitlab';

export default GitlabSerializer.extend({
  normalize(modelClass, resourceHash, prop) {
    let normalizedHash = {
      id: resourceHash.sha,
      sha: resourceHash.sha,
      url: resourceHash.url,
      content: resourceHash.content,
      encoding: resourceHash.encoding,
      size: resourceHash.size
    };

    return this._super(modelClass, normalizedHash, prop);
  }
});
