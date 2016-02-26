import Ember from 'ember';
const { computed } = Ember;
const { alias, not } = computed;

export default Ember.Component.extend({
  classNames: ['moment-catcher', 'callout', 'primary', 'large-4', 'columns'],
  title: alias('moment.title'),
  reason: alias('moment.reason'),
  isNotNew: not('moment.isNew'),
  actions: {
    save: function() {
      this.attrs.onSave(this.get('moment'));
    },
    cancel: function() {
      this.attrs.onCancel(this.get('moment'));
    },
    delete: function() {
      this.attrs.onDelete(this.get('moment'));
    }
  }
});
