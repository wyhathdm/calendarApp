let running = true;
let calDaysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let weekDays = ["Su", "M ", "Tu", "W ", "Th", "F ", "Sa"];
let monthStarts = [4, 0, 0, 3, 5, 1, 3, 6, 2, 4, 0, 2];
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let currentDay = currentDate.getDate();
let currentMonthForStyle = currentDate.getMonth();
let currentYearForStyle = currentDate.getFullYear();

let dataObject = {

    data: [],
    month: [],
    year: [],
    day: []

}

//console.table(month);

function repString(string, amnt) {
    let output = "";
    for (i = 0; i < amnt; i++) {
        output += string;
    }
    return output;
}

function print(text) {
    console.log(text);
}

function countLeapYears(year) {
    return Math.round(
        (year - 1970) / 4
    )
}

function getMonLength(monVal, year) {
    let monthLen = calDaysInMonths[monVal];
    if (monVal == 1 && year % 4 == 0) {
        monthLen = 29;
    }
    return monthLen;
}

let mon;

function displayMonth() {
    mon = createMonth(currentMonth, currentYear);
    document.getElementById("month_Year").textContent = mon.name + (" ") + mon.year;
    if (currentMonthForStyle == mon.value && currentYearForStyle == mon.year) {

        document.getElementById("day" + (currentDay + mon.startDay - 1)).style = "background-color: #83aae6; border-radius: 30%;";
    } else {
        document.getElementById("day" + (currentDay + mon.startDay - 1)).style = "background-color: none; border-color:none;";
    }
    for (i = 0; i < 42; i++) {
        document.getElementById("day" + i).textContent = mon.month[i];
    }
}




function prevMonth() {
    document.getElementById("day" + (currentDay + mon.startDay - 1)).style = "background-color: none; border-color:none;";
    if (currentMonth == 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    displayMonth();
}

function nextMonth() {
    document.getElementById("day" + (currentDay + mon.startDay - 1)).style = "background-color: none; border-color:none;";
    if (currentMonth == 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }

    displayMonth();
}

function createMonth(monVal, year) {

    let month = [];

    for (i = 0; i < 42; i++) {
        month.push(null);
        document.getElementById("day" + i).classList.remove("nonMonth");

    }

    let startDay = monthStarts[monVal];
    let offset = year - 1970;
    offset += countLeapYears(year);
    startDay += offset;
    startDay = startDay % 7;
    let monthLen = getMonLength(monVal, year);
    let monName = monthNames[monVal];
    let prevMonthLen;

    if (monVal == 0) {
        prevMonthLen = getMonLength(11, year - 1);
    } else {
        prevMonthLen = getMonLength((monVal - 1) % 12, year);
    }

    for (i = startDay; i < startDay + monthLen; i++) {
        month[i] = (i - startDay) + 1;
    }

    for (i = monthLen + startDay; i < 42; i++) {
        month[i] = (i - (monthLen + startDay)) + 1;
        document.getElementById("day" + i).classList.add("nonMonth");

    }

    let x = 0;
    while (month[x] == null) {
        month[x] = prevMonthLen - startDay + x + 1;
        document.getElementById("day" + x).classList.add("nonMonth");
        x++;
    }


    //console.table(month, 7);
    //displayMonth(month, monName, monVal, year, startDay, monthLen);
    /*for(i=0; i<42; i++){
        month[i] = null;
    }*/

    return {
        'month': month,
        'name': monName,
        'value': monVal,
        'year': year,
        'startDay': startDay,
        'length': monthLen
    }
}

function dataInput() {

    for (i = 0; i < 42; i++) {
        let inputData = document.getElementById("input" + i).value;
        if (inputData.length < 1) { continue }
        console.log(inputData);
        dataObject.data.push(inputData);
        dataObject.day.push(mon.startDay + i);
        dataObject.month.push(mon.value);
        dataObject.year.push(mon.year);
    }

}
document.getElementById("input0").onblur = function() {
    inputLeaveFocus()
};

function inputLeaveFocus() {

    dataInput();
    dataObject.data = dataObject.data.filter(function(dataLength) {
        return dataObject.data[dataLength].length > 1;

    });
}