import Ember from 'ember';

export default Ember.Route.extend({
  authenticator: 'authenticator:torii',
  actions: {
    authenticate: function(provider){
      Ember.Logger.info(`authenticate:provider: ${provider}`);

      this.get('session')
        .open('google-token')
        .then(({ currentUser }) => {
          Ember.Logger.info(`authenticate:currentUser: ${JSON.stringify(currentUser)}`);
          /* nada */
        }, (error) => {
          console.error(`authenticate:error: ${error}`);
        });
    }
  }
});
