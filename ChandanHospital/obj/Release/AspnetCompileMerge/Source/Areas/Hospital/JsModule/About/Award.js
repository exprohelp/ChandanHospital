$(document).ready(function () {
	GetWebAwardInfo();
});
function GetWebAwardInfo() {
	$(".AwardInfo").empty();
	var url = config.baseUrl  + "/api/Career/WebAwardQueries";
	var objBO = {};
	objBO.auto_id = 0;
	objBO.Logic = 'AwardInfoForWeb';
	$.ajax({
		method: "POST",
		url: url,
		data: JSON.stringify(objBO),
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		success: function (data) {
			//console.log(data)		
			var htmldata = "";		
			$.each(data.ResultSet.Table, function(key,val) {
				htmldata += "<div class='col-md-2'>";
				htmldata += "<div class='award'>";
				htmldata += "<h3>" + val.AwardName + "</h3>";
				htmldata += "<a href=" + val.FilePath + " title='" + val.AwardName + "' style='width:193px;height:125px;'>";
				htmldata += "<img src='" + val.FilePath + "'/>";
				htmldata += "</a>";
				htmldata += "</div>";
				htmldata += "</div>";		
			});
			$(".AwardInfo").append(htmldata);
			$('.award').magnificPopup({
				delegate:'a',
				type:'image',
				closeOnContentClick: false,
				closeBtnInside: false,
				mainClass: 'mfp-with-zoom mfp-img-mobile',				
				image: {
					verticalFit: true
				},
				zoom: {
					enabled: true,
					duration: 300 ,// don't foget to change the duration also in CSS
					opener: function (element) {
						return element.find('img');
					}
				}
			});
		},
		error: function (data) {
			alert('Server Error...!');
		}
	});
}
