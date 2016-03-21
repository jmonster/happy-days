import Ember from 'ember';

const { alias } = Ember.computed;

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  user: alias('session.data.authenticated.user')
});
