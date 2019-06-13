const express = require('express');
const router = express.Router();
var moment = require('moment');


// routes
router.post('/getBusinessDateWithDelay', getBusinessDateWithDelay);
router.post('/isBusinessDay', isBusinessDay);
// router.get('/:id', isBusinessDayg);

module.exports = router;

function addDays(theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
}


function getWeekendDatesCount( d0, d1 ){
  var ndays = 1 + Math.round((d1.getTime()-d0.getTime())/(24*3600*1000));
  var nsaturdays = Math.floor( (d0.getDay()+ndays) / 7 );
  return 2*nsaturdays + (d0.getDay()==0) - (d1.getDay()==6);
}

function getworkdaycount(startDate,endDate) {
    var lastDay = moment(endDate);
    var firstDay = moment(startDate);
    let calcBusinessDays = 1 + (lastDay.diff(firstDay, 'days') * 5 -
      (firstDay.day() - lastDay.day()) * 2) / 7;

    if (lastDay.day() == 6) calcBusinessDays--;//SAT
    if (firstDay.day() == 0) calcBusinessDays--;//SUN

    return calcBusinessDays;
}

var addWeekdays =  module.exports.addWeekdays = function(date, days) {
  date = moment(date); // use a clone
  while (days > 0) {
    date = date.add(1, 'days');
    // decrease "days" only if it's a weekday.
    if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
      days -= 1;
    }
  }
  return date;
}

function getHolidayCount(startDate,endDate){
	var holidayArray2019 = [new Date('2019-01-01'),new Date('2019-01-21'),new Date('2019-02-18'),new Date('2019-05-27'),new Date('2019-06-06'),new Date('2019-06-04'),new Date('2019-09-02'),new Date('2019-10-14'),new Date('2019-11-11'),new Date('2019-11-28'),new Date('2019-12-25')];
	var holidayCOunt = 0;
	for (var m = moment(startDate); m.isBefore(endDate); m.add(1, 'days')) {
	  for (var i = 0; i < holidayArray2019.length; i++) {
        if (m.format('YYYY-MM-DD') == holidayArray2019[i]) {
            holidayCOunt++
        }
      }
	}
	return holidayCOunt
}


function getBusinessDateWithDelay(req, res, next) {
	const initialDate = addDays(new Date(req.body.initialDate), 1);
	const delay = req.body.delay;
	var stopDate = addDays(initialDate, delay);
	var expdate = addWeekdays(initialDate, delay);
	var weekendDayCount = getWeekendDatesCount(initialDate, stopDate);
	var getHolidaycount = getHolidayCount(initialDate, addDays(stopDate, weekendDayCount));
	var weekdayCount = getworkdaycount(initialDate, addDays(stopDate, weekendDayCount));
	var payday = addDays(initialDate, weekdayCount);
	var Eexpdate = moment(expdate).subtract(getHolidaycount, 'day');
	var totaldaycount = getHolidaycount+weekendDayCount+weekdayCount;
	
    res.json({
	  "ok": true,
	  "initialQuery": req.body,
	  "results": {
	    "businessDate": Eexpdate,
	    "totalDays": totaldaycount,
	    "holidayDays": getHolidaycount,
	    "weekendDays": weekendDayCount
	  }
	})
}

function isBusinessDay(req, res, next) {
	const iDate = new Date(req.body.Date);
    var day = iDate.getDay();
	if((day === 6) || (day === 0)){ 
    	res.json(false)
    }else{
    	res.json(true)
    }
}

