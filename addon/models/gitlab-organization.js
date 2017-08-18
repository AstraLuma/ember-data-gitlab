import DS from 'ember-data';

export default DS.Model.extend({
  login: DS.attr('string'),
  name: DS.attr('string'),
  avatarUrl: DS.attr('string'),
  gitlabUsers: DS.hasMany('gitlabUsers', { async: true }),
  gitlabRepositories: DS.hasMany('gitlabRepository', { async: true })
});
