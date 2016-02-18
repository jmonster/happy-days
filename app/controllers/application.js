import Ember from 'ember';
const { computed } = Ember;

export default Ember.Controller.extend({
  moments: computed(function() {
    return this.store.query('moment', {
      orderBy: 'title',
      limitToLast: 10
    });
  }),
  newMoment: computed(function () {
    return this.store.createRecord('moment', {});
  }),
  actions: {
    saveMoment(moment) {
      return moment.save();
    }
  }
});
