import React, { useEffect, useState } from "react";
import { getUser } from "../Custom Hooks/getUser";
import { useNavigate } from "react-router-dom";
import FullPageLoader from "./FullPageLoader";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { isAuthenticated } = await getUser();
        setIsAuthenticated(isAuthenticated);
      } catch (error) {
        console.error("Error in ProtectedRoute:", error);
        setIsAuthenticated(false);
      }
    };
    fetchUser();
  }, []);

  // Redirect if unauthenticated
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Show a loading state while determining authentication
  if (isAuthenticated === null) {
    return <FullPageLoader />;
  }

  // Render children if authenticated
  if (isAuthenticated) {
    return <>{children}</>;
  }

  return null;
}

export default ProtectedRoute;
