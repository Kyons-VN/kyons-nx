// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: 'STUDENT',
  isPromotionEnable: false,
  serverApi: 'https://student-api-gcp.kyons.vn',
  origin: 'https://student.kyons.vn',
  firebase: {
    apiKey: 'AIzaSyD1kg_RXC6PACtLW0GbHnECUtsfQd2gMt0',
    authDomain: 'kyonsvn.firebaseapp.com',
    projectId: 'kyonsvn',
    storageBucket: 'kyonsvn.appspot.com',
    messagingSenderId: '830127784291',
    appId: '1:830127784291:web:0bc7e49b17cc5b981b5356',
  },
  chatApi: 'https://chatapi-ox2opk6u3q-de.a.run.app',
  fileApi: 'https://fileapi-ox2opk6u3q-de.a.run.app',
  sandboxApi: 'https://v1-ox2opk6u3q-de.a.run.app',
  vapidKey: 'BP-BjvXQUjaznK89An_nvZWRmP6PCQxIGQ9OexTGstwXGbTgdPy5jkFtr9SIBJpUXZOMzHnQ_1-PTq2_jVP4ylI',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
