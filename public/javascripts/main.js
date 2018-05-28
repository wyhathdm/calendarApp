// let running = true;
let calDaysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// let weekDays = ["Su", "M ", "Tu", "W ", "Th", "F ", "Sa"];
let monthStarts = [4, 0, 0, 3, 5, 1, 3, 6, 2, 4, 0, 2];
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let currentDay = currentDate.getDate();
let currentMonthForStyle = currentDate.getMonth();
let currentYearForStyle = currentDate.getFullYear();
let month_Year;
let day;

let navOpen = false;

let pinNav = false;

let events = [];

// let dataObject = {

/*
 *     data: [],
 *     month: [],
 *     year: [],
 *     day: []
 */

// }


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
    month_Year = document.getElementById("month_Year");
    month_Year.textContent = mon.name + (" ") + mon.year;
    if (currentMonthForStyle == mon.value && currentYearForStyle == mon.year) {

        document.getElementById("day" + (currentDay + mon.startDay - 1)).style = " border:solid 2px rgba(240,100,73,0.75);";
    }

    for (let i = 0; i < 42; i++) {
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
    if (year < 1970) {
        currentYear = 1970;
        currentMonth = 0;
    }
    let month = [];
    //reset disabled and classes
    for (let i = 0; i < 42; i++) {
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

    for (let i = startDay; i < startDay + monthLen; i++) {
        month[i] = (i - startDay) + 1;
    }
    //after numbers
    for (let i = monthLen + startDay; i < 42; i++) {
        month[i] = (i - (monthLen + startDay)) + 1;

        document.getElementById("day" + i).classList.add("nonMonth");
    }
    //before numbers
    let x = 0;
    while (month[x] == null) {
        month[x] = prevMonthLen - startDay + x + 1;
        // console.log(x);
        document.getElementById("day" + x).classList.add("nonMonth");
        x++;
    }


    return {
        'month': month,
        'name': monName,
        'value': monVal,
        'year': year,
        'startDay': startDay,
        'length': monthLen
    }
}


// Open Modal

$(".day").on('click', function(ev) {
    if (!$(this).hasClass("nonMonth")) {
        day = this;
        tagClick(ev);
    }
    // $(this).off('click');

    //alert(navOpen);
});
let screenSize = screen.width;

function tagClick() {

    let sideNav = document.getElementById("mySidenav");
    let mainBody = document.getElementById("main");
    //let h1Contain = document.getElementsByClassName("h1-container");
    let monthyear = document.getElementById("month_Year");


    if (navOpen && !pinNav) {
        navOpen = false;
        document.getElementById("mySidenav").style.width = "100%";
        document.getElementById("main").style.marginLeft = "0";
    } else if (!navOpen) {
        if (screenSize < 1025) {
            document.getElementById("mySidenav").style.transform = "translateX(0%)";

            navOpen = true;
            sideNav.style.width = "100%";

        } else {
            sideNav.style.width = "50%";
            mainBody.style.marginLeft = "50%";
            navOpen = true;
            console.log("AHH");
        }
    }
    if (day.textContent == currentDay && monthyear.textContent == monthNames[currentMonthForStyle] + " " + currentYear) {
        document.getElementById("modalDayText").textContent = "Set Event for " + "Today";
    } else {
        document.getElementById("modalDayText").textContent = "Set Event for the " + day.textContent + numEnd(day.textContent) + " of " + monthyear.textContent;
    }
}

//sidenav close
function closeNav() {
    if (!pinNav) {

        if (screenSize < 1025) {
            document.getElementById("mySidenav").style.transform = "translateX(-100%)";

        }
        navOpen = false;
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    }
}

function numEnd(num) {
    let digit = num.substr(num.length - 1);
    if (digit == 1) {
        if (num.substr(num.length - 2) == 11) {
            return "th";
        }

        return "st";
    } else if (digit == 2) {
        if (num.substr(num.length - 2) == 12) {
            return "th";
        }
        return "nd";
    } else if (digit == 3) {
        if (num.substr(num.length - 2) == 13) {
            return "th";
        }
        return "rd"
    } else {
        return "th";
    }
}


$(document).keydown(function(event) {
    if (!$("input").is(':focus')) {
        if (event.which == 39) {
            nextMonth();
        } else if (event.which == 37) {
            prevMonth();
        }
    }
});


$(".thumbbtn").click(function() {
    pinNav = !pinNav;
    if (pinNav) {
        $(".thumbbtn").css("color", "yellow");
    } else {
        $(".thumbbtn").css("color", "white");
    }
});

$(".closebtn").click(function() {
    closeNav();
});

$("body").ready(function() {
    displayMonth();
});


function submitEvent() {
    let eventData = {
        'name': $(".eventName").val(),
        'location': $(".locVal").val(),
        'colour': $("colorSelect").val(),
        'day': day.textContent,
        'monthYear': month_Year.textContent,
        'time': {
            'start': {
                'num': $(".startTime").val()
            }
        },
        'end': {
            'num': $(".endTime").val()
        }
    }
    return eventData;
}


colorPicker = document.getElementById("colorSelect");
//colorPicker.addEventListener("input", updateFirst, false);
colorPicker.addEventListener("change", watchColorPicker, false);

function watchColorPicker(event) {
    document.querySelectorAll("p").forEach(function(p) {
        p.style.color = event.target.value;
    });
}



$(".submit").click(function(event) {
    //event.preventDefault();
    curEV = submitEvent();
    events.push(curEV);
    //console.log(events);
    $.post("submitForm", curEV);
    //alert(JSON.stringify(events));
    $("input").not(".submit").val("");
});

// $(".submit").submit(function(event) {
//     alert("Handler for .submit() called.");
//     event.preventDefault();
// });