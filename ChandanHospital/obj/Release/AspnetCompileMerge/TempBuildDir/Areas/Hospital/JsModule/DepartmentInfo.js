$(document).ready(function () {
    var DeptId = sessionStorage.getItem('DeptId');  
    GetDoctorProfile(DeptId);
    GetDoctorInfo(DeptId);
    $('#WhatWeTreatDetails').on('click','#MediaLink',function () {
        var DeptId = $(this).data('deptid');
		var Prm1 = $(this).data('autoid');
		WhatweTreat(DeptId,Prm1);
	});
	$(document).on('click', 'span.moreDesc', function () {
		var Description = $(this).data('desc');
		$('#modalDescription .modal-body').html('<p>' + Description+'</p>');
		$('#modalDescription').modal('show');
	});
});
function GetDoctorProfile(DeptId) {		
	var url = config.baseUrl + "/api/Doctors/Web_DoctorQueries";
    var objBO = {};
    objBO.hosp_id ='CH01';
    objBO.DeptId = DeptId;
	objBO.Logic = "GetDepartmentProfileandDoctors";
    $.ajax({
        method:"POST",
        url: url,
        data: JSON.stringify(objBO),
        dataType:"json",
        contentType:"application/json;charset=utf-8",
        success: function (data) {
            //console.log(data)
            $.each(data.ResultSet.Table,function (key, val) {
                $('#hPageHeading').text(val.dept_name);
                $('#dept_name').text(val.dept_name);
                $('#about_department').html(val.about_department);
            });
			$('#DoctorsDetails').empty();
            var DoctorProfile = '';
            $.each(data.ResultSet.Table1, function (key,val) {
                DoctorProfile += '<div class="row">'
                DoctorProfile += '<div class="card-columns">';
                DoctorProfile += '<div class="card">';
                DoctorProfile += '<div class="col-md-2 manageImage">';
                DoctorProfile += '<img src="' + val.VirtualPhotoPath + '" style="width:150px; height: 150px" class="img-circle profileimg" />';
                DoctorProfile += '</div>';
                DoctorProfile += '<div class="col-md-10">';
                DoctorProfile += '<div class="card-body">';
				DoctorProfile += '<h5 class="card-title">' + val.Doctor_Name + '</h5>';
                DoctorProfile += '<p class="card-text"><small class="text-muted">' + val.Degree + '</small></p>';
                DoctorProfile += '<hr />';
                DoctorProfile += '<h5 class="card-title">' + val.Designation + '</h5>';
                DoctorProfile += '<p class="card-text">' + val.Head + '</p>';
                DoctorProfile += '<span><a href="/Home/ViewDoctorProfile?DoctorId='+ val.DoctorId +'" class="btn btn-primary btn-sm pull-right">View Profile</a></span>';
                if(val.opdFlag == 'Y')
                    DoctorProfile += '<a href="/BookAppoinment/Appointment?DoctorId=' + val.DoctorId+'" class="btn btn-primary btn-sm  pull-right">Book Appointment</a>';
                DoctorProfile += '<br/>';
                DoctorProfile += '</div>';
                DoctorProfile += '</div>';
                DoctorProfile += '</div>';
                DoctorProfile += '</div>';
                DoctorProfile += '</div>';
            });
            $('#DoctorsDetails').append(DoctorProfile);
			$('#WhatWeTreatDetails').empty();
            var whatWeTreat ='';
            var Media ='';
            $.each(data.ResultSet.Table2, function (key, val) {
                if (val.TagName == "MEDIA") {                    
					if (val.MediaType == "video") {		
						var desc = "";
						var len = val.TagDescription.length;
						if (eval(len) > 164)
							desc = "<p>" + $(val.TagDescription).text().substring(0, 150) + "..<span data-desc='" + val.TagDescription+"' class='moreDesc'>View More</span></p>";							
						else
							desc = val.TagDescription;
						Media += "<div class='col-md-3'>";
						Media += "<div class='award'>";
						Media += "<h3>" + desc + "</h3>";
						Media += "<a href=" + val.MediaLink + " style='width:193px;height:125px;'>";
						Media += "<iframe src='" + val.MediaLink + "' allowfullscreen ></iframe>";
						Media += "</a>";
						Media += "</div>";
						Media += "</div>";	 

      //                  Media += '<iframe style="width:100%; height: 150px;" src="' + val.MediaLink + '" allowfullscreen ></iframe>';
						//Media += '<p>' + val.Doctor_Name + '</p>';
                    }
					else {
						var desc = "";
						var len = val.TagDescription.length;
						if (eval(len) > 164)
							desc = "<p>" + $(val.TagDescription).text().substring(0, 150) + "..<span data-desc='" +val.TagDescription+ "' class='moreDesc'>View More</span></p>";													
						else
							desc = val.TagDescription;
						Media += "<div class='col-md-3'>";
						Media += "<div class='award'>";
						Media += "<h3>" + desc + "</h3>";
						Media += "<a href=" + val.MediaLink + " style='width:193px;height:125px;'>";
						Media += "<img src='" + val.MediaLink + "'/>";
						Media += "</a>";
						Media += "</div>";
						Media += "</div>";	                      
                    }                   
                }
                if (val.TagName == "WHATWETREAT")
                    whatWeTreat += '<a class="btn btn-outline-success btnborder" href="#" id="MediaLink" data-autoid="' + val.autoId + '" data-deptid="' + val.DeptId + '" data-medialink="' + val.MediaLink + '">' + val.MediaLink + '</a>';
            });
            $('#WhatWeTreatDetails').append(whatWeTreat);
			$('#MediaDetails').append(Media);
			$('.award').magnificPopup({
				delegate: 'a',
				type: 'image',
				closeOnContentClick: false,
				closeBtnInside: false,
				mainClass: 'mfp-with-zoom mfp-img-mobile',
				image: {
					verticalFit: true
				},
				zoom: {
					enabled: true,
					duration: 300,// don't foget to change the duration also in CSS
					opener: function (element) {
						return element.find('img');
					}
				}
			});
        },
        error: function (response) {
            alert('Server Error...!');
        }
    });
}

