import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function RouteGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]); // The empty dependency array ensures this effect runs only once when the component mounts

  return null; // This component doesn't render anything
}

export default RouteGuard;
