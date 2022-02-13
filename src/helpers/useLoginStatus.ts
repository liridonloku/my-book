import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useLoginStatus = (user?: object) => {
  let navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("./login", { replace: true });
    }
  });
};

export default useLoginStatus;
