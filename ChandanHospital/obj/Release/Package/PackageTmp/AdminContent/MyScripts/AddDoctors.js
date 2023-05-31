$(function () {
    $(document).ajaxStart(function () {
        $('#mydiv').show();
    }).ajaxSuccess(function () {
        $('#mydiv').show();
    }).ajaxStop(function () {
        $('#mydiv').hide();
        });
    $('#AddDoctors').addClass("active");
    var autoid = getQueryString("did");
    if (autoid != null) {
        Edit(autoid);
    }
});




function Edit(id) {

    $.ajax({
        type: "POST",
        url: "AddDoctors.aspx/GetDoctorsById",
        data: "{id : " + id + "}",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.length > 0) {
                $("#hfautoid").val(data.d[0].autoId);
                $("#hfPhotoPath").val(data.d[0].Photo_Path);
                $("#txtName").val(data.d[0].Doctor_Name);
                $("#ddlStatus").val(data.d[0].IsActive);
                $("#txtHead").val(data.d[0].Head);
                $("#ddlTitleType").val(data.d[0].TitleType);
                $("#txtDegree").val(data.d[0].Degree);
                $("#txtEduTra").val(data.d[0].Education_Training);
                $("#txtSpecialisation").val(data.d[0].Specialisation);
                $("#txtBiography").val(data.d[0].Biography);
                $("#spanHeading").text("Update Doctor");
                $("#btnSubmit").removeAttr("disabled").val("Update");
            }
        },
        error: function (xhr) {
            alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status);
            alert("responseText: " + xhr.responseText);
        }
    });

}





function SaveUpdate() {

    var objDetails = {};

    objDetails.autoId = $("#hfautoid").val();
    objDetails.Doctor_Name = $("#txtName").val();
    objDetails.Head = $("#txtHead").val();
    objDetails.TitleType = $("#ddlTitleType").val();
    objDetails.Degree = $("#txtDegree").val();
    objDetails.Education_Training = $("#txtEduTra").val();
    objDetails.Specialisation = $("#txtSpecialisation").val();
    objDetails.Biography = $("#txtBiography").val();
    objDetails.IsActive = $("#ddlStatus").val();
    if (objDetails.Doctor_Name == "") {
        alert("Please enter Doctor Name");
        $("#txtName").focus()
        return false;
    }
    else if (objDetails.Head == "") {
        alert("Please enter Title");
        $("#txtHead").focus()
        return false;
    } else if (objDetails.Degree == "") {
        alert("Please enter Degree");
        $("#txtDegree").focus()
        return false;
    }
    //else if (objDetails.Education_Training == "") {
    //    alert("Please enter Education & Training");
    //    $("#txtEduTra").focus()
    //    return false;
    //}
    else if (objDetails.Specialisation == "") {
        alert("Please enter Specialisation");
        $("#txtSpecialisation").focus()
        return false;
    }

    if ($("#fileProduct").val() != "") {
        objDetails.Photo_Path = $('#fileProduct').val();
        var ext = $('#fileProduct').val().split('.').pop().toLowerCase();

        if (ext == "png" || ext == "jpg" || ext == "jpeg") {

        }
        else {
            alert("Please upload image file only");
            $('#fileProduct').focus();
            return false;
        }
    }
    $("#btnSubmit").attr("disabled", "disabled").val("Please wait..");

    if ($("#fileProduct").val() == "") {

        objDetails.Photo_Path = $("#hfPhotoPath").val();
        $.ajax({
            type: 'POST',
            url: 'AddDoctors.aspx/InsertUpdateDetails',
            data: "{objDetails : " + JSON.stringify(objDetails) + "}",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.d == "Saved Successfully") {
                    alert(data.d);
                    Clear();
                }
                else if (data.d == "Updated Successfully") {
                    alert(data.d);
                    Clear();
                }
                else {
                    alert(data.d);
                    $("#btnSubmit").removeAttr("disabled").val("Save");
                }
            },
            error: function (xhr) {
                alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status);
                alert("responseText: " + xhr.responseText);
            }
        });



    }
    else {

        var fileUpload = $("#fileProduct").get(0);
        var files = fileUpload.files;
        var ext = $('#fileProduct').val().split('.').pop().toLowerCase();
        if ($.inArray(ext, ['png', 'jpg', 'jpeg']) == -1) {
            alert('Invalid extension! Only .png, .jpg., .jpeg required.');
            $('#fileProduct').focus();
            return false;
        }
        objDetails.Photo_Path = "Documents/Doctors/" + files[0].name;
        //Save Upload Doctors
        var data = new FormData();
        for (var i = 0; i < files.length; i++) {
            data.append(files[i].name, files[i]);
        }

        $.ajax({
            url: "../UploadDoctorsPhoto.ashx",
            type: "POST",
            data: data,
            contentType: false,
            processData: false,
            success: function (result) {

                $.ajax({
                    type: 'POST',
                    url: 'AddDoctors.aspx/InsertUpdateDetails',
                    data: "{objDetails : " + JSON.stringify(objDetails) + "}",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data.d == "Saved Successfully") {
                            alert(data.d);
                            Clear();
                        }
                        else if (data.d == "Updated Successfully") {
                            alert(data.d);
                            Clear();
                           
                        }
                        else {
                            alert(data.d);
                            $("#btnSubmit").removeAttr("disabled").val("Save");
                        }
                    },
                    error: function (xhr) {
                        alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status);
                        alert("responseText: " + xhr.responseText);
                    }
                });

            },
            error: function (err) {
                alert(err.statusText)
            }
        });

    }










}






function Clear() {
    $("#hfautoid").val("0");
    $("#hfPhotoPath").val("");
    $("#txtName").val("");
    $("#txtHead").val("");
    $("#ddlTitleType").val('2');
    $("#txtDegree").val("");
    $("#txtEduTra").val("");
    $("#txtSpecialisation").val("");
    $("#txtBiography").val("");
    $("#fileProduct").val('');
    $("#ddlStatus").val('Y');
    $("#spanHeading").text("Add Doctor");
    $("#btnSubmit").removeAttr("disabled").val("Save");
}