import Ember from 'ember';
import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';

export default ToriiAuthenticator.extend({
  torii: Ember.inject.service(),
  store: Ember.inject.service(),

  findOrCreateUserRecord(authentication) {
    return this.get('store')
      .queryRecord('user', { filter: { email: authentication.userEmail } })
      .then((user) => {
        Ember.Logger.info(`open: authentication.provider: ${authentication.provider}`);

        if (Ember.isEmpty(user)) {
          return this.get('store')
            .createRecord('user', {
              access_token: authentication.access_token,
              name: authentication.userName,
              email: authentication.userEmail,
              provider: authentication.provider
            })
            .save();
        } else {
          return user;
        }
      });
  },

  authenticate() {
    return this._super(...arguments)
      .then((authentication) => {
        return this.findOrCreateUserRecord(authentication)
          .then((user) => {
            authentication.user = user;
            return authentication;
          });
      });
  },

  restore(authentication) {
    return this._super(authentication)
      .then(() => {
        return this.findOrCreateUserRecord(authentication)
          .then((user) => {
            authentication.user = user;
            return authentication;
          });
      });
  }
});
