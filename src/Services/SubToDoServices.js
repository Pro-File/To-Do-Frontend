import http from "./baseURL";

class SubToDoServices {
  getSubToDos() {
    return http.get("/subtodos/");
  }

  createSubToDo(data) {
    return http.post("/subtodos/", data);
  }

  updateSubToDo(data, id) {
      return http.put(`/subtodos/${id}`, data)
  }
}

export default new SubToDoServices();