$(document).ready(function () {
    GetPackageInfo();
});
function GetPackageInfo() {
    $(".packageInfo").empty();
    var url = config.baseUrl + "/api/Career/WebAwardQueries";
    var objBO = {};
    objBO.auto_id = 0;
    objBO.Logic = 'GetPackageInfo';
    $.ajax({
        method: "POST",
        url: url,
        data: JSON.stringify(objBO),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            //console.log(data)		
            var htmldata = "";
            $.each(data.ResultSet.Table, function (key, val) {
                htmldata += "<div class='col-lg-3 col-xs-12 col-sm-12'>";             
                htmldata += "<div class='packOuter'>";             
                htmldata += "<div class='packages'>";             
                htmldata += "<label class='packageName'>" + val.packagename + "</label><br>";                    
                htmldata += "<button onclick=ShowPackage(this) data-packcode='" + val.packagecode+"' class='btn btn-warning btn-xs'><i class='fa fa-hand-pointer-o'>&nbsp;</i>Test Inclusion</button>";       
                htmldata += "<label class='amount'>Rs. " + val.netcost+"</label>";                     
                htmldata += "</div>";         
                htmldata += "</div>";         
                htmldata += "</div>";         
            });
            $(".packageInfo").append(htmldata);            
        },
        error: function (data) {
            alert('Server Error...!');
        }
    });
}
function ShowPackage(elem) {      
    $('#listPackage').empty();    
    //var url = config.baseUrl + "/api/Diagnostic/PackageOrTestIncludedTest";
    var url = "https://exprohelp.com/ChandanMobileWebApi/api/Diagnostic/PackageOrTestIncludedTest";
    var objBO = {};
    var packageName = $(elem).closest('.packages').find('.packageName').text();
    objBO.TestCode = $(elem).data('packcode');
    $.ajax({
        method: "POST",
        url: url,
        data: JSON.stringify(objBO),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            console.log(data)
            if (Object.keys(data.dataSet).length > 0) {
                var list = "";
                var type = "";
                var count = 0;
                if (Object.keys(data.dataSet.Table).length > 0) {
                    $.each(data.dataSet.Table, function (key, val) {
                        count++;
                        if (type != val.TypeName) {
                            list += "<li style='background:#ddd'>" + val.TypeName + "</li>";
                            type = val.TypeName;
                        }
                        list += "<li>" + val.Name + "</li>";
                    });                  
                    $("#lblPackage").text(packageName);                    
                    $("#listPackage").append(list);                    
                    $("#modelPackage").modal('show');  
                }
            }
        },
        error: function (response) {
            alert('Server Error...!');
        }
    });
}