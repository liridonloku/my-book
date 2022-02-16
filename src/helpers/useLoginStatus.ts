import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useLoginStatus = (user: { name: string; id: string }) => {
  let location = useLocation();
  let navigate = useNavigate();
  console.log(location.pathname);
  useEffect(() => {
    if ((!user || user.name === "") && location.pathname !== "/login") {
      navigate("./login", { replace: true });
    } else if (user.name !== "" && location.pathname === "/login") {
      navigate("../", { replace: true });
    }
  });
};

export default useLoginStatus;
