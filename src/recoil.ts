import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist"; //guarda el estado en el localstorage

const { persistAtom } = recoilPersist();

export const loggedInAtom = atom({
  key: "loggedInAtom",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const loggedInState = selector({
  key: "tokenState",
  get: ({ get }) => {
    const token = get(loggedInAtom);
    return token;
  },
});
export const userDataAtom = atom({
  key: "userDataAtom",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const userDataState = selector({
  key: "userDataState",
  get: ({ get }) => {
    const userData = get(userDataAtom);
    if (userData) {
      return {
        name: userData.name,
        email: userData.email,
      };
    }
  },
});

export const userLocationAtom = atom({
  key: "userLocationAtom",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const userLocationState = selector({
  key: "userLocationState",
  get: ({ get }) => {
    const userLocation = get(userLocationAtom);
    if (userLocation) {
      return {
        lat: userLocation.lat,
        lng: userLocation.lng,
        location: userLocation.location,
      };
    }
  },
});
