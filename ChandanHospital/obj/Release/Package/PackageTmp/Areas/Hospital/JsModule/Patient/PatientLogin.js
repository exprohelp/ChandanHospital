
$(document).ready(function () {

});
//SMS
function GetOtp() {
	//GetOtp
	var mobile = $("#txtMobileNo").val();
	if (mobile != "" || mobile != null) {
		if (mobile.length == 10) {
			$.ajax({
				method:"POST",
				url: config.baseUrl + '/api/PatientFeedback/GetOtp',
				data: {},
				contentType: "application/json;charset=utf-8",
				dataType: "JSON",
				success: function (data) {
					//console.log(data)
					if (data.length =='4') {
						$("#hidgetotp").val(data);
						SendSMS(mobile, data);
					}
					else {
						$('#lblMsg').empty().text(data).css('color', 'red');                     
					}
				},
				error: function (response) {
					$('#lblMsg').empty().text('Server Error...!').css('color', 'red');				
				}
			});
		}
		else {		
			$('#lblMsg').empty().text('Mobile Number should be 10 digit').css('color', 'red');
			return false;
		}
	}
	else {	
		$('#lblMsg').text('Please enter mobile number').css('color', 'red');
		return false;
	}
}
function verifyOtp() {
	var otpval = $("#hidgetotp").val();
	if (otpval != "") {
		if ($("#hidgetotp").val() == $("#txtOTP").val()) {
			$("#OTPSection").removeClass('Inactive');
			$("#CredentialSetion").addClass('Inactive');
			$('#lblMsg').empty().text('Your Mobile Validate Successfully').css('color', 'green');
			$("#hidgetotp").val('');
			$("#txtOTP").val('');
			sessionStorage.setItem('MobileNo', $("#txtMobileNo").val())
			window.location.href = "PatientReport";
		}
		else {
			$('#lblMsg').empty().text('OTP does not match').css('color', 'red');
			$("#txtOTP").val('');
			return false;
		}
	}
	else {
		$('#lblMsg').text('Otp not found').css('color', 'red');
		return false;
	}
}
function SendSMS(mobileno, otp) {
	objBO = {};
	objBO.MobileNo = mobileno;
	objBO.Otp = otp;
	$.ajax({
		method: "POST",
		url: config.baseUrl + '/api/PatientFeedback/PatientLoginOTP',
		data: JSON.stringify(objBO),
		contentType: "application/json;charset=utf-8",
		dataType: "JSON",
		success: function (data) {
			if (data.includes('Sent'))
				$('#lblMsg').empty().text('OTP Sent').css('color','green');
			$("#txtOTP").css('border-color', 'green').focus();
			$("#OTPSection").removeClass('Inactive');
			$("#CredentialSetion").addClass('Inactive');
		},
		error: function (response) {
			$('#lblMsg').empty().text('Server Error...!').css('color', 'red');
		}
	});
}