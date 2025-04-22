const API_BASE_URL = "http://localhost:3000";

export async function registerAPI(
  email: string,
  password: string,
  confirm: string
): Promise<any> {
  const res = await fetch(API_BASE_URL + "/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      confirm,
    }),
  });
  const loginRes = await loginAPI(email, password);
  return loginRes;
}

export async function loginAPI(email: string, password: string): Promise<any> {
  const res = await fetch(API_BASE_URL + "/auth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Error inesperado");
  }

  const data = await res.json();
  return data;
}

export async function updateUserDataAPI(
  fullname: string,
  localidad: string,
  userLat: number,
  userLong: number,
  userId: number,
  token: string
): Promise<any> {
  const response = await fetch(API_BASE_URL + "/update-personal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "bearer " + token,
    },
    body: JSON.stringify({
      fullname,
      localidad,
      userLat,
      userLong,
      userId,
    }),
  });
  return response.json();
}

export async function getCoords(
  query: string
): Promise<{ lat: number; lng: number } | null> {
  if (query.trim() === "") return null;

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}&limit=1`
    );
    const data = await response.json();

    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      return {
        lat: parseFloat(lat),
        lng: parseFloat(lon),
      };
    } else {
      console.error("No se encontraron resultados para la búsqueda.");
      return null;
    }
  } catch (error) {
    console.error("Error en getCoords:", error);
    return null;
  }
}
