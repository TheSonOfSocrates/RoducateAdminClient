import {initializeApp} from 'firebase/app';
import {getMessaging, getToken, onMessage} from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyB3YFphomDw5bNEMr1oclH4eW5Nn4mFx0k",
    authDomain: "roducatetest.firebaseapp.com",
    projectId: "roducatetest",
    storageBucket: "roducatetest.appspot.com",
    messagingSenderId: "880805687587",
    appId: "1:880805687587:web:b09f0edfef1463403e5c96",
    measurementId: "G-WSQT69VP9G"
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

const notificationKeyPair = 'BJLfGWHrDfZ055bYmhqI1ouTqCwwfgTuU7wYp0nRKsEvJUQZ9VOjkeyfg7sB1fNw0L77RGMrHrlb6bqpHJarETY'

export const Sendrequest = () => {
    console.log("Requesting User Permission......");
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("Notification User Permission Granted.");

            return getToken(messaging, {vapidKey: notificationKeyPair})
                .then((currentToken) => {
                    if (currentToken) {
                        console.log('Client Token: ', currentToken);

                    } else {

                        console.log('Failed to generate the registration token.');
                    }
                })
                .catch((err) => {
                    console.log('An error occurred when requesting to receive the token.', err);
                });
        } else {
            console.log("User Permission Denied.");
        }
    });
}

Sendrequest();

export const onMessageListener = () => new Promise((resolve) => {
    onMessage(messaging, (payload) => {
        resolve(payload);
    });
});