import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useLoginStatus = (user: { name: string; id: string }) => {
  let location = useLocation();
  let navigate = useNavigate();
  useEffect(() => {
    if ((!user || user.id === "") && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    } else if (
      user.id !== "" &&
      user.id !== "preloadUserID4567894564321" &&
      (location.pathname === "/login" || location.pathname === "/")
    ) {
      navigate("/home", { replace: true });
    }
  });
};

export default useLoginStatus;
