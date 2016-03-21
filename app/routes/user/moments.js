import Ember from 'ember';
const { computed } = Ember;

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      moments: this.get('user.moments'),
      user: this.modelFor('user')
    });
  },

  user: computed(function() {
    return this.modelFor('user');
  })
});
