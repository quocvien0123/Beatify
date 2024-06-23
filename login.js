$(document).ready(function () {
  // Đăng ký sự kiện click cho nút đăng ký
  $("#registerBtn").on("click", function (e) {
    e.preventDefault();
    validateRegisterForm();
  });

  // Đăng ký sự kiện click cho nút đăng nhập
  $("#loginBtn").on("click", function (e) {
    e.preventDefault();
    validateLoginForm();
  });

  // Sự kiện khi ấn nút đăng xuất bên trang Home.html
  $("#dangxuat").on("click", function () {
    window.location.href = "index.html";
  });

  // Sự kiện click cho các liên kết chuyển đổi giữa các form
  $(".message a").click(function () {
    $("form").animate({ height: "toggle", opacity: "toggle" }, "slow");
  });
});

function validateRegisterForm() {
  var fullName = $("#fullName").val().trim();
  var username = $("#username").val().trim();
  var email = $("#email").val().trim();
  var password = $("#password").val().trim();
  var hasError = false;
  var confirmPassword = $("#ConfirmPassword").val();

  if (fullName === "") {
    alert("Tên của người dùng không được để trống!");
    $("#fullName").focus().addClass("error");
    hasError = true;
    return;
  }

  if (username === "") {
    alert("Tên tài khoản không được bỏ trống!");
    $("#username").focus().addClass("error");
    hasError = true;
    return;
  }

  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email) || email === "") {
    alert("Email phải có định dạng :(abc123@gmail.com)");
    $("#email").focus().addClass("error");
    hasError = true;
    return;
  }

  if (password === "") {
    alert("Mật khẩu không được bỏ trống!");
    $("#password").focus().addClass("error");
    hasError = true;
    return;
  }

  console.log("No errors, submitting form.");

  var userData = JSON.parse(localStorage.getItem("userData"));

  if (!Array.isArray(userData)) {
    userData = [];
  }

  var emailExists = userData.some(function (user) {
    return user.email === email;
  });

  var usernameExists = userData.some(function (user) {
    return user.username === username;
  });

  if (emailExists) {
    alert("Email đã tồn tại. Vui lòng nhập email khác.");
    $("#email").focus().addClass("error");
    return;
  }

  if (usernameExists) {
    alert("Username đã tồn tại. Vui lòng chọn username khác.");
    $("#username").focus().addClass("error");
    return;
  }

  if (password != confirmPassword) {
    alert("Confirm password không chính xác!");
    $("#ConfirmPassword").focus().addClass("error");
    return;
  }

  var newUserData = {
    fullName: fullName,
    username: username,
    email: email,
    password: password,
  };

  userData.push(newUserData);
  localStorage.setItem("userData", JSON.stringify(userData));

  alert("Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.");

  $("#fullName").val("");
  $("#username").val("");
  $("#email").val("");
  $("#password").val("");

  $(".register-form").hide();
  $(".login-form").show();
}

function validateLoginForm() {
  var username = $("#loginUsername").val().trim();
  var password = $("#loginPassword").val().trim();
  var userData = JSON.parse(localStorage.getItem("userData"));
  var hasError = false;

  if (username === "") {
    alert("Tên tài khoản không được bỏ trống!");
    $("#loginUsername").focus().addClass("error");
    hasError = true;
  } else {
    $("#loginUsername").removeClass("error");
  }

  if (password === "") {
    alert("Mật khẩu không được bỏ trống!");
    $("#loginPassword").focus().addClass("error");
    hasError = true;
  } else {
    $("#loginPassword").removeClass("error");
  }

  if (hasError) {
    return;
  }

  var user = userData.find(function (user) {
    return user.username === username && user.password === password;
  });

  if (user) {
    alert("Đăng nhập thành công!");
    window.location.href = "Home.html";
  } else {
    alert("Tên người dùng hoặc mật khẩu không chính xác. Vui lòng thử lại.");
  }
}
