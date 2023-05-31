var PatientId = ''
var PatientName = ''
var toggleType = 'Expand';
var Logic = 'LatestReport';
$(document).ready(function () {
    var mobile = sessionStorage.getItem('MobileNo');
    sessionStorage.setItem('MobileNo', mobile)  
	$("#accordion").on('click', 'button', function () {		
        $(this).find('i').toggleClass('fa-minus-circle');
		var Year = $(this).attr('id');		
		var isShow = $(this).parents('.card-body').find('.collapse').is('.show');
	
        //$(this).parents('#accordion').find('.collapse').removeClass('show');

		if (isShow) {
			$('div[id=' + Year + ']').removeClass('show');
			//$(this).parents('.card').find('.collapse').removeClass('show');
        }
		else {
			$('div[id=' + Year + ']').addClass('show');
			//$(this).parents('.card').find('.collapse').addClass('show');
            DiagnosticBookingOfTheYear(Year);
        }
    });
    YearWiseBlocks();
});

function toggleIcon(e) {
    $(e.target)
        .prev('.card-header')
        .find(".fa fa-plus-circle")
        .toggleClass('glyphicon-plus glyphicon-minus');
}
function YearWiseBlocks() {
    //ShowHideLoader("Show");
	var url = config.ChandanMobileWebApi + "/api/OtherServicesHospital/YearWiseBlocks";
    var objBO = {};
    objBO.UHID = PatientId;
    objBO.MobileNo = sessionStorage.getItem('MobileNo');
    objBO.Logic = Logic;
    $.ajax({
        method: "POST",
        url: url,
        data: JSON.stringify(objBO),
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
		success: function (data) {			
            if (data != '') {
                $('#accordion').html(data);
            }
			else {
				alert('Record Not Found.')
            }        
        },
        complete: function (res) {
            //ShowHideLoader("Hide");
        },
        error: function (response) {
            alert('Server Error...!');
            //ShowHideLoader("Hide");
        }
    });
}
function DiagnosticBookingOfTheYear(Year) {
    //ShowHideLoader("Show");
	var url = config.ChandanMobileWebApi + "/api/OtherServicesHospital/DiagnosticBookingOfTheYear";
    var objBO = {};
    objBO.UHID = PatientId;
    objBO.Year = Year;
    objBO.MobileNo = sessionStorage.getItem('MobileNo');
    objBO.Logic = Logic;
    $.ajax({
        method: "POST",
        url: url,
        data: JSON.stringify(objBO),
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
		success: function (data) {			
            if (data != '') {
                $('#divReports' + Year).html(data);
            }
            else {
            }           
        },
        complete: function (res) {
            //ShowHideLoader("Hide");
        },
        error: function (response) {
            alert('Server Error...!');
            //ShowHideLoader("Hide");
        }
    });
}
function DownloadHISLabReport(visitNo, TestIds) {
    $('#LineLoader').attr("src", '#');
    var loading = "<a href='#' class='btn btn-info btn-sm fa-pdf' ><img width='80' height='5' src='" + config.rootUrl + "/images/loading.gif' />Downloading</a>";
    $("#tdSeg1" + visitNo).html(loading)
	var url = config.ChandanMobileWebApi + "/api/OtherServicesHospital/DownloadHISLabReport";
    var objBO = {};
    objBO.VisitNo = visitNo;
    objBO.TestIds = TestIds;
    objBO.ReportType = "Seg1";
    $.ajax({
        method: "POST",
        url: url,
        data: JSON.stringify(objBO),
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        success: function (data) {          
            var href = "<a href='" + data + "' target='_blank' class='btn btn-success btn-sm'>ViewReport</a>";
            $("#tdSeg1" + visitNo).html(href)
        },
        complete: function (res) {
            //ShowHideLoader("Hide");
        },
        error: function (response) {
            alert('Server Error...!');
            //ShowHideLoader("Hide");
        }
    });
}
function DownloadHISLabReportByLIS(visitNo, TestIds) {
    $('#LineLoader').attr("src", '#');
    var loading = "<a href='#' class='btn btn-info btn-sm fa-pdf' ><img width='80' height='5' src='" + config.rootUrl + "/images/loading.gif' />Downloading</a>";
    $("#tdSeg2" + visitNo).html(loading)
	var url = config.ChandanMobileWebApi + "/api/OtherServicesHospital/DownloadHISLabReportByLIS";
    var objBO = {};
    objBO.VisitNo = visitNo;
    objBO.TestIds = TestIds;
    objBO.ReportType = "Seg2";
    $.ajax({
        method: "POST",
        url: url,
        data: JSON.stringify(objBO),
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        success: function (data) {          
            var href = "<a href='" + data + "' target='_blank' class='btn btn-success btn-sm'>ViewReport</a>";
            $("#tdSeg2" + visitNo).html(href)
        },
        complete: function (res) {
            //ShowHideLoader("Hide");
        },
        error: function (response) {
            alert('Server Error...!');
            //ShowHideLoader("Hide");
        }
    });
}
function query() {
    var vars = [], hash;
    var url = window.location.href.replace('#', '');
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[decodeURIComponent(hash[0])] = decodeURIComponent(hash[1]);
    }
    return vars;
}