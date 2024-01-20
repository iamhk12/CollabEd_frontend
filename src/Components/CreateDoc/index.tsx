import React, { useState } from 'react';
import "./index.scss";
import EditDoc from "../EditDoc";
import { createDoc } from "../../API/Firestore";
import { FaPlus, FaSearch } from "react-icons/fa";

type isEditType = {
  isEdit: boolean;
  handleEdit: () => void;
  id: string;
  searchQuery: any;
  setSearchQuery: any;
  setReloadCounter : any;
};

export default function CreateDoc({ isEdit, handleEdit, id, searchQuery, setSearchQuery, setReloadCounter }: isEditType) {
  const [showPopup, setShowPopup] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState("");

  const createDocument = () => {
    const payload = {
      title: newDocTitle,
      value: "",
    };
    createDoc(payload);
    setReloadCounter((val : any) => val+1)
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  if (isEdit) {
    return <EditDoc handleEdit={handleEdit} id={id} />;
  }

  return (
    <>
      <div className="new-doc-container">
        <div className="new-doc-inner" style={{ position: "relative" }}>
          <div style={{ position: "absolute", width: "350px" }}>
            <input
              type="text"
              value={searchQuery}
              placeholder='Search Documents'
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                position: "absolute",
                left: "15px",
                background: "white",
                border: "none",
                outline: "none",
                boxShadow: "#00000010 0px 10px 10px",
                fontSize: "15px",
                color: "black",
                width: "100%",
                padding: "10px",
                borderRadius: "7px",
                top: "-30px",
                marginTop : 10
              }}
            />
            <FaSearch className="search-bar-icon" />
          </div>
          <button className="start-doc" onClick={openPopup}>
            <FaPlus className="start-doc-icon" />
            <p className="new-doc-title">Create New</p>
          </button>
        </div>
      </div>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "50px",
            boxShadow: "0 4px 8px 10000000px #00000070",
            borderRadius: "8px",
            zIndex: 999,
          }}
        >
          <p style={{ marginBottom: "10px", color : "black" }}>Enter new document title:</p>
          <input
            type="text"
            value={newDocTitle}
            onChange={(e) => setNewDocTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "7px",
              marginBottom: "10px",
              background : "white",
              color : "black",
              border: "2px  solid #efefef",
              outline: "none",
            }}
          />
          <div style={{ display: "flex", justifyContent: "center", gap : "10px" }}>
            <button
              style={{
                background: "#4CAF50",
                color: "white",
                border : "none",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                createDocument();
                closePopup();
              }}
            >
              Create
            </button>
            <button
              style={{
                background: "#e74c3c",
                color: "white",
                border : "none",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={closePopup}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
