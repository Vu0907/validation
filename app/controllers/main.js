var teacherService = new TeacherService();

// validation
var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

function getListTeacher() {
  teacherService
    .getListTeacherApi()
    .then(function (result) {
      renderHTML(result.data);

      console.log(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getListTeacher();

// validation
function xet(id) {
  var TaiKhoan = getEle("TaiKhoan").value;
  var HoTen = getEle("HoTen").value;
  var MatKhau = getEle("MatKhau").value;
  var Email = getEle("Email").value;
  var HinhAnh = getEle("HinhAnh").value;
  var loaiNguoiDung = getEle("loaiNguoiDung").value;
  var loaiNgonNgu = getEle("loaiNgonNgu").value;
  var MoTa = getEle("MoTa").value;

  var valid = true;

  // taikhoan
  valid &= validation.ktRong(TaiKhoan, "tbTk", "Tài khoản");

  // hoten
  valid &=
    validation.ktRong(HoTen, "tbHoten", "Họ tên") &&
    validation.ktChuoikitu(
      HoTen,
      "tbHoten",
      "(*) Vui lòng chỉ nhập chuỗi kí tự"
    );

  // matkhau
  valid &=
    validation.ktRong(MatKhau, "tbMk", "Mật khẩu") &&
    validation.ktDodaikitu(
      6,
      8,
      MatKhau,
      "tbMk",
      "(*) Vui lòng nhập ký từ từ 6 - 8"
    ) &&
    validation.ktMatkhau(
      MatKhau,
      "tbMk",
      "Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"
    );

  // Email
  valid &=
    validation.ktRong(Email, "tbEmail", "Email") &&
    validation.ktEmail(
      Email,
      "tbEmail",
      "(*) Vui lòng nhập email đúng định dạng"
    );

  // hinh anh
  valid &= validation.ktRong(HinhAnh, "tbHinhanh", "Hình ảnh");

  // loainguoidung
  valid &= validation.ktSelect(
    "loaiNguoiDung",
    "tbLoaiNguoiDung",
    "(*) Vui lòng chọn loại người dùng"
  );

  // loai ngon ngu
  valid &= validation.ktSelect(
    "loaiNgonNgu",
    "tbloaiNgonNgu",
    "(*) Vui lòng chọn loại ngôn ngữ"
  );

  // mo ta

  valid &=
    validation.ktRong(MoTa, "tbMoTa", "Mô tả") &&
    validation.ktDodaikitu(
      1,
      60,
      MoTa,
      "tbMoTa",
      "Mô tả không vượt quá 60 kí tự"
    );

  if (!valid) return;
  var teacher = new Teacher(
    id,
    TaiKhoan,
    HoTen,
    MatKhau,
    Email,
    loaiNguoiDung,
    loaiNgonNgu,
    MoTa,
    HinhAnh
  );
  return teacher;
}

function renderHTML(data) {
  var content = "";
  data.forEach(function (teacher, index) {
    content += `
      <tr>
          <td>${index + 1}</td>
          <td>${teacher.taiKhoan}</td>
          <td>${teacher.matKhau}</td>
          <td>${teacher.hoTen}</td>
          <td>${teacher.email}</td>
          <td>${teacher.ngonNgu}</td>
          <td>${teacher.loaiND}</td>
          <td>
            <button class="btn btn-info" data-toggle="modal"
                data-target="#myModal" onclick="btnEdit('${
                  teacher.id
                }')">Edit</button>
            <button class="btn btn-danger" onclick="deleteTeacher('${
              teacher.id
            }')">Delete</button>
          </td>
      </tr>
    `;
  });

  getEle("tblDanhSachNguoiDung").innerHTML = content;
}

// capnhat
function capnhat(id) {
  var teacher = xet(true);
  if (teacher) {
    var TaiKhoan = getEle("TaiKhoan").value;
    var HoTen = getEle("HoTen").value;
    var MatKhau = getEle("MatKhau").value;
    var Email = getEle("Email").value;
    var HinhAnh = getEle("HinhAnh").value;
    var loaiNguoiDung = getEle("loaiNguoiDung").value;
    var loaiNgonNgu = getEle("loaiNgonNgu").value;
    var MoTa = getEle("MoTa").value;

    var teacher = new Teacher(
      id,
      TaiKhoan,
      HoTen,
      MatKhau,
      Email,
      loaiNguoiDung,
      loaiNgonNgu,
      MoTa,
      HinhAnh
    );

    teacherService
      .updateTeacherApi(teacher)
      .then(function () {
        getListTeacher();
        document.getElementsByClassName("close")[0].click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

// delete
function deleteTeacher(id) {
  teacherService
    .deleteTeacherApi(id)
    .then(function () {
      getListTeacher();
    })
    .catch(function (error) {
      console.log(error);
    });
}

getEle("btnThemNguoiDung").onclick = function () {
  var title = "Thêm giáo viên";
  document.getElementsByClassName("modal-title")[0].innerHTML = title;
  var button = `<button class="btn btn-success" onclick="themGV()" >Thêm</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = button;

  // clearContent();
};

// them
function themGV() {
  var teacher = xet(true);
  if (teacher) {
    var TaiKhoan = getEle("TaiKhoan").value;
    var HoTen = getEle("HoTen").value;
    var MatKhau = getEle("MatKhau").value;
    var Email = getEle("Email").value;
    var HinhAnh = getEle("HinhAnh").value;
    var loaiNguoiDung = getEle("loaiNguoiDung").value;
    var loaiNgonNgu = getEle("loaiNgonNgu").value;
    var MoTa = getEle("MoTa").value;

    var teacher = new Teacher(
      "",
      TaiKhoan,
      HoTen,
      MatKhau,
      Email,
      loaiNguoiDung,
      loaiNgonNgu,
      MoTa,
      HinhAnh
    );

    teacherService
      .addTeacherApi(teacher)
      .then(function () {
        getListTeacher();

        document.getElementsByClassName("close")[0].click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

function btnEdit(id) {
  var title = "Sửa giáo viên";
  document.getElementsByClassName("modal-title")[0].innerHTML = title;
  var button = `<button class="btn btn-warning" onclick="capnhat(${id})">Cập nhật</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = button;

  teacherService
    .getTeacherById(id)
    .then(function (result) {
      var teacher = result.data;
      getEle("TaiKhoan").value = teacher.taiKhoan;
      getEle("HoTen").value = teacher.hoTen;
      getEle("MatKhau").value = teacher.matKhau;
      getEle("Email").value = teacher.email;
      getEle("HinhAnh").value = teacher.hinhAnh;
      getEle("loaiNguoiDung").value = teacher.loaiND;
      getEle("loaiNgonNgu").value = teacher.ngonNgu;
      getEle("MoTa").value = teacher.moTa;
    })
    .catch(function (error) {
      console.log(error);
    });
}
