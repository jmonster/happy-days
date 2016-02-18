import Ember from 'ember';
const { computed } = Ember;

export default Ember.Controller.extend({
  moments: computed.alias('model'),

  persistedMoments: computed('moments.@each.isNew', function() {
    return this.get('moments').filterBy('isNew', false);
  }),

  newMoment: computed(function () {
    return this.store.createRecord('moment', {});
  }),

  actions: {
    saveMoment(moment) {
      this.set('newMoment', this.store.createRecord('moment', {}));
      return moment.save().then(() => {
        this.toggleProperty('catchingAnotherMoment');
      });
    }
  }
});
