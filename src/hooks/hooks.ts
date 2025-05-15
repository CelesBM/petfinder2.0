import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  loggedInAtom,
  userDataAtom,
  userDataState,
  userLocationAtom,
  reportPet,
  userReportsAtom,
} from "../recoil";
import {
  registerAPI,
  loginAPI,
  updateUserDataAPI,
  reportPetAPI,
  getAllPetsAPI,
} from "../lib/api";

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
        //console.log("Respuesta login/register:", res); obtengo user y token
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

export function useLogOut() {
  const [loggedIn, setLogIn] = useRecoilState(loggedInAtom);
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [location, setUserLocation] = useRecoilState(userLocationAtom);
  //const [userReports, setUserReports] = useRecoilState(userReportsAtom);
  //const [lostPets, setLostPets] = useRecoilState(lostPetsAtom);
  const navigate = useNavigate();
  function handleLogOut() {
    navigate("/");
    setLogIn(null);
    setUserData(null);
    setUserLocation(null);
    //setUserReports(null);
    //setLostPets(null);
  }
  return { handleLogOut };
}

export function useReportPet() {
  const [report, setReport] = useRecoilState(reportPet);
  async function handleReportPet(
    name: string,
    dataURL: string,
    lat: number,
    lng: number,
    token: string
  ) {
    const res = await reportPetAPI(name, dataURL, lat, lng, token);
    setReport(res);
  }
  return { handleReportPet };
}

export function useUserReports() {
  const [userReports, setUserReports] = useRecoilState(userReportsAtom);
  async function handleUpdateUserReports(token: string) {
    const res = await getAllPetsAPI(token);
    setUserReports(res);
  }

  return { handleUpdateUserReports };
}
