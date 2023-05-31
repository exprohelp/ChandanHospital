$(function () {
    $(document).ajaxStart(function () {
        $('#mydiv').show();
    }).ajaxSuccess(function () {
        $('#mydiv').show();
    }).ajaxStop(function () {
        $('#mydiv').hide();
    });


    BindDoctors();
});


function BindDoctors() {


    $.ajax({
        type: "POST",
        url: "Doctors_Details.aspx/GetDoctors",
        data: "{}",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $('#tblFill').empty();
            if (data.d.length > 0) {
                for (var i = 0; i < data.d.length; i++) {

                  
                    var Degree = "";
                   // var Education_Training = "";
                    var Specialisation = "";

                    if (data.d[i].Degree.indexOf('|') == -1) {
                        Degree = data.d[i].Degree;
                    } else {
                        Degree = (data.d[i].Degree).split('|').join("<br/>");
                    }

                    //if (data.d[i].Education_Training.indexOf('|') == -1) {
                    //    Education_Training = data.d[i].Education_Training;
                    //} else {
                    //    Education_Training = (data.d[i].Education_Training).split('|').join("<br/>");
                    //}
                    if (data.d[i].Specialisation.indexOf('|') == -1) {
                        Specialisation = data.d[i].Specialisation;
                    } else {
                        Specialisation = (data.d[i].Specialisation).split('|').join("<br/>");
                    }


                    $("#tblFill").append("<tr><td>" + (i + 1) +
                        "</td><td><a href='AddDoctors.aspx?did=" + data.d[i].autoId + "'>Edit<a>" +
                        "</td><td><a href='../" + data.d[i].Photo_Path + "' target='_blank'><img style='width:100px; height:100px;' src='../" + data.d[i].Photo_Path +"' /><a>" +
                        "</td><td>" + data.d[i].Doctor_Name +
                        "</td><td>" + data.d[i].Head +
                        "</td><td>" + data.d[i].TitleType +
                        "</td><td>" + Degree +
                        "</td><td>" + Specialisation +
                        "</td><td>" + ((data.d[i].IsActive == 'Y') ? "Active" : "Close") +
                        "</td></tr>");
                }
            }

            $('#tblDetails').DataTable({
                "lengthMenu": [[50, 100, -1], [50, 100, "All"]],
                destroy: true
            });
        },
        error: function (xhr) {
            alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status);
            alert("responseText: " + xhr.responseText);
        }
    });
}