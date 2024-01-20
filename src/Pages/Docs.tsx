//Docs is our only page....
import React from "react";
import ModalComponent from "../Components/Model"
import { loginWithGoogle } from "../API/Auth";
import useCheckAuth from "../Hooks/useCheckAuth";
import Document from "../Components/Document";
// import Spinner from "../Components/Spinner";

const Docs: React.FC = () => {
  const handleLogin = () => {
    loginWithGoogle();
  };
  const { isAuthenticated, userData } = useCheckAuth();


  return (
  

        <div className="docs-container">
        {!isAuthenticated ? (

          //meaning if not authenticated then show the login screen


          <ModalComponent
            title="SignIn"
            handleLogin={handleLogin}
          ></ModalComponent>



          
        
      ) : (
        <>
        {/* So else if we are authenticated then we will see our pic */}
          <Document photoURL={userData?.photoURL} />
        </>
      )}
    </div>
  );
};

export default Docs;