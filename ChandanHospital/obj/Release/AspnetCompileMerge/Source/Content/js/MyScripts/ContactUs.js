
var baseUrl = "http://localhost:54699/";
$(document).ready(function () {
  GetContactUs();
    $('#ContentPlaceHolder1_ddlQueryType').on('change', function () {
        var val = $(this).find('option:selected').text();
        if (val == "HR")
            $('#uploadGroup').show();
        else
            $('#uploadGroup').hide();
    });
});
function GetContactUs() {
    var objBO = {};
    url = baseUrl + 'api/PatientFeedback/web_ContactUsQueries';
    objBO.Auto_Id = 0;
    objBO.Logic = "GetContactInfo";
    $.ajax({
        method: "POST",
        url: url,
        data: JSON.stringify(objBO),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            console.log(data);
            var htmldata = "";
            $(".contactInfo").empty();
            $.each(data.ResultSet.Table, function (key, val) {
                htmldata += '<div class="col-md-4 col-sm-6 col-xs-12 team_col">';
                htmldata += '<div class="shadow">';
                htmldata += '<div class="cont_name">' + val.DeptName + '</div>';
                htmldata += '<div class="contactbox">';
                htmldata += '<b>' + val.EmpName + '</b><br>';
                htmldata += '' + val.Designation + '<br>';
                htmldata += '<i class="fa fa-envelope-o" aria-hidden="true"></i>: ' + val.EmailId + '';
                htmldata += '</div>';
                htmldata += '</div>';
                htmldata += '</div>';
            });
            $(".contactInfo").append(htmldata);
        },
        error: function (data) {
            alert('Server Error...!');
        }
    });
}
function InsertPatientFeedback() {
    if (Validation()) {
        var url = baseUrl + "api/PatientFeedback/Web_PatientFeedback";
        var objBO = {};
        objBO.QueryType = $("#ddlQueryType option:selected").text();
        objBO.EmailId = $('#txtEmail').val();
        objBO.MobileNo = $('#txtMobile').val();
        objBO.Subject = $('#txtSubject').val();
        objBO.Message = $('#txtMessage').val();
        objBO.Attachment = $('#fileAttach').val();
        objBO.Logic = 'Insert';
        $.ajax({
            method: "POST",
            url: url,
            data: JSON.stringify(objBO),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.includes('Success')) {
                    Clear();
                    alert(data);
                    SendMail();
                }
                else {
                    alert(data);
                }
            },
            error: function (response) {
                alert('Server Error...!');
            }
        })
    }
}
function Validation() {
    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
    var QueryType = $('#ContentPlaceHolder1_ddlQueryType option:selected').text();
    var Email = $('#ContentPlaceHolder1_txtEmail').val();
    var Mobile = $('#ContentPlaceHolder1_txtMobile').val();
    var Subject = $('#ContentPlaceHolder1_txtSubject').val();
    var Message = $('#ContentPlaceHolder1_txtMessage').val();
    var Attachment = $('#ContentPlaceHolder1_fileAttach').val();
    if (QueryType == 'Select') {
        alert('Please Select Query Type');
        $('#ContentPlaceHolder1_ddlQueryType').css('border-color', 'red');
        return false;
    }
    else {
        $('#ContentPlaceHolder1_ddlQueryType').removeAttr('style');
    }
    if (Email == '') {
        alert('Please Select MobileNo');
        $('#ContentPlaceHolder1_txtEmail').css('border-color', 'red');
        return false;
    }
    else if (!pattern.test(Email)) {
        alert('Please Provide Correct Email Address');
        $('#ContentPlaceHolder1_txtEmail').css('border-color', 'red');
        return false;
    }
    else {
        $('#ContentPlaceHolder1_txtEmail').removeAttr('style');
    }
    if (Mobile == '') {
        alert('Please Select MobileNo');
        $('#ContentPlaceHolder1_txtMobile').css('border-color', 'red');
        return false;
    }
    else if ((Mobile).length < 10) {
        alert('Mobile No should be 10 digit.');
        $('#ContentPlaceHolder1_txtMobile').css('border-color', 'red');
        return false;
    }
    else {
        $('#ContentPlaceHolder1_txtMobile').removeAttr('style');
    }
    if (Subject == '') {
        alert('Please Enter Subject');
        $('#ContentPlaceHolder1_txtSubject').css('border-color', 'red');
        return false;
    }
    else {
        $('#ContentPlaceHolder1_txtSubject').removeAttr('style');
    }
    if (Message == '') {
        alert('Please Type Message .');
        $('#ContentPlaceHolder1_txtMessage').css('border-color', 'red');
        return false;
    }
    else {
        $('#ContentPlaceHolder1_txtMessage').removeAttr('style');
    }
    if (QueryType == 'HR') {
        if (Attachment == '') {
            alert('Please Choose file');
            $('#uploadGroup').css('border-color', 'red');
            return false;
        }
        else {
            $('#uploadGroup').removeAttr('style');
        }
    }
    return true;
}

function Clear() {
    $('input:text').val('');
    $('textarea').val('');
    $('input:file').val('');
}




