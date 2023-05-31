
$(document).ready(function () {
	ChandanSpecialists();
	$('#txtSearchSpecialist').on('keyup', function () {
		var val = $(this).val().toLocaleLowerCase();
		$('.docprofile').filter(function () {
			$(this).toggle($(this).find('h5.card-title').text().toLocaleLowerCase().indexOf(val) > -1);
		});				
	});
	//$('#txtSearchSpecialist').on('keyup', function () {
	//	var val = $(this).val().toLocaleLowerCase();
	//	$('.docprofile').filter(function () {
	//		$(this).toggle($(this).find('p.card-text').text().toLocaleLowerCase().indexOf(val) > -1);
	//	});
	//});
});
function ChandanSpecialists() {
    $("#loader").show(); 
	var url =config.baseUrl + "/api/Doctors/Web_DoctorQueries";
	var objBO = {};
	objBO.hosp_id = 'CH01';
	objBO.DeptId = '-';
	objBO.Logic ="BindDorctor_OnWeb";
	$.ajax({
		method: "POST",
		url: url,
		data: JSON.stringify(objBO),
		dataType: "json",
		contentType: "application/json;charset=utf-8",
        success: function (data) {
			//console.log(data)
			var htmlContent = '';
			$('#OurSpecialists').empty();
			$.each(data.ResultSet.Table, function (key, val) {
				htmlContent += '<div class="col-lg-6 docprofile" style="background-color: #d5eeef; border: 1px solid #fff; border-radius: 8px; overflow: hidden; overflow-y: scroll; height: 180px;">';
				htmlContent += '<div class="row">';
				htmlContent += '<div class="col-md-3 manageImg">';
				htmlContent += '<p class="text-center"><img src="' + val.VirtualPhotoPath + '" class="img-circle SpecialityProfile"></p>';
				htmlContent += '</div>';
				htmlContent += '<div class="col-md-9">';
				htmlContent += '<div class="card-body">';
                htmlContent += '<h5 class="card-title">' + val.DoctorName + '</h5>';
				htmlContent += '<p class="card-text"><small class="text-muted">' + val.Degree + '</small></p>';
				htmlContent += '<hr style="border: 1px solid red">';
				htmlContent += '<h5 class="card-title">' + val.Designation + '</h5>';
				htmlContent += '<p class="card-text">' + val.Head + '</p>';
                htmlContent += '<span><a href="/Home/ViewDoctorProfile?DoctorId=' + val.DoctorId + '"  class="btn btn-primary btn-sm pull-right" target="_blank">View Profile</a></span>';
                if (val.opdFlag == 'Y')
                    htmlContent += '<a href="/BookAppoinment/Appointment?DoctorId=' + val.DoctorId + '" class="btn btn-primary btn-sm  pull-right">Book Appointment</a>';
				htmlContent += '</div>';
				htmlContent += '</div>';
				htmlContent += '</div></div>';

			});
			$('#OurSpecialists').append(htmlContent);
		},
		error: function (response) {
			alert('Server Error...!');
        },
        complete: function() {
            $("#loader").hide();
        }
	});
}