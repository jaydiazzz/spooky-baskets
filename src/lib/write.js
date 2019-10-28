import { firebase } from '@/lib/firebase';

export const write = async ( user, cb, errCb ) => {

	// get all of the users who haven't been matched yet
	const userList = await firebase.database().ref( 'usersAvailable' )
		.once( 'value' )
		.then( ( snapshot ) => {
			const data = snapshot.val();
			return data;
		} );

	console.log( userList );

	// pick a random user
	const randomIndex = Math.floor( Math.random() * userList.length );

	const randomUser = userList[randomIndex];

	// get all of the relations we already have
	const existingRelations = await firebase.database().ref( 'relations' )
		.once( 'value' )
		.then( ( snapshot ) => {
			const data = snapshot.val();

			if ( !data ) {
				return [];
			}

			return data;
		} );

	const keys = Object.keys( existingRelations );

	const alreadyHaveRelation = keys.reduce( ( result, key ) => {

		console.log( existingRelations, key );

		if ( existingRelations[key].receiving.toLowerCase() === user.toLowerCase() ) {
			console.log( existingRelations[key] );
			return existingRelations[key];
		}

		return false;
	}, false );

	if ( alreadyHaveRelation ) {
		errCb( `Already have a person to gift, your designated person is: ${alreadyHaveRelation.to}` );
		return;
	}

	console.log( existingRelations );

	// set the new relations
	await firebase.database().ref( 'relations' )
		.push( {
			receiving : user,
			to        : randomUser,
		} )
		.then( () => {

			console.log( userList );

			// take off the users from the list of users still available
			userList.splice( randomIndex, 1 );

			console.log( userList );

			// update the list in firebase.database()
			firebase.database().ref( 'usersAvailable' ).set( userList );
		} );

	cb( randomUser );

};

export default {
	write,
};
