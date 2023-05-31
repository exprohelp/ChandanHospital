
$(function () {
	AboutMenuList();
	$(document).ajaxStart(function () {		
		$('#mydiv').show();
		$('#wrapper').addClass('disablepage');
	}).ajaxSuccess(function () {
		$('#mydiv').show();
		$('#wrapper').addClass('disablepage');
	}).ajaxStop(function () {
		$('#mydiv').hide();
		$('#wrapper').removeClass('disablepage');
	});
	BindNews();
});
function AboutMenuList() {
	var li = '';
	li += '<li><a href="chairman-desk">Chairman`s Desk</a></li>';
	li += '<li><a href="mission">Mission</a></li>';
	li += '<li><a href="milestone">Milestones</a></li>';
	li += '<li><a href="quality-and-accreditations">Quality & Accreditations </a></li>';
	li += '<li><a href="affiliation">Affiliation</a></li>';
	li += '<li><a href="awards">Awards</a></li>';
	li += '<li><a href="about-chandan-group">Chandan Group</a></li>';
	li += '<li><a href="about-chandan-hospital">Chandan Hospital</a></li>';
	$('#ulAboutMenuList').append(li);
}
function SetSlidHeading(name) {
	$('#hPageHeading').text(name);
	$('#liPageHeading').text(name);
}

function BindNews() {

	$.ajax({
		type: "POST",
		url: "common.aspx/GetNews",
		data: '{}',
		contentType: "application/json; charset=utf-8",
		datatype: "jsondata",
		global: false,
		beforeSend: function () {
			$('#mydiv').hide();
		},
		success: function (data) {
			$("#divnews").empty();
			if (data.d.length > 0) {
				$("[id*=divnews]").empty();
				$("[id*=divnews]").append('<marquee id="marquee1" behavior="scroll" direction="up" scrollamount="2" onMouseOver="this.stop()" onMouseOut="this.start()" height="150">');
				if (data.d.length > 0) {
					for (var i = 0; i < data.d.length; i++) {

						$('#marquee1').append('<p class="about">'
							+ '<a href="#" data-toggle="modal" data-target="#mdlnews" onClick="NewsDetails(\'' + data.d[i].heading + '\',\'' + data.d[i].para1 + '\',\'' + data.d[i].para2 + '\',\'' + data.d[i].para3 + '\');">' + data.d[i].heading + '</a></p>');

					}
				}
			}
		},
		error: function (jqXHR, exception) {
			//getErrorMessage(jqXHR, exception);
		}
	});
}


function NewsDetails(heading, para1, para2, para3) {
	$("#lnlheading").text(heading);
	$("#divcontentnews").html("<p>" + para1 + "</p><p>" + para2 + "</p><p>" + para3 + "</p>");
}


