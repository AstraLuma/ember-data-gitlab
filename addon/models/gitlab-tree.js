import DS from 'ember-data';

export default DS.Model.extend({
  sha: DS.attr('string'),
  url: DS.attr('string'),
  files: DS.attr(), // object
  directories: DS.attr(), // object
  blobs: DS.hasMany('gitlab-blob', { async: true }),
  trees: DS.hasMany('gitlab-tree', { async: true }),
  truncated: DS.attr('boolean')
});
