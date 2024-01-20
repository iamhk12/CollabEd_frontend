// import React, { useState, useEffect } from 'react';
// import moment from 'moment';

// // const LastSeen: React.FC = () => {
// //  const [lastSeen, setLastSeen] = useState('');

//  useEffect(() => {
//     const fetchLastSeen = async () => {
//       const res = await fetch('/api/lastseen');
//       const data = await res.json();
//     //   setLastSeen(moment(data.lastSeen).fromNow());
//     };

//     fetchLastSeen();
//  }, []);

//  return (
//     <div>
//       Last Modified : {lastSeen}
//     </div>
//  );
// };

// export default LastSeen;

import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import moment from 'moment';
// import {auth} from "../firebaseConfig";

const LastSeen: React.FC = () => {
 const [lastSeen, setLastSeen] = useState('');

 useEffect(() => {
    const fetchLastSeen = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        const metadata = await firebase
          .auth()
          .getUser(user.uid)
          .then((userRecord:any) => {
            return userRecord.metadata;
          });
        setLastSeen(moment(metadata.lastSignInTime).fromNow());
      }
    };

    fetchLastSeen();
 }, []);

 return (
    <div>
      Last seen: {lastSeen}
    </div>
 );
};

export default LastSeen;