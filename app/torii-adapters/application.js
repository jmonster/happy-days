import Ember from 'ember';

export default Ember.Object.extend({
  store: Ember.inject.service(),
  open: function(authentication){

  // look for record on server
    // todo

  // or

  // create record on server
    let user = this.get('store').createRecord('user', {
      access_token: authentication.access_token,
      name: authentication.userName,
      email: authentication.userEmail,
      provider: authentication.provider
    });

    return {
      currentUser: user
    }
  }
});
