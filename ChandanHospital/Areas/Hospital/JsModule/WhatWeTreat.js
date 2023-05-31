$(document).ready(function () {
    var DeptId = query()['DeptId'];
	var Prm1 = query()['Prm1'];
    WhatweTreat(DeptId,Prm1);  
});

function WhatweTreat(DeptId,Prm1) {		
	var url = config.baseUrl + "/api/Doctors/Web_DoctorQueries";
    var objBO = {};
    objBO.Prm1 = Prm1;
    objBO.DeptId = DeptId;
	objBO.Logic ="GetWhatWeTreat";   
    $.ajax({
        method:"POST",
        url: url,
        data: JSON.stringify(objBO),
        dataType:"json",
        contentType: "application/json;charset=utf-8",
        success:function(data) {
           console.log(data);
			var htmlcontent = "";
            $("#divWhatWeTreat").empty();
            $.each(data.ResultSet.Table, function (key,val) {               
				$("#lbldeptname").text(val.dept_name);             
                htmlcontent += '<h3 class="text-center">' + val.MediaLink+'</h3>';
                if (val.ImgPosition == "Top") {
                    if(val.ImgUrl != "") {                       
                        htmlcontent += '<img src= ../'+ val.ImgUrl + ' /> <br />';
                        htmlcontent += '<p style="font-size:14px">' + val.Description + '</p> <br />';
                    }
                }
                else {
                    htmlcontent += '<p style="font-size:14px">' + val.Description + '</p>';
                    if (val.ImgUrl != "") {
                        htmlcontent += '<img src= ../' + val.ImgUrl + ' /> <br />';
                    }
                }
            });
            $("#divWhatWeTreat").append(htmlcontent);           
        },
        error:function (response) {
            alert("Error while Getting Media");
        }
    });
}