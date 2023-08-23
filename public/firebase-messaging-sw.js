importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyB3YFphomDw5bNEMr1oclH4eW5Nn4mFx0k",
    authDomain: "roducatetest.firebaseapp.com",
    projectId: "roducatetest",
    storageBucket: "roducatetest.appspot.com",
    messagingSenderId: "880805687587",
    appId: "1:880805687587:web:b09f0edfef1463403e5c96",
    measurementId: "G-WSQT69VP9G"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});