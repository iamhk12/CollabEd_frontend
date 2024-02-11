// import React from 'react'

import "./index.scss";
import collabed_logo from "../../assets/collabed_logo.png";
import { logout } from "../../API/Auth";
import { IoIosLogOut } from "react-icons/io";


// type TopbarProps={
//     photoURL:string
// }
export default function Topbar({ photoURL }: TopbarProps) {
  return (
    <div className="top-bar">
      <div className="topbar-left">
        <img className="docs-icon" src={collabed_logo} />
        {/* <p className="top-title">CollabED</p> */}
      </div>
      <div className="topbar-right">
        <img className="top-image" src={photoURL} />
        <button className="Signout" onClick={logout}>
          <span><IoIosLogOut/></span>
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}
