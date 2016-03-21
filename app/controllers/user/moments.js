import Ember from 'ember';
import moment from 'moment';

const { computed } = Ember;

export default Ember.Controller.extend({
  queryParams: ['day'],
  day: moment().format('YYYY-MM-DD'),
  dayAsDate: computed('day', function() {
    return moment(this.get('day'));
  }),

  user: computed.alias('model.user'),
  moments: computed.alias('model.moments'),

  persistedMoments: computed('moments.@each', function() {
    return this.get('moments').filterBy('isNew', false).sortBy('date');
  }),

  nextMoment: computed(function () {
    return this.store.createRecord('moment', { user: this.get('user') });
  }),

  actions: {
    saveMoment(moment) {
      // queue up a new moment for the next time one is created
      this.set('nextMoment', this.store.createRecord('moment', { user: user }));

      // update UI to reflect that we're saving
      moment.set('isBeingEdited', false);

      let user = this.get('user');
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
