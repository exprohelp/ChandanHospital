$(document).ready(function () {
    var AppSuccess = sessionStorage.getItem('AppSuccess');   
    if (AppSuccess!=null) {
        $.each(JSON.parse(AppSuccess), function (key, val) {
            $('#lblAppId').text(val.AppId);
            $('#lblHospitalname').text(val.hospName);
            $('#lblDepartmentName').text(val.DeptName);
            $('#lblPatientName').text(val.FName);
            $('#lblDoctors').text(val.DocName);
            $('#lblDocId').text(val.DocId);
            $('#lblAppitmentTime').text(val.Date+' '+val.ToTime);
            sessionStorage.removeItem('AppSuccess')
        });
    }
    else { 
        sessionStorage.removeItem('AppSuccess')
        window.location.href = 'BookSchedule';
    }
});

function printDiv(divId, Receipt) {
    let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150,border=1');
    mywindow.document.write(`<html><head><title>${Receipt}</title>`);
    mywindow.document.write('<style type="text/css">.table > tbody > tr > td, .table > tbody > tr > th, .table > tfoot > tr > td, .table > tfoot > tr > th, .table > thead > tr > td, .table > thead > tr > th {' +
        'padding: 5px !important; text-align: left;}th {background-color: #5bc0de;}.logoheight {max-height: 68px;max-width: 100px;}p {text-align:left;}td > p > b > span {margin-left:10%;}</style >');
    mywindow.document.write('</head><body >');
    mywindow.document.write(document.getElementById(divId).innerHTML);
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
    mywindow.close();
    return true;
}
