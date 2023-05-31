
$(document).ready(function () {
    var AppInfo = sessionStorage.getItem('AppInfo');
    if (AppInfo != null) {
        $.each(JSON.parse(AppInfo), function (key, val) {
            $('#txtHospital').text(val.hospital);
            $('#txtDepartment').text(val.Dept);
            $('#txtDotorId').text(val.DoctorId);
            $('#txtDotors').text(val.DoctorName);
            $('#txtAppoinmentTime').text(val.AppDate);
            $('#txtStartTime').text(val.StartTime);
        });
    }
    else {
        sessionStorage.removeItem('AppInfo');
        history.back();
    }
});

function BookAppointment() {
    var url = config.baseUrl + "/api/Appoinment/DirectAppointment";
    var objBO = {};
    objBO.Title = $('#ddlTitleWOHID option:selected').val();
    objBO.PFirstName = $('#txtFirstName').val();
    objBO.PLastName = $('#txtLastName').val();
    objBO.Age = $('#txtAge').val();
    objBO.Gender = $('#ddlGender option:selected').text();
    objBO.Mobile = $('#txtPhone').val();
    objBO.Address = $('#txtAddress').val();
    objBO.DoctorId = $('#txtDotorId').text();
    objBO.AppDate = $('#txtAppoinmentTime').text();
    objBO.StartTime = $('#txtStartTime').text();
    objBO.OpdRemark = $('#txtDiseaseDescription').val();  
    //console.log(data)
    //var msg = JSON.parse(data);
    //console.log(msg.data[0].AppointmentID)
    $.ajax({
        method: "POST",
        url: url,
        data: JSON.stringify(objBO),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            console.log(data)
            var msg = JSON.parse(data);
            var AppSuccess = [];
            var DoctorName = '';
            if (data.includes('Success')) {
                var AppId = msg.data[0].AppointmentID;
                var AppInfo = sessionStorage.getItem('AppInfo');
                $.each(JSON.parse(AppInfo), function (key, val) {
                    AppSuccess.push({
                        'FromTime': val.FromTime,
                        'ToTime': val.ToTime,
                        'DocName': val.DoctorName,
                        'DocId': val.DoctorId,
                        'hospName': val.hospital,
                        'DeptName': val.Dept,
                        'Date': val.Date,
                        'AppId': AppId,
                        'FName': objBO.PFirstName,
                        'LName': objBO.PLastName
                    });
                    PatientName = $('#txtFirstName').val();
                    DoctorName = $('#txtDotors').text();
                    SendSmsToPatient(AppId, objBO.Mobile, PatientName, DoctorName, objBO.AppDate)//Send SMS to Patient
                    SendSmsToEmployee(AppId, objBO.AppDate)//Send SMS to Employee
                    sessionStorage.setItem('AppSuccess', JSON.stringify(AppSuccess))
                    window.location.href = "AppointmentSuccess";
                });
            }
            else {

                alert(msg.message)
            }
        },
        error: function (response) {
            alert('Server Error...!');
        }
    })
}
//function PatientAppoinmentById(AppId) {
//    var url = config.baseUrl + "/api/Appoinment/SaveGenerateAppointment";
//    var objBO = {};
//    objBO.uhid = AppId;
//    objBO.DoctorId = $('#txtDotorId').text();
//    objBO.AppDate = $('#txtAppoinmentTime').text();
//    objBO.StartTime = "-";
//    objBO.Desc = "-";
//    objBO.IsReg = "0";
//    objBO.centerId = "1";
//    $.ajax({
//        method: "POST",
//        url: url,
//        data: JSON.stringify(objBO),
//        dataType: "json",
//        contentType: "application/json;charset=utf-8",
//        success: function (data) {        
//            var AppSuccess = [];
//            var AppId = data.ResultSet.Table[0].AppId;
//            var AppDate = '';
//            var DoctorName = '';
//            var PatientPhone = $('#txtPhone').val();
//            var PatientName = $('#txtPhone').val();
//            var DoctorName = '';
//            var AppInfo = sessionStorage.getItem('AppInfo');
//            $.each(JSON.parse(AppInfo), function (key, val) {
//                AppSuccess.push({
//                    'FromTime': val.FromTime,
//                    'ToTime': val.ToTime,
//                    'DocName': val.DoctorName,
//                    'DocId':  val.DoctorId,
//                    'hospName': val.hospital,
//                    'DeptName': val.Dept,
//                    'Date': val.Date,
//                    'AppId':  AppId,
//                    'FName': $('#txtFirstName').val(),
//                    'LName': "-"
//                });
//                AppDate: val.Date;
//                PatientName = $('#txtFirstName').val();
//                DoctorName = val.DoctorName
//                SendSmsToPatient(AppId, PatientPhone,PatientName, DoctorName,AppDate)//Send SMS to Patient
//                SendSmsToEmployee(AppId, AppDate)//Send SMS to Employee
//                sessionStorage.setItem('AppSuccess', JSON.stringify(AppSuccess))
//                window.location.href = "AppointmentSuccess";

//            });
//        },
//        error: function (response) {
//            alert('Server Error...!');
//        }
//    })
//}
//Send SMS
function SendSmsToPatient(AppId, Mobile, Patient, Doctor, AppDate) {
    objBO = {};
    objBO.AppId = AppId;
    objBO.MobileNo = Mobile;
    objBO.PatientName = Patient;
    objBO.DoctorName = Doctor;
    objBO.AppDate = AppDate;
    $.ajax({
        method: "POST",
        url: config.baseUrl + '/api/Appoinment/SendSmsToPatient',
        data: JSON.stringify(objBO),
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        success: function (data) {
            // console.log(data)
            if (data.includes('Sent')) {
            }
        },
        error: function (response) {
            alert('Server Error...!');
        }
    });

}
function SendSmsToEmployee(AppId, AppDate) {
    objBO = {};
    objBO.AppId = AppId;
    objBO.AppDate = AppDate;
    objBO.MobileNo = '7311170955';//9532475351,7311170955,9838003146  
    $.ajax({
        method: "POST",
        url: config.baseUrl + '/api/Appoinment/SendSmsToEmployee',
        data: JSON.stringify(objBO),
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        success: function (data) {
            if (data.includes('Sent')) {
            }
        },
        error: function (response) {
            alert('Server Error...!');
        }
    });
}




