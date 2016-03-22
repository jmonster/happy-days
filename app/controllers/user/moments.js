import Ember from 'ember';
import moment from 'moment';

const { computed } = Ember;

export default Ember.Controller.extend({
  queryParams: ['day'],
  day: moment().format('YYYY-MM-DD'),
  dayAsDate: computed('day', function() {
    return moment(this.get('day'));
  }),
  dayIsToday: computed.equal('day', moment().format('YYYY-MM-DD')),
  momentsAreEditable: computed.alias('dayIsToday'),

  user: computed.alias('model.user'),
  moments: computed.alias('model.moments'),
  canCreateMoreMoments: computed.lt('persistedMoments.length',3),

  persistedMoments: computed('moments.@each', function() {
    return this.get('moments').filterBy('isNew', false).sortBy('date');
  }),

  nextMoment: computed(function () {
    return this.store.createRecord('moment', { user: this.get('user') });
  }).volatile(),

  actions: {
    saveMoment(moment) {
      // update UI to reflect that we're saving
      moment.set('isBeingEdited', false);

      return moment.save().then(() => {
        this.set('catchingAnotherMoment', false);
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
    },
    abortNewMoment(moment) {
      this.set('catchingAnotherMoment', false);
      moment.destroyRecord();
    }
  }
});
