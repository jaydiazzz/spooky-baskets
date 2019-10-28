import firebase from '@/lib/db/conf';

const _firestore = firebase.firestore();

const db         = firebase.database().ref( '/' );
const FirebaseId = () => db.push().key;

export {
	firebase,
	_firestore,
	db,
	FirebaseId,
};
