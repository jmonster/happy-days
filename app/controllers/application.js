import Ember from 'ember';
import moment from 'moment';
import config from '../config/environment';

const { computed, observer } = Ember;
const { alias } = computed;

export default Ember.Controller.extend({
  today: moment().format('YYYY-MM-DD'),
  currentUser: alias('session.currentUser'),
  isAuthenticated: alias('session.isAuthenticated'),

  updateTodaysMoments: function() {
    this.store.query('moment', {
      filter: { date: this.get('today') }
    }).then((todaysMoments) => {
      this.set('todaysMoments', todaysMoments);
    });
  },

  init: observer('today', function() {
    this._super();
    this.updateTodaysMoments();
  })
});
