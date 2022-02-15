import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useLoginStatus = (user?: { name: string; id: string }) => {
  let navigate = useNavigate();
  useEffect(() => {
    if (!user || user.name === "") {
      navigate("./login", { replace: true });
    }
  });
};

export default useLoginStatus;
