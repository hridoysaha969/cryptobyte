/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect or handle user state
        setIsAuthenticated(true);
      } else {
        // User is signed out
        setIsAuthenticated(false);
      }
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);
  console.log(isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/signup" />;
};

export default PrivateRoute;
