import Ember from 'ember';
const { computed } = Ember;
const { alias } = computed;

export default Ember.Component.extend({
  title: alias('moment.title'),
  reason: alias('moment.reason'),
  actions: {
    save: function() {
      this.attrs.onSave(this.get('moment'));
    }
  }
});
