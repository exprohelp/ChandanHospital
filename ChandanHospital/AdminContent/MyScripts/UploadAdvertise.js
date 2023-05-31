$(function () {
    $(document).ajaxStart(function () {
        $('#mydiv').show();
    }).ajaxSuccess(function () {
        $('#mydiv').show();
    }).ajaxStop(function () {
        $('#mydiv').hide();
    });
    $('#UploadAdvertise').addClass("active");
    $("#imageUploaded").attr("src", "../Documents/advertisement/advertise.jpeg");

    $("#fileProduct").change(function () {
        readURL(this);
    });
});

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imageUpload').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}



function UploadFile() {

    if ($("#fileProduct").val() == "") {
        alert("Please Upload Advertise Image");
        $("#fileProduct").focus();
        return false;
    }
    var fileUpload = $("#fileProduct").get(0);
    var files = fileUpload.files;
    var ext = $('#fileProduct').val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['png', 'jpg', 'jpeg']) == -1) {
        alert('Invalid extension! Only .png, .jpg., .jpeg required.');
        $('#fileProduct').focus();
        return false;
    }
    $("#btnSubmit").attr("disabled", "disabled").val("Please wait..");
    //Save Upload Doctors
    var data = new FormData();
    for (var i = 0; i < files.length; i++) {
        data.append("advertise.jpeg", files[i]);
    }

    $.ajax({
        url: "../UploadAdvertisement.ashx",
        type: "POST",
        data: data,
        contentType: false,
        processData: false,
        success: function (result) {
            alert("Uploaded Successfully");
            window.location.reload(true);
        },
        error: function (err) {
            alert(err.statusText)
        }
    });
}

function Clear() {
    $("#fileProduct").val('');
    $("#imageUpload").attr("src", "images/no-image-icon.jpg");
    $("#btnSubmit").removeAttr("disabled").val("Upload");
}