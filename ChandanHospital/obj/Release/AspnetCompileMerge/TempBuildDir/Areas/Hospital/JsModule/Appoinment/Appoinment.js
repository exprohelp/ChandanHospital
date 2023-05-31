
$(document).ready(function () {
    FillCurrentDate('txtDate')
    var DoctorId = query()['DoctorId'];
    if (DoctorId != null) {
        GetDepartmentByDoctorId(DoctorId);
        GetDoctorById(DoctorId);
    }
    else {
        GetDepartment();
    }
    $('#tblBookingDetail tbody').on('click', '#btnBookNow', function () {
        var AppInfo = [];
        var hospital = $('#ddlHospitals option:selected').text();
        var Dept = $('#ddlDepartment option:selected').text();
        var DoctorId = $('#ddlDoctors option:selected').val();
        var DoctorName = $('#ddlDoctors option:selected').text();
        var AppDate = $('#txtDate').val();
        var StartTime = $(this).closest('tr').find('td:eq(1)').text();
        var ToTime = $(this).closest('tr').find('td:eq(2)').text();
        AppInfo.push({
            'hospital': hospital,
            'Dept': Dept,
            'DoctorId': DoctorId,
            'DoctorName': DoctorName,
            'AppDate': AppDate,
            'StartTime': StartTime,
            'FromTime': StartTime,
            'ToTime': ToTime,
            'Date': $('#txtDate').val()
        });
        sessionStorage.setItem('AppInfo', JSON.stringify(AppInfo))
        window.location.href = "BookSchedule";
    });
});
function GetDepartment() {
    var url = config.baseUrl + "/api/Doctors/Web_DoctorQueries";
    var objBO = {};
    objBO.IsActive = "Y";
    objBO.prm2 = "";
    objBO.Logic = "GetDepartment";
    $.ajax({
        method: "POST",
        url: url,
        data: JSON.stringify(objBO),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            //console.log(data)
            if (Object.keys(data.ResultSet).length > 0) {
                if (Object.keys(data.ResultSet.Table).length > 0) {
                    $("#ddlDepartment").append($("<option></option>").val("0").html("Select"));
                    $.each(data.ResultSet.Table, function (key, value) {
                        $("#ddlDepartment").append($("<option></option>").val(value.deptId).html(value.dept_name));
                    });
                }
            }
            else {
                alert('No Data Found')
            }
        },
        error: function (response) {
            alert('Server Error...!');
        }
    });
}
function GetDepartmentByDoctorId(DoctorId) {
    var url = config.baseUrl + "/api/Doctors/Web_DepartmentQueries";
    var objBO = {};
    objBO.DoctorId = DoctorId;
    objBO.Logic = "GetDepartmentsByDoctorId";
    $.ajax({
        method: "POST",
        url: url,
        data: JSON.stringify(objBO),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            //console.log(data)
            if (Object.keys(data.ResultSet).length > 0) {
                if (Object.keys(data.ResultSet.Table).length > 0) {
                    $("#ddlDepartment").empty();
                    $.each(data.ResultSet.Table, function (key, value) {
                        $("#ddlDepartment").append($("<option></option>").val(value.DeptId).html(value.dept_name));
                    });
                    $("#ddlDepartment").prop('disabled', true);
                }
            }
            else {
                alert('No Data Found')
            }
        },
        error: function (response) {
            alert('Server Error...!');
        }
    });
}
function GetDoctors() {
    var url = config.baseUrl + "/api/Doctors/Web_DoctorQueries";
    var objBO = {};
    objBO.DeptId = $('#ddlDepartment option:selected').val();
    objBO.Logic = "GetDoctorByDeptId";
    $.ajax({
        method: "POST",
        url: url,
        data: JSON.stringify(objBO),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            if (Object.keys(data.ResultSet).length > 0) {
                if (Object.keys(data.ResultSet.Table).length > 0) {
                    $("#ddlDoctors").empty().append($("<option></option>").val("0").html("Select"));
                    $.each(data.ResultSet.Table, function (key, value) {
                        $("#ddlDoctors").append($("<option></option>").val(value.HISDoctorId).html(value.DoctorName));
                    });
                }
            }
            else {
                //alert('No Data Found')
            }
        },
        error: function (response) {
            alert('Server Error...!');
        }
    });
}
function GetDoctorById(DoctorId) {
    var url = config.baseUrl + "/api/Doctors/Web_DoctorQueries";
    var objBO = {};
    objBO.DoctorId = DoctorId;
    objBO.Logic = "GetDoctors";
    $.ajax({
        method: "POST",
        url: url,
        data: JSON.stringify(objBO),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            if (Object.keys(data.ResultSet).length > 0) {
                if (Object.keys(data.ResultSet.Table).length > 0) {
                    $("#ddlDoctors").empty();
                    $.each(data.ResultSet.Table, function (key, value) {
                        $("#ddlDoctors").append($("<option></option>").val(value.HISDoctorId).html(value.DoctorName));
                    });
                    $("#ddlDoctors").prop('disabled', true);
                }
            }
            else {
                //alert('No Data Found')
            }
        },
        error: function (response) {
            alert('Server Error...!');
        }
    });
}
function GetBookingTimeSlot() {
    $('#tblBookingDetail tbody').empty();
    $('#tblBookingDetail thead').empty();
    var url = config.baseUrl + "/api/Appoinment/GetDoctorTimingSlot";
    var objBO = {};
    objBO.DoctorId = $('#ddlDoctors option:selected').val();
    objBO.AppDate = $('#txtDate').val();
    $.ajax({
        method: "POST",
        url: url,
        data: JSON.stringify(objBO),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            var tbody = '';
            var thead = '';
            var count = 0;
            if (data.includes('Doctor on Leave')) {
                alert('No Slots Available')
            }
            else {
                thead += "<tr>";
                thead += "<th>S.No.</th>";
                thead += "<th>From</th>";
                thead += "<th>To</th>";
                thead += "<th>Booking</th>";
                thead += "</tr>";
                $.each(JSON.parse(data).data, function (key, val) {
                    count++
                    tbody += "<tr>";
                    tbody += "<td>" + count + "</td>";
                    tbody += "<td>" + val.FromTime.slice(0, -3) + "</td>";
                    tbody += "<td>" + val.ToTime.slice(0, -3) + "</td>";
                    if (val.Available == 'YES')
                        tbody += "<td><button class='btn btn-primary' id='btnBookNow'>Book Slot</button></td>";
                    else
                        tbody += "<td>" + 'Not Available' + "</td>";
                    tbody += "</tr>";
                });
                $('#tblBookingDetail thead').append(thead);
                $('#tblBookingDetail tbody').append(tbody);
            }
        },
        error: function (response) {
            alert('Server Error...!');
        }
    });
}

