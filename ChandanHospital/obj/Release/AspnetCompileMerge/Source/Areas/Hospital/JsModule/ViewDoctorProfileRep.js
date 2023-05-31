
$(document).ready(function () { 
    var DoctorId = query()['DoctorId'];
    if (DoctorId == 'DR00035')
        $('#DivAppoinment').hide();
    else
        $('#DivAppoinment').show();
    GetDoctorsProfileAllfeatures(DoctorId);
});

function GetDoctorsProfileAllfeatures(DoctorId) {
    var url = config.baseUrl + "/api/Doctors/Web_DoctorQueries";
    var objBO = {};
    objBO.DoctorId = DoctorId;
    objBO.Logic = "GetDoctorProfileWithAllFeatures";
    $.ajax({
        method: "POST",
        url: url,
        data: JSON.stringify(objBO),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (data) {        
            var htmldata ="";
            $("#bind").empty();
            var tag = "";
            $.each(data.ResultSet.Table,function (key, val) {
                $('#imgdoctors').prop('src', val.VirtualPhotoPath);
                $('#spndocname').text(val.Doctor_Name);
                $('#spndegree').text(val.Degree2);
                $('#spnDesignation').text(val.Designation);
                $('#spnDept').text(val.dept_name);
                if (val.opdFlag == 'Y')
                    $('#btnBookAppointment').show();
                else
                    $('#btnBookAppointment').hide();                   
            });
            $.each(data.ResultSet.Table1,function (key,val) {
                if (tag != val.TagName) {
                    htmldata += '<div class="row">';
                    htmldata += '<div class="col-md-12">';
                    htmldata += '<div class="panel panel-primary">';
                    htmldata += '<div class="panel-heading">';
                    htmldata += '<h4 class="panel-title">' + val.TagName +'</h4>';
                    htmldata += '</div><div class="panel-body">';
                    htmldata += '<div id="divSpecialization">';
					htmldata += '<ul style="padding: 0 20px;">';
                    tag = val.TagName;
                    $.each(data.ResultSet.Table1, function (key,val) {
                        if(tag == val.TagName) {
                            htmldata += '<li>' + val.Description + '</li>';
                        }                    
                    });
                    htmldata += '</ul></div></div></div></div></div>';
                }
            });
            $("#bind").append(htmldata);
        },
        error: function (response) {
            alert('Server Error...!');
        }
    });
}



