
$(document).ready(function () {
    $('input[type=file]').change(function () {
        console.log(this.files[0].mozFullPath);
    });
    GetCareer();
    $("#divOpening tbody").on('click', '#btnApply', function() {
        var title = $(this).data('title');
        var desc = $(this).data('desc');
        $('#jobinfo').text('Applied for job : ' + title + ' :' + desc + '')
    });
});

function SendMailToHR() {
    var url = config.baseUrl + "/api/Appoinment/SendMailToHRFromCarrier";
    var objBO = {};
    objBO.Email = $('#txtEmail').val();
    objBO.JobInformation = $('#jobinfo').text();

    var UploadDocumentInfo = new XMLHttpRequest();
    var data = new FormData();
    data.append('obj', JSON.stringify(objBO));
    data.append('ImageByte', $('input[id=fileCV]')[0].files[0]);
    UploadDocumentInfo.onreadystatechange = function () {
        if (UploadDocumentInfo.status) {
            if (UploadDocumentInfo.status == 200 && (UploadDocumentInfo.readyState == 4)) {
                var json = JSON.parse(UploadDocumentInfo.responseText);
                if (json.Message.includes('OK')) {
                    alert('Uploaded Successfully');
                    PatientInfo(objBO.VisitNo);
                }
                else {
                    alert(json.Message);
                }
            }
        }
    }
    UploadDocumentInfo.open('POST', url, true);
    UploadDocumentInfo.send(data);
}

function GetCareer() {
    var url = config.baseUrl + "/api/Career/CareerInfo";
    var objBO = {};
    objBO.Logic = 'Select';
    $.ajax({
        method: "POST",
        url: url,
        data: JSON.stringify(objBO),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            var htmldata = "";
            var JobFor = "";
            $("#divOpening tbody").empty();
            $.each(data.ResultSet.Table, function (key, val) {
                if (JobFor != val.Job_For) {
                    htmldata += '<tr>';
                    htmldata += '<td colspan="4" class="title-opening">' + val.Job_For + '</td>';
                    htmldata += '</tr>';
                    JobFor = val.Job_For;
                }
                htmldata += '<tr>';
                htmldata += '<td style="text-align:left">' + val.Job_Description + '</td>';
                htmldata += '<td style="text-align:left">' + val.Desired_Profile + '</td>';
                htmldata += '<td style="text-align:left">' + val.No_Of_Openings + '</td>';
                htmldata += '<td style="text-align:center"><a class="btn btn-info" style="text-align:center" href="#divemail" data-desc=' + val.Job_Description +' data-title=' + val.Job_For+' id="btnApply"><i>Apply</i></a></td>';
                htmldata += '</tr>';
            });
            $("#divOpening tbody").append(htmldata);

        },
        error: function (data) {
            alert('server error...!');
        }
    });
}







