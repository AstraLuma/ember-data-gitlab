import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  path: DS.attr('string'),
  description: DS.attr('string'),
  visibility: DS.attr('string'),  // TODO: Enum
  avatarUrl: DS.attr('string'),
  webUrl: DS.attr('string'),
  requestAccessEnabled: DS.attr('bool'),
  full_name: DS.attr('string'),
  full_path: DS.attr('string'),
  parent_id: DS.belongsTo('gitlabGroup'),
  projects: DS.hasMany('gitlabRepository', { async: true }),
  sharedProjects: DS.hasMany('gitlabRepository', { async: true })
});
