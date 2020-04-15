importScripts('./firebase-app.js');
importScripts('./firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '83284008014'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  let notificationTitle = 'Background Message Title';
  let notificationOptions = {
    body: 'Background Message body.',
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});