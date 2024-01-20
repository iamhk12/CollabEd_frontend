// // import React, { useState, useEffect } from 'react';
// // import firebase from 'firebase/app';
// // import 'firebase/database';

// // const CursorTracker: React.FC = () => {
// //  const [cursors, setCursors] = useState([]);

// // const updateCursorPosition = async (position: { x: number; y: number }) => {
// //  const user = firebase.auth().currentUser;
// //  if (user) {
// //     const cursorRef = firebase.database().ref(`cursors/${user.uid}`);
// //     await cursorRef.update({ position });
// //  }
// // };

// //  useEffect(() => {
// //     const fetchCursors = async () => {
// //       const cursorRef = firebase.database().ref('cursors');
// //       cursorRef.on('value', (snapshot) => {
// //         const cursorsData = snapshot.val();
// //         const cursorsArray = Object.keys(cursorsData).map((key) => ({
// //           id: key,
// //           position: cursorsData[key].position,
// //         }));
// //         setCursors(cursorsArray);
// //       });
// //     };

// //     fetchCursors();
// //  }, []);

// //  return (
// //     <div>
// //       {cursors.map((cursor) => (
// //         <div key={cursor.id} style={{ left: cursor.position.x, top: cursor.position.y }}>
// //           User {cursor.id}
// //         </div>
// //       ))}
// //     </div>
// //  );
// // };

// // export default CursorTracker;








// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface CursorPosition {
//  x: number;
//  y: number;
// }

// interface CursorState {
//  id: string;
//  position: CursorPosition;
// }

// const initialState: CursorState[] = [];

// const cursorsSlice = createSlice({
//  name: 'cursors',
//  initialState,
//  reducers: {
//     setCursorPosition: (state, action: PayloadAction<CursorState>) => {
//       const existingCursor = state.find(cursor => cursor.id === action.payload.id);
//       if (existingCursor) {
//         existingCursor.position = action.payload.position;
//       } else {
//         state.push(action.payload);
//       }
//     },
//     removeCursor: (state, action: PayloadAction<string>) => {
//       return state.filter(cursor => cursor.id !== action.payload);
//     },
//  },
// });

// export const { setCursorPosition, removeCursor } = cursorsSlice.actions;

// export default cursorsSlice.reducer;




// //app...
// // in app.tsx:-
// // import React, { useEffect } from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { setCursorPosition, removeCursor } from './store/cursorsSlice';

// // const App: React.FC = () => {
// //  const cursors = useSelector((state: any) => state.cursors);
// //  const dispatch = useDispatch();

// //  useEffect(() => {
// //     const handleCursorUpdate = (cursorId: string, x: number, y: number) => {
// //       dispatch(setCursorPosition({ id: cursorId, position: { x, y } }));
// //     };

// //     // Call this function whenever a new cursor position is received
// //     // e.g., from a WebSocket or another user in a collaborative environment
// //     // handleCursorUpdate('someUserId', 100, 200);

// //     return () => {
// //       // Remove the cursor when the component is unmounted
// //       dispatch(removeCursor('someUserId'));
// //     };
// //  }, [dispatch]);

// //  return (
// //     <div>
// //       {/* Render the document with the cursors */}
// //       {cursors.map(cursor => (
// //         <div key={cursor.id} style={{ left: cursor.position.x, top: cursor.position.y }}>
// //           {cursor.id}
// //         </div>
// //       ))}
// //     </div>
// //  );
// // };

// // export default App;