
$(function () {
    //$(document).ajaxStart(function () {
    //    $('#mydiv').show();
    //}).ajaxSuccess(function () {
    //    $('#mydiv').show();
    //}).ajaxStop(function () {
    //    $('#mydiv').hide();
    //});
   // BindSpecialistsDoctors();
});

function BindSpecialistsDoctors() {
    $.ajax({
        type: "POST",
        url: "our-specialists.aspx/GetDoctors",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d.length > 0) {
                $('#divOurSpecialists').empty();
                for (var i = 0; i < data.d.length; i++) {
                    var Degree = (data.d[i].Degree).split('|');
                    var Specialisation = (data.d[i].Specialisation).split('|');

                    var Degree_Html = "";
                    var Specialisation_Html = "";

                    if (Degree.length == 1) {
                        Degree_Html = '<p style="margin-top: -12px; margin-bottom: -3px;line-height: 19px;">' + Degree[0] + '</p>';
                    }
                    else {
                        Degree_Html = '<p style="margin-top: -12px; margin-bottom: -3px;line-height: 19px;">' + Degree[0] + '</p> <b style="font-size: 15px;">' + Degree[1] + '</b>';
                    }
                    $('#divOurSpecialists').append('<div class="col-xs-12 col-sm-6 col-md-4 DivBox">' +
                        '<div class= "row" style="margin-top:7px;" >' +
                        '<div class="col-md-12">' +
                        '<div class="thumb">' +
                        '<img src="' + data.d[i].Photo_Path + '" class="img-responsive" style="height: 150px" />' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col-md-12">' +
                        '<h4 style="line-height: 6px;">' + data.d[i].TitleType + '</h4>' +
                        '<h5>' + data.d[i].Head + '</h5>' +
                        '<h4>' + data.d[i].Doctor_Name + '</h4>' +
                        Degree_Html +
                        '<div class="specialist-Content" id="Specialisation' + i + '">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="row" style="margin-top:2px;">' +
                        '<div class="col-md-12 col-sm-12 col-xs-12 m-t-5">' +
                        // '<div class="button-wrapper">' +
                        //'<a href="Doctor-Profile.aspx?d=' + data.d[i].autoId + '" class="a-btn">' +
                        //'<span class="a-btn-text">View</span>' +
                        //'<span class="a-btn-slide-text">More</span>' +
                        ////'<span class="a-btn-icon-right"></span>' +
                        //'</a>' +
                        //'</div>' +
                        '<a href="Doctor-Profile.aspx?d=' + data.d[i].autoId + '" class="btn btn-primary">View Profile</a>' +
                        '</div>' +
                        //'<div class="col-md-5 col-sm-5 col-xs-12">' +
                        //'<a id="linkBookAppointment" href="bookappointment.aspx?d=' + data.d[i].autoId + '&d_Id=' + data.d[i].Doctor_Id + '" class="btn btn-primary" ><i class="fa fa-calendar" aria-hidden="true"></i>&nbsp;&nbsp;Book Appointment</a>'+
                        //'</div>' +
                        '</div>' +
                        '</div >');

                    $('#Specialisation' + i).empty();
                    for (var j = 0; j < Specialisation.length; j++) {
                        // $('#Specialisation' + i).append('<p>' + Specialisation[j] + '</p>')

                    }
                }
            }
        },
        error: function (xhr) {
            alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status);
            alert("responseText: " + xhr.responseText);
        }
    });
}