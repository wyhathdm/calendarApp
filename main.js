let running = true;
let calDaysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let weekDays = ["Su","M ","Tu","W ","Th","F ","Sa"];
let monthStarts = [4,0,0,3,5,1,3,6,2,4,0,2];

let events = []

let month = [];

for(i=0; i<42; i++){
    month.push(null);
}

console.table(month);

function repString(string, amnt){
    let output = "";
    for(i = 0; i<amnt; i++){
        output+=string;
    }
    return output;
}

function countLeapYears(year){
    return Math.round(
        (year-1970)/4
    )
}

