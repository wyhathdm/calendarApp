let curMon = 0;
let curYear = 2018;

function loadMon(){

let month = createMonth(curMon, curYear);

for(i = 0; i<42; i++){
    $('#monthName').html(month.name + "  " + month.year);
    $("#day"+i).html(month.month[i]);
}

}

function forward(){
    curMon++;
    if(curMon>11){
        curYear++;
        curMon = 0;
    }
    loadMon();
}

function backward(){
    curMon--;
    if(curMon<0){
        curYear--;
        curMon = 11;
    }
    loadMon();
}