function GetDoctorInfo(DeptId) {
    var url = config.baseUrl + "/api/Doctors/Web_DoctorQueries";
    var objBO = {};
    objBO.hosp_id = 'CH01';
    objBO.DeptId = DeptId;
    objBO.Logic = "BindDorctor_OnWeb";
    $.ajax({
        method: "POST",
        url: url,
        data: JSON.stringify(objBO),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
           //console.log(data)
        },
        error: function (response) {
			alert('Server Error...!');
        }
    });
}
function WhatweTreat(DeptId, Prm1) {
	$("#lbldeptname").text('');
	$("#lblmedialink").text('');
	var url = config.baseUrl + "/api/Doctors/Web_DoctorQueries";
    var objBO = {};
    objBO.Prm1 = Prm1;
    objBO.DeptId = DeptId;
    objBO.Logic = "GetWhatWeTreat";  
    $.ajax({
        method:"POST",
        url: url,
        data: JSON.stringify(objBO),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            console.log(data);
            var htmlcontent = "";
            $("#divcontent").empty();
			$.each(data.ResultSet.Table, function (key, val) {
				$("#lbldeptname").text(val.dept_name);
				$("#lblmedialink").text(val.MediaLink);
				if (val.ImgPosition == "Top") {
					if (val.ImgUrl != "") {
						htmlcontent += '<img src= ../' + val.ImgUrl + ' /> <br />';
						htmlcontent += '<p style="font-size:14px">' + val.Description + '</p> <br/>';
					}
				}
				else {
					htmlcontent += '<p style="font-size:14px">' + val.Description + '</p>';
					if (val.ImgUrl != "") {
						htmlcontent += '<img src= ../' + val.ImgUrl + ' /> <br />';
					}
				}
			});
            $("#divcontent").append(htmlcontent);
			$("#modalRegister").modal('show');
        },
        error: function (response) {
            alert("Error while Getting Media");
        }
    });
}