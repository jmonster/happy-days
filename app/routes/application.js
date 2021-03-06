import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service('session'),
  authenticator: 'authenticator:torii',

  actions: {
    authenticate(provider){
      Ember.Logger.info(`authenticate:provider: ${provider}`);
      return this.get('session').authenticate('authenticator:torii', provider, {});
    },
    invalidateSession() {
      Ember.Logger.info('invalidateSession');
      return this.get('session').invalidate();
    }
  }
});
