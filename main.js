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

//console.table(month);

function repString(string, amnt){
    let output = "";
    for(i = 0; i<amnt; i++){
        output+=string;
    }
    return output;
}

function print(text){
    console.log(text);
}

function countLeapYears(year){
    return Math.round(
        (year-1970)/4
    )
}

function getMonLength(monVal, year){
    let monthLen = calDaysInMonths[monVal];
    if(monVal == 1 && year%4 == 0){
        monthLen = 29;
    }
    return monthLen;
}

function displayMonth(mon, name, monVal, year, startDay, monLength){
    print(
        repString(" ", 6) + name + " " + year
    );

    let wklist = "  ";
    for(wkday in weekDays){
        wklist += wkday + "  ";
    }
    print(wklist);
}

function popArray(monVal, year){
    let startDay = monthStarts[monVal];
    let offset = year-1970;
    offset += countLeapYears(year);
    startDay += offset;
    startDay = startDay % 7;
    let monthLen = getMonLength(monVal, year);
    let monName = monthNames[monVal];
    let prevMonthLen;

    if(monVal == 0){
        prevMonthLen = getMonLength(11, year - 1);
    }
    else{
        prevMonthLen = getMonLength((monVal-1)%12, year);
    }

    for(i=startDay; i<startDay+monthLen; i++){
        month[i] = (i-startDay)+1;
    }

    for(i=monthLen+startDay; i<42; i++){
        month[i] = (i-(monthLen+startDay))+1;
    }

    let x = 0;
    while(month[x] == null){
        month[x] = prevMonthLen-startDay+x+1;
        x++;
    }

    
    console.table(month, 7);
}

popArray(0, 2018);

