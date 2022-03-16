import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useLoginStatus = (user: { name: string; id: string }) => {
  let location = useLocation();
  let navigate = useNavigate();
  useEffect(() => {
    if ((!user || user.id === "") && location.pathname !== "/login") {
      navigate("./login", { replace: true });
    }
    if (user.id !== "" && location.pathname === "/login") {
      navigate("../", { replace: true });
    }
  });
};

export default useLoginStatus;
