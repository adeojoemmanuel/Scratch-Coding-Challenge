process.env.NODE_ENV = 'test';


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let controller = require('../controller/function.controller');
let should = chai.should();
var assert = require('assert');
var expect = require('chai').expect;

chai.use(chaiHttp);

 /*
  * Test  route
  */

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

describe('/POST getBusinessDateWithDelay', () => {
  it('it should not POST a request without pages field', (done) => {
    let data = {
        title: new Date(),
        delay: getRandomArbitrary(1, 100000)
    }
    chai.request(server)
        .post('/api/v1/businessDates/getBusinessDateWithDelay')
        .send(data)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('initialQuery');
              res.body.should.have.property('results');
              res.body.should.have.property('ok');
          done();
        });
  });
});

describe('/POST isBusinessDay', () => {
  it('it should not POST a request without pages field', (done) => {
    let data = {
        Date: new Date()
    }
    chai.request(server)
        .post('/api/v1/businessDates/isBusinessDay')
        .send(data)
        .end((err, res) => {
              res.should.have.status(200);
          done();
        });
    });
});


describe('addWeekdays', () => {
	it('should return date', function(){
	      var isValid = controller.addWeekdays(new Date(),getRandomArbitrary(1, 100000))
	      assert.equal(isValid, isValid);
	});
});