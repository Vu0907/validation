function TeacherService() {
  this.getListTeacherApi = function () {
    return axios({
      url: "https://638328771ada9475c8f91916.mockapi.io/api/Product",
      method: "GET",
    });
  };

  this.deleteTeacherApi = function (id) {
    return axios({
      url: `https://638328771ada9475c8f91916.mockapi.io/api/Product/${id}`,
      method: "DELETE",
    });
  };

  this.addTeacherApi = function (teacher) {
    return axios({
      url: "https://638328771ada9475c8f91916.mockapi.io/api/Product",
      method: "POST",
      data: teacher,
    });
  };

  this.getTeacherById = function (id) {
    return axios({
      url: `https://638328771ada9475c8f91916.mockapi.io/api/Product/${id}`,
      method: "GET",
    });
  };

  this.updateTeacherApi = function (teacher) {
    return axios({
      url: `https://638328771ada9475c8f91916.mockapi.io/api/Product/${teacher.id}`,
      method: "PUT",
      data: teacher,
    });
  };
}
