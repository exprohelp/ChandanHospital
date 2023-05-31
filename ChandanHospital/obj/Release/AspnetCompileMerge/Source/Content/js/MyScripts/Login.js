function SignIn() {

    var UserName = $("#txtUserName").val().trim();
    var Password = $("#txtPassword").val().trim();

    if (UserName == "") {
        alert("Please Enter User Name");
        $("#txtUserName").focus();
        return false;
    }

    else if (Password == "") {
        alert("Please Enter Password");
        $("#txtPassword").focus();
        return false;
    }
    $("#btnSignIn").attr("disabled", "disabled").empty().html('<i class="fa fa-spinner fa-spin"></i>&nbsp;Please wait..');
    $.ajax({
        type: "POST",
        url: "Login.aspx/SignIn",
        data: "{UserName : " + JSON.stringify(UserName) + ",Password : " + JSON.stringify(Password) + "}",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != "" && data.d == "admin") {
                window.location.href = "AdminDashboard.aspx";
            }
            else {
                alert("Wrong User Nme Or Password");
                $("#btnSignIn").removeAttr("disabled").empty().html('<i class="fa fa-sign-in"></i>&nbsp;Sign In');
             
            }
        },
        error: function (xhr) {
            alert("responseText: " + xhr.responseText);
            $("#btnSignIn").removeAttr("disabled").empty().html('<i class="fa fa-sign-in"></i>&nbsp;Sign In');
          
        }
    });
}


function Clear() {

    $("#txtUserName").val('');
    $("#txtPassword").val('');
    $("#btnSignIn").removeAttr("disabled").val("Sign In");
}


function ForgotValidate(event) {

    event.preventDefault();

    var emailid = $("#txtEmail").val();

    if (emailid == "") {
        alert("Please Enter Email Id");
        $("#txtEmail").focus();
        return false;
    }

    $.ajax({
        type: "POST",
        url: "Login.aspx/ForgotPassword",
        data: "{emailid : " + JSON.stringify(emailid) + "}",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            if (data.d == 1) {
                alert('Your password has been sent to your Mail/ Mobile');
            }
            else {
                alert("Wrong Email/Userid/Mobile Or Password");
            }
        },
        error: function (xhr) {
            alert("responseText: " + xhr.responseText);
        }
    });
}