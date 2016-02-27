import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    authenticate: function() {
      this.attrs.authenticate();
    }
  }
});
