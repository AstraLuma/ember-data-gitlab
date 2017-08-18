import GitlabSerializer from './gitlab';
import { decamelize } from 'ember-string';

export default GitlabSerializer.extend({
  keyForAttribute(attr) {
    return decamelize(attr);
  },

  normalize(modelClass, resourceHash, prop) {
    resourceHash.links = {
      user: resourceHash.author.url
    };
    return this._super(modelClass, resourceHash, prop);
  }
});
