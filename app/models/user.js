import DS from 'ember-data';

export default DS.Model.extend({
  access_token: DS.attr('string'),
  name: DS.attr('string'),
  email: DS.attr('string'),
  provider: DS.attr('string'),
  moments: DS.hasMany('moment')
});
