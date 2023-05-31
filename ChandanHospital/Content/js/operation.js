

function GetJobInfo(value) {
    document.getElementById("jobinfo").innerHTML = value;
     $.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: 'career.aspx/GetJobInfo',
        data: '{jobinfo:' + JSON.stringify(value) + '}',
        success: function (data) {
        document.getElementById("jobinfo").innerHTML = value;
         
        }
    });
}
   