/* jshint node: true */

const REDIRECT_URI   = process.env.REDIRECT_URI || 'http://localhost:4200';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || '638321169670-i14ntq7a8q8tc3jrsnrhmuv2vtn3ki0c.apps.googleusercontent.com';

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'happy-days',
    environment: environment,
    contentSecurityPolicy: { 'connect-src': "'self' https://auth.firebase.com wss://*.firebaseio.com" },
    'ember-cli-mirage': {
      enabled: true
    },
    'ember-simple-auth': {

    },
    'torii': {
      // 'sessionServiceName': 'session',
      'providers': {
        'google-token': {
          'redirectUri': REDIRECT_URI,
          'scope': 'https://www.googleapis.com/auth/userinfo.email',
          'apiKey': GOOGLE_API_KEY
        }
      }
    },
    baseURL: '/',
    locationType: 'auto',
    happiness: {
      'momentsPerDay': 3
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
