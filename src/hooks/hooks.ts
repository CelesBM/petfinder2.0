import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  loggedInAtom,
  userDataAtom,
  userLocationAtom,
  reportPet,
  userReportsAtom,
  loggedInState,
} from "../recoil";
import {
  registerAPI,
  loginAPI,
  updateUserDataAPI,
  reportPetAPI,
  getAllPetsAPI,
  deletePetAPI,
  editPetAPI,
  getNearbyPetsAPI,
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
      setUserData(res);
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
  const [userReports, setUserReports] = useRecoilState(userReportsAtom);
  const navigate = useNavigate();
  function handleLogOut() {
    navigate("/");
    setLogIn(null);
    setUserData(null);
    setUserLocation(null);
    setUserReports(null);
    //setLostPets(null);
  }
  return { handleLogOut };
}

export function useReportPet() {
  const [report, setReport] = useRecoilState(reportPet);
  async function handleReportPet(
    userId: number,
    petName: string,
    petImgURL: string,
    petState: string,
    petLat: number,
    petLong: number,
    petLocation: string
  ) {
    const res = await reportPetAPI(
      userId,
      petName,
      petImgURL,
      petState,
      petLat,
      petLong,
      petLocation
    );
    setReport(res);
  }
  return { handleReportPet };
}

export function useUserReports() {
  const setUserReports = useSetRecoilState(userReportsAtom);
  const userData = useRecoilValue(userDataAtom); //accedo al userId
  const handleUpdateUserReports = async (token: string) => {
    try {
      const data = await getAllPetsAPI(token, userData.id);
      setUserReports(data);
    } catch (error) {
      console.error("Error useUserReports:", error);
      setUserReports([]);
    }
  };
  return { handleUpdateUserReports };
}

export function useDeletePet() {
  const setUserReports = useSetRecoilState(userReportsAtom);
  const token = useRecoilValue(loggedInState);
  const userReports = useRecoilValue(userReportsAtom);
  const deletePet = async (petId: number) => {
    try {
      await deletePetAPI(token, petId);

      const updatedReports = userReports.filter((r) => r.id !== petId);
      setUserReports(updatedReports);
      console.log("Mascota eliminada correctamente");
    } catch (error) {
      console.log("error detele pet:", error);
    }
  };
  return { deletePet };
}

export function useEditPet() {
  const setUserReports = useSetRecoilState(userReportsAtom);
  const userReports = useRecoilValue(userReportsAtom);

  const editPet = async (updatedPetData: {
    id: number;
    userId: number;
    petName: string;
    petImgURL: string;
    petState: "Perdido";
    petLat: number;
    petLong: number;
    petLocation: string;
  }) => {
    try {
      const updated = await editPetAPI(
        updatedPetData.id,
        updatedPetData.userId,
        updatedPetData.petName,
        updatedPetData.petImgURL,
        updatedPetData.petState,
        updatedPetData.petLat,
        updatedPetData.petLong,
        updatedPetData.petLocation
      );
      const newReports = userReports.map((pet) =>
        pet.id === updatedPetData.id ? updated.pet : pet
      );
      setUserReports(newReports);
      return updated;
    } catch (error) {
      console.error("Error al editar mascota:", error);
      throw error;
    }
  };
  return { editPet };
}

export function useNearbyPets(lat: number, lng: number) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lat || !lng) return;
    setLoading(true);
    getNearbyPetsAPI(lat, lng)
      .then((res) => {
        setPets(res);
        setError(null);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => setLoading(false));
  }, [lat, lng]);

  return { pets, loading, error };
}
