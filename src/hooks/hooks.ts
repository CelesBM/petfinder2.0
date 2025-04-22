import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { loggedInAtom, userDataAtom, userDataState } from "../recoil";
import { registerAPI, loginAPI, updateUserDataAPI } from "../lib/api";

export function useLogin() {
  const [token, setToken] = useRecoilState(loggedInAtom);
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const navigate = useNavigate();
  const isInitialMount = useRef(true);

  async function handleLogin(
    email: string,
    password: string,
    confirm?: string
  ) {
    if (confirm) {
      try {
        const res = await registerAPI(email, password, confirm);
        setToken(res.token);
        setUserData(res.user);
      } catch (error: any) {
        console.error("Error en registerAPI:", error.message);
        return error.message;
      }
    } else {
      try {
        const res = await loginAPI(email, password);
        setToken(res.token);
        setUserData(res.user);
        console.log("Respuesta login/register:", res);
      } catch (error: any) {
        console.error("Error en loginAPI:", error.message);
        return error.message;
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

export function useUpdateUserData() {
  const navigate = useNavigate();
  const isInitialMount = useRef(true);
  const [userData, setUserData] = useRecoilState(userDataAtom);

  async function handleUpdateUserData(
    fullname: string,
    location: string,
    userLat: number,
    userLong: number,
    token: string
  ) {
    if (!userData || !userData.id) {
      console.error("No hay userData o falta el ID del usuario");
      return;
    }

    try {
      const res = await updateUserDataAPI(
        fullname,
        location,
        userLat,
        userLong,
        userData.id,
        token
      );
      setUserData(res); // Actualizamos los datos globales
    } catch (error) {
      console.error("Error en updateUserData:", error);
    }
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (userData) {
      navigate("/");
    }
  }, [userData]);

  return { handleUpdateUserData };
}
