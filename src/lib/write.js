import { firebase } from '@/lib/firebase.js';

export const write = async ( user ) => {

  // get all of the users who haven't been matched yet
  const userList = await firebase.ref( 'usersAvailable' )
    .once( 'value' )
    .then( ( snapshot ) => {
      const data = snapshot.val();
      return data;
    } );

  // pick a random user
  const randomIndex = Math.floor( Math.random() * userList.length );

  const randomUser = userList[randomIndex];

  // get all of the relations we already have
  const existingRelations = await firebase.ref( 'relations' )
    .once( 'value' )
    .then( ( snapshot ) => {
      const data = snapshot.val();
      return data;
    } );

  // put our new relation that we're going to have into the
  // existing relations
  const newRelations = existingRelations.push( {
    receiving : user,
    to        : randomUser,
  } );

  // set the new relations
  firebase.ref( 'relations' )
    .set( newRelations )
    .then( () => {

      // take off the users from the list of users still available
      const newList = userList.splice( randomIndex, 1 );

      // update the list in firebase
      firebase.collection( 'usersAvailable' ).set( newList );
    } );

};
