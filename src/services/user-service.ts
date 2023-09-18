import apiClient from "./api-client";

export interface User {
  id: number;
  name: string;
}
class UserService {
  getAllUsers() {
    const controller = new AbortController();
    const request = apiClient.get<User[]>("/users", {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
  deleteUser(id: number) {
    const delete_request = apiClient.delete("/users/" + id);
    return { delete_request };
  }
  addUser(newUser: User) {
    const add_request = apiClient.post("/users/", newUser);
    return { add_request };
  }
  updateUser(id: number, updated_User: User) {
    const update_request = apiClient.patch("/users/" + id, updated_User);
    return { update_request };
  }
}

export default new UserService();
