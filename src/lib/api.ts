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
  return res.json();
}
