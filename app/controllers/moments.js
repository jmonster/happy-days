import Ember from 'ember';
import moment from 'moment';

const { computed } = Ember;

export default Ember.Controller.extend({
  queryParams: ['day'],
  day: moment().format('YYYY-MM-DD'),
  dayAsDate: computed('day', function() {
    return moment(this.get('day'));
  }),

  moments: computed.alias('model'),

  persistedMoments: computed('moments.@each.isNew', function() {
    return this.get('moments').filterBy('isNew', false).sortBy('date');
  }),

  newMoment: computed(function () {
    return this.store.createRecord('moment', {});
  }),

  actions: {
    saveMoment(moment) {
      moment.set('isBeingEdited', false);
      this.set('newMoment', this.store.createRecord('moment', {}));
      return moment.save().then(() => {
        this.toggleProperty('catchingAnotherMoment');
      });
    },
    editMoment(moment) {
      moment.set('isBeingEdited', true);
    },
    cancelEditingMoment(moment) {
      moment.set('isBeingEdited', false);
    },
    destroyMoment(moment) {
      moment.destroyRecord();
    }
  }
});
