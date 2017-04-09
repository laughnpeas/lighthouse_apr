function calculateDayInYear(date) {
  var splitDate = date.split('/');
  var year = Number(splitDate[0]);
  var month = Number(splitDate[1]);
  var day = Number(splitDate[2]);
  var febDays = daysInFeb(year);
  var DAYS_IN_MONTH = [31, febDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // console.log("Year: " + year +" | month: "+month+" | day: "+day);
  if (year && validMonth(month) && validDay(month, day)) {
    console.log(date, "is day", calculateDayNumber(month, day), "of the year", year);
  } else {
    console.log("Invalid date");
  }

  function validMonth(month) {
    // console.log("Valid Month : " + (month && month >= 1 && month <= 12));
    return month && month >= 1 && month <= 12;
  }

  function validDay(month, day) {
    // console.log("DAYS_IN_MONTH[month]: " + DAYS_IN_MONTH[month - 1]);
    // console.log("Valid Day: " + (day && day >= 1 && day <= DAYS_IN_MONTH[month - 1]));
    return day && day >= 1 && day <= DAYS_IN_MONTH[month - 1];
  }

  function calculateDayNumber(month, day) {
    var dayOfYear = 0;

    // console.log("day: "+day);
    for (var i = 1; i < month; i++) {
      dayOfYear += DAYS_IN_MONTH[i - 1];
      // console.log("dayOfYear: " + dayOfYear);
    }
    dayOfYear += day;
    return dayOfYear;
  }

  function daysInFeb(year) {
      return (isLeapYear(year)? 29 : 28);
  }

  function isLeapYear(year) {
    return isMultiple(year, 400) || !isMultiple(year, 100) && isMultiple(year, 4);
  }
}

function isMultiple(numerator, denominator) {
  return numerator % denominator === 0;
}

var date = process.argv[2];

if (!date) {
  console.log("Please provide a date in the format YYYY/MM/DD");
} else {
  calculateDayInYear(date);
}
