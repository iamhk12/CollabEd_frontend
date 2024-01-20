// import { useState } from 'react'

import "./App.scss";
import Docs from "./Pages/Docs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer pauseOnHover={false} limit={1} autoClose={2000}/>
      <Docs />
    </>
  );
}

export default App;

//   return (
//           <Docs/>
//     //  <div>
//     //    <h1>Recent and Last Seen Feature</h1>
//     //    <h2>Recent Items:</h2>
//     //    <ul>
//     //      {recentLastSeen.recent.map(item => (
//     //        <li key={item}>{item}</li>
//     //      ))}
//     //    </ul>
//     //    <h2>Last Seen Item:</h2>
//     //    <p>{recentLastSeen.lastSeen}</p>
//     //  </div>
//   );
//  };
