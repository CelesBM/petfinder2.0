import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { loggedInAtom, userDataAtom, userDataState } from "../recoil";
import { registerAPI, loginAPI } from "../lib/api";

export function useLogin() {
  const [token, setToken] = useRecoilState(loggedInAtom);
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const navigate = useNavigate();
  const isInitialMount = useRef(true);

  async function handleLogin(email: string, password: string, confirm: string) {
    if (confirm) {
      try {
        const res = await registerAPI(email, password, confirm);
        setToken(res.token);
        setUserData(res.user);
      } catch (error) {
        console.error("Error en registerAPI:", error);
      }
    } else {
      try {
        const res = await loginAPI(email, password);
        setToken(res.token);
        setUserData(res.user);
      } catch (error) {
        console.error("Error en loginAPI:", error);
      }
    }
  }
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (token) {
      navigate("/");
    }
  }, [token]);

  return { handleLogin, token };
}
