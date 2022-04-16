import http from "./baseURL";

class ToDoServices {
  getToDos() {
    return http.get("/Todos/");
  }

  createToDo(data) {
    return http.post("/Todos/", data);
  }

  updateToDo(data, id) {
      return http.put(`/Todos/${id}`, data)
  }
}

export default new ToDoServices();