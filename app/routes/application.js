import Ember from 'ember';

export default Ember.Route.extend({
  authenticator: 'authenticator:torii',
  actions: {
    authenticate: function(provider){
      this.get('session')
        .open('google-token')
        .then(({ currentUser }) => {
          /* nada */
        }, (error) => {
          console.error(error);
        });
    }
  }
});
