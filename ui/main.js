let curMon = 1;
let curYear = 2018;

function loadMon(){

let month = createMonth(curMon, curYear);

for(i = 0; i<42; i++){
    $('#monthName').html(month.name);
    $("#day"+i).html(month.month[i]);
}

}

$("#fwdBtn").click(function(){
    alert("hi");
    curMon++;
    loadMon();
});

