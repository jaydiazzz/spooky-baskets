import firebase from '@/lib/conf';

const _firestore = firebase.firestore();

const db         = firebase.database().ref( '/' );
const FirebaseId = () => db.push().key;

export {
	firebase,
	_firestore,
	db,
	FirebaseId,
};
