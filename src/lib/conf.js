import firebase from 'firebase';

const firebaseConfig = {
  apiKey            : 'AIzaSyDzb0UgoQvQy_tH-L11DLPq13i5zrrk4IA',
  authDomain        : 'spooky-baskets.firebaseapp.com',
  databaseURL       : 'https://spooky-baskets.firebaseio.com',
  projectId         : 'spooky-baskets',
  storageBucket     : 'spooky-baskets.appspot.com',
  messagingSenderId : '1003388057214',
  appId             : '1:1003388057214:web:68da02fbccfddbb35cca2f',
  measurementId     : 'G-JXBN8F0J27'
};

if ( !firebase.apps.length ) {
	console.log( 'tried to connect' );
	firebase.initializeApp( firebaseConfig );
}

export default firebase;
