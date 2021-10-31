import http from "./httpService";

export function registerUser(user) {
  return http.post("/users", {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
