
$(document).ready(function () {
	GetcontactUs();
	GetContactDept();
	$('#ddlQueryType').on('change', function () {
		var val = $(this).find('option:selected').text();
		if (val == "HR")
			$('.uploadsection').show();
		else
			$('.uploadsection').hide();
	});
	$('#btnSendQuery').on('click', function () {
		UploadQueryDocument();
	});
});
function GetContactDept() {
	var objBO = {};
	var url = config.baseUrl + "/api/patientfeedback/web_ContactUsQueries";
	objBO.auto_id = 0;
	objBO.Logic = "GetContactDept";
	$.ajax({
		method: "POST",
		url: url,
		data: JSON.stringify(objBO),
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		success: function (data) {
			$('#ddlQueryType').empty().append($('<option></option>').val('0').html('Select'));
			$.each(data.ResultSet.Table, function (key, val) {
				$('#ddlQueryType').append($('<option></option>').val(val.Email).html(val.DeptName));
			});
		},
		error: function (data) {
			alert('server error...!');
		}
	});
}
function GetcontactUs() {
	var url = config.baseUrl + "/api/patientfeedback/web_contactusqueries";
	var objBO = {};
	objBO.auto_id = 0;
	objBO.Logic = 'GetContactInfo';
	$.ajax({
		method: "POST",
		url: url,
		data: JSON.stringify(objBO),
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		success: function (data) {
			var htmldata = "";
			$(".contactInfo").empty();
			$.each(data.ResultSet.Table, function (key, val) {
				htmldata += '<div class="col-md-4 col-sm-6 col-xs-12 team_col">';
				htmldata += '<div class="shadow">';
				htmldata += '<div class="cont_name">' + val.DeptName + '</div>';
				htmldata += '<div class="contactbox">';
				htmldata += '<b>' + val.EmpName + '</b><br>';
				htmldata += '' + val.Designation + '<br>';
				htmldata += '<i class="fa fa-envelope-o" aria-hidden="true">&nbsp;</i>: ' + val.EmailId + '';
				htmldata += '</div>';
				htmldata += '</div>';
				htmldata += '</div>';
			});
			$(".contactInfo").append(htmldata);
		},
		error: function (data) {
			alert('server error...!');
		}
	});
}
function SavePatientFeedback() {
	var url = config.baseUrl + "/api/patientfeedback/Web_InsertPatientFeedback";
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
				clear();
				alert(data);
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
function Validation() {
	var pattern = /^\b[a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,4}\b$/i;
	var querytype = $('#ddlQueryType option:selected').text();
	var email = $('#txtEmail').val();
	var mobile = $('#txtMobile').val();
	var subject = $('#txtSubject').val();
	var message = $('#txtMessage').val();
	var attachment = $('#fileAttach').val();

	if (querytype == 'Select') {
		alert('Please Select Query Type');
		$('#ddlQueryType').css('border-color', 'red').focus();
		return false;
	}
	else {
		$('#ddlQueryType').removeAttr('style');
	}
	if (email == '') {
		alert('Please Provide Email');
		$('#txtEmail').css('border-color', 'red').focus();
		return false;
	}
	else if (!pattern.test(email)) {
		alert('Please Provide Correct Email Address');
		$('#txtEmail').css('border-color', 'red').focus();
		return false;
	}
	else {
		$('#txtEmail').removeAttr('style');
	}
	if (mobile == '') {
		alert('Please Provide Mobile No');
		$('#txtMobile').css('border-color', 'red').focus();
		return false;
	}
	else if ((mobile).length < 10) {
		alert('Mobile No Should be 10 digit.');
		$('#txtMobile').css('border-color', 'red').focus();
		return false;
	}
	else {
		$('#txtMobile').removeAttr('style');
	}
	if (subject == '') {
		alert('Please Enter Subject');
		$('#txtSubject').css('border-color', 'red').focus();
		return false;
	}
	else {
		$('#txtSubject').removeAttr('style');
	}
	if (message == '') {
		alert('Please Provide Message .');
		$('#txtMessage').css('border-color', 'red').focus();
		return false;
	}
	else {
		$('#txtMessage').removeAttr('style');
	}

	return true;
}
function clear() {
	$('input:text').val('');
	$('textarea').val('');
	$('input:file').val('');
}
function UploadQueryDocument() {
	if (Validation()) {
		var url = config.baseUrl + "/api/patientfeedback/UploadQueryDocument";
		var objBO = {};
		// var attachment = document.getElementById('input[id="fileAttach"]');
		objBO.QueryType = $("#ddlQueryType option:selected").text();
		objBO.MailTo = $("#ddlQueryType option:selected").val();
		objBO.EmailId = $('#txtEmail').val();
		objBO.MobileNo = $('#txtMobile').val();
		objBO.Subject = $('#txtSubject').val();
		objBO.Message = $('#txtMessage').val();
		objBO.Attachment = '-';
		objBO.ImageName = (objBO.QueryType == 'HR') ? $('input[id=fileAttach]')[0].files[0].name : '-';
		objBO.Logic = 'Insert'
		var UploadDocumentInfo = new XMLHttpRequest();
		var data = new FormData();
		data.append('obj', JSON.stringify(objBO));
		data.append('imageByte', $('input[id=fileAttach]')[0].files[0]);
		UploadDocumentInfo.onreadystatechange = function () {
			if (UploadDocumentInfo.status) {
				if (UploadDocumentInfo.status == 200 && (UploadDocumentInfo.readyState == 4)) {
					var json = JSON.parse(UploadDocumentInfo.responseText);
					if (json.Message.includes('Success')) {
						clear();
						alert(json.Message);
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
}




