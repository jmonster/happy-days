import Ember from 'ember';

export default Ember.Object.extend({
  store: Ember.inject.service(),
  open: function(authentication){
    Ember.Logger.info(`authentication: ${JSON.stringify(authentication)}`);

    // look for record on server
    return this.get('store')
      .queryRecord('user', { filter: { email: authentication.userEmail } })
      .then((user) => {
        Ember.Logger.info(`open: authentication.provider: ${authentication.provider}`);

        if (Ember.isEmpty(user)) {
          user = this.get('store').createRecord('user', {
            access_token: authentication.access_token,
            name: authentication.userName,
            email: authentication.userEmail,
            provider: authentication.provider
          });
        }

        Ember.Logger.info(`open:currentUser: ${JSON.stringify(user)}`);
        return { currentUser: user };
      });
  }
});
