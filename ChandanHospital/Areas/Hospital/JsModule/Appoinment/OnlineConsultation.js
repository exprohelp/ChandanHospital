$(document).ready(function () {
	$('#ChkCondition').on('change', function () {
		var ischeck = $(this).is(':checked');
		if (ischeck)
			$('#btnSubmit').prop("disabled",false);
		else
			$('#btnSubmit').prop("disabled", true);
	});
});


function Clear() {
	$('input[type=text],input[type=email]').val('');
	$('select').prop('selectedIndex', 0);
}

function InsertOnlineDoctorAppoinment() {
	var url = config.baseUrl + "/api/Appoinment/OnlineInsertDoctorAppointment";
	var objBO = {};
	objBO.MobileNo = $("#txtMobile").val();
	objBO.PatientName = $('#txtPatientName').val();
	objBO.Gender = $('#ddlGender option:selected').text();
	objBO.Age = $('#txtAge').val();
	objBO.AgeType = $('#ddlAgeType option:selected').text();
	objBO.City = $('#txtCity').val();
	objBO.Locality = $('#txtLocality').val();
	objBO.PtAddress = $('#txtAddress').val();
	objBO.EmailId = $('#txtEmail').val();
	objBO.AppointmentReason = $('#txtAppomtReason').val();
	objBO.Logic = 'Insert';
	$.ajax({
		method: "POST",
		url: url,
		data: JSON.stringify(objBO),
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		success: function (data) {
			if (data.includes('Success')) {
				alert(data);
				Clear();
			}
			else {
				alert(data);
			}
		},
		error: function (response) {
			alert('server error...!');
		}
	})
}

function GetOnlineBookingNotification() {
	var url = config.baseUrl + "/api/Appoinment/OnlineBookingNotification";
	var objBO = {};
	objBO.from = $('#txtFrom').val();
	objBO.to = $('#txtTo').val();
	objBO.hosp_id = Active.unitId;
	objBO.SubCatId = $("#ddlCategory option:selected").val();
	objBO.TestCode = $("#ddlTest option:selected").val();
	objBO.Logic = "BookingDetail";
	$.ajax({
		method: "POST",
		url: url,
		data: JSON.stringify(objBO),
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		success: function (data) {
			console.log(data)
		},
		error: function (response) {
			alert('Server Error...!');
		}
	});

}