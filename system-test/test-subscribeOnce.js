'use strict';

var PubSub = require('../topics'),
    TestHelper = require('../system-test/helper'),
    assert = require('referee').assert,
    sinon = require('sinon');


describe( 'subscribeOnce method', function() {

    it( 'should return PubSub', function() {
        var func = function(){ return undefined; },
            message = TestHelper.getUniqueString(),
            pubSub = PubSub.subscribeOnce( message , func );
        assert.same( pubSub, PubSub );
    } );

    it( 'must be executed only once', function() {

        var topic = TestHelper.getUniqueString(),
            spy = sinon.spy();
        
        PubSub.subscribeOnce( topic, spy );
        for ( var i = 0; i < 3; i++ ) {
            PubSub.publishSync( topic, TestHelper.getUniqueString() );
        }

        assert( spy.calledOnce );

    } );

} );