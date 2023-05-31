
var mobilevalid = /^([1-9])([0-9]){9}$/;

$(function () {
    SetSlidHeading("Book Appointment For Doctor");
    $("#txtAppointmentDate").val(GetCurrentDateInDDMMYYYY());
    var d = getQueryString("d");
    var d_id = getQueryString("d_id");
    if (d != null && d_id != null) {
        SetContent(d, d_id);
    }  
});

function SetContent(d, d_id) {


    var appDate = $("#txtAppointmentDate").val();

    var appointmentDate = appDate.split('/')[2] + '-' + appDate.split('/')[1] + '-' + appDate.split('/')[0];


    $.ajax({
        type: "POST",
        url: "bookappointment.aspx/BindDoctorDetails",
        data: "{d : " + JSON.stringify(d) + ",d_id : " + JSON.stringify(d_id) + ",appointmentdate : " + JSON.stringify(appointmentDate) + "}",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            if (data.d.length > 0) {

                var dt1 = data.d[0];
                var dt2 = data.d[1];



                var Degree = (dt2[0].Degree).split('|');
                var Specialisation = (dt2[0].Specialisation).split('|');
                if (Degree.length == 1) {
                    $('#pDegree').text(Degree[0]);
                    $('#Fellowship').text('').hide();
                }
                else {
                    $('#pDegree').text(Degree[0]);
                    $('#Fellowship').text(Degree[1]).show();
                }
                $('#drImage').attr("src", "" + dt2[0].Photo_Path + "");



                $('#hDepartment').text(dt2[0].Head);
                $('#hTitleType').text(dt2[0].TitleTypeText);
                $('#hName').text(dt1[0].Doctor_Name);
                $('#divTimingSlot').empty();
                for (var i = 0; i < dt1.length; i++) {
                    $('#divTimingSlot').append('<div class="col-md-2 col-sm-3 col-xs-6"><label class="radio-inline"><input type="radio" value="' + dt1[i].Time + '" name="radio">' + dt1[i].Time + '</label></div>');
                }
                $('#SpecialisationLeft').empty();
                for (var j = 0; j < Specialisation.length; j++) {
                    $('#SpecialisationLeft').append('<p>' + Specialisation[j] + '</p>');
                }

            }
        },
        error: function (xhr) {
            alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status);
            alert("responseText: " + xhr.responseText);
        }
    });
}








function SubmitDetails() {

    var nobj = {};
    debugger;
    nobj.Name = $('#txtpName').val();
    nobj.Mobile = $('#txtMobile').val();
    nobj.Date = $('#txtAppointmentDate').val();
    nobj.Timing = "";
    nobj.Doctor_Id = getQueryString("d_Id");
    if ($("input[name='radio']").is(":checked"))
    {
        nobj.Timing = $("input[name='radio']:checked").val();
    }
    if (nobj.Date == "") {
        alert("Please enter appointment date.");
        $('#txtAppointmentDate').focus();
        return false;
    }
    else if (nobj.Timing == "") {
        alert("Please choose timing of appointment.");
        $('#divTimingSlot').focus();
        return false;
    }
    else if (nobj.Name == "") {
        alert("Please enter name.");
        $('#txtpName').focus();
        return false;
    }
    else if (nobj.Mobile == "") {
        alert("Please enter 10 digit Mobile No.");
        $('#txtMobile').focus();
        return false;
    }
    else if (nobj.Mobile != "" && !mobilevalid.test(nobj.Mobile)){
        alert("Please enter valid 10 digit Mobile No.");
        $('#txtMobile').focus();
        return false;
    }
    $.ajax({
        type: "POST",
        url: "bookappointment.aspx/SubmitAppointment",
        data: "{nobj : " + JSON.stringify(nobj) + "}",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

           
        },
        error: function (xhr) {
            alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status);
            alert("responseText: " + xhr.responseText);
        }
    });











    








}