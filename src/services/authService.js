import http from "./httpService";
import jwtdecode from "jwt-decode";

http.setJwt(getJwtToken());

export async function loginUser(email, password) {
  const { data: jwt } = await http.post("/auth", { email, password });
  localStorage.setItem("token", jwt);
}

export function saveJwtToken(jwt) {
  localStorage.setItem("token", jwt);
}

export function getJwtToken() {
  localStorage.getItem("token");
}

export function logoutUser() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtdecode(jwt);
  } catch (ex) {}
}
