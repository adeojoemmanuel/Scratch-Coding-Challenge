# Scratch-Coding-Challenge

- set up 

	1) `git clone https://github.com/adeojoemmanuel/Scratch-Coding-Challenge.git`

	2) `cd Scratch-Coding-Challenge`

	3) `npm install`

- serve project 

	`node server`

	POST http://127.0.0.1:4000/api/v1/businessDates/getBusinessDateWithDelay

	payload 

	`{
	  "initialDate": "2019-06-06T10:10:10Z",
	  "delay": 4
	}`

	expected response

	`{
	    "ok": true,
	    "initialQuery": {
	        "initialDate": "2019-06-06T10:10:10Z",
	        "delay": 4
	    },
	    "results": {
	        "businessDate": "2019-06-13T10:10:10.000Z",
	        "totalDays": 7,
	        "holidayDays": 0,
	        "weekendDays": 2
	    }
	}`

	POST http://127.0.0.1:4000/api/v1/businessDates/isBusinessDay

	payload

	`{
	  "Date": "2019-06-09T10:10:10Z"
	}`

	expected output

	false

- run test

	`npm test`
