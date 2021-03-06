import Ember from 'ember';
import { configurable } from 'torii/configuration';
import Oauth2Bearer from 'torii/providers/oauth2-bearer';

const GoogleToken = Oauth2Bearer.extend({
  fetch(data) {
    return data;
  },

  name: 'google-token',
  baseUrl: 'https://accounts.google.com/o/oauth2/auth',

  // additional params that this provider requires
  requiredUrlParams: ['state'],
  optionalUrlParams: ['scope', 'request_visible_actions', 'access_type'],
  requestVisibleActions: configurable('requestVisibleActions', ''),
  accessType: configurable('accessType', ''),
  responseParams: ['token'],
  scope: configurable('scope', 'email'),
  state: configurable('state', 'STATE'),
  redirectUri: configurable('redirectUri',
                            'http://localhost:8000/oauth2callback'),

  open: function() {
    let name = this.get('name');
    let url = this.buildUrl();
    let redirectUri = this.get('redirectUri');
    let responseParams = this.get('responseParams');

    return this.get('popup').open(url, responseParams).then(function(authData){
      let missingResponseParams = [];

      responseParams.forEach(function(param){
        if (authData[param] === undefined) {
          missingResponseParams.push(param);
        }
      });

      if (missingResponseParams.length){
        throw 'The response from the provider is missing ' +
              'these required response params: ' + responseParams.join(', ');
      }

      return Ember.$.get('https://www.googleapis.com/plus/v1/people/me',
        {
          access_token: authData.token
        }
      ).then((user) => {
          return {
            userName: user.displayName,
            userEmail: user.emails[0].value,
            provider: name,
            redirectUri: redirectUri,
            access_token: authData.token
          };
      });
    });
  }
});

export default GoogleToken;
