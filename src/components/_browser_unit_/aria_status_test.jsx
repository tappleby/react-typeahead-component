'use strict';

var React = require('react'),
    ReactDOM = require('react-dom'),
    TestUtils = require('react-dom/test-utils'),
    AriaStatus = require('../aria_status');

describe('AriaStatus', function() {
    describe('#setTextContent', function() {
        it('should set the text content of the component', function() {
            var ariaStatusInstance = TestUtils.renderIntoDocument(
                    <AriaStatus />
                ),
                text = 'this is a test';

            ariaStatusInstance.setTextContent(text);
            expect(ReactDOM.findDOMNode(ariaStatusInstance).textContent).to.equal(text);
        });

        it('should set the text content to an empty string when passed null/undefined', function() {
            var ariaStatusInstance = TestUtils.renderIntoDocument(
                    <AriaStatus />
                );

            [null, undefined].forEach(function(value) {
                ariaStatusInstance.setTextContent(value);
                expect(ReactDOM.findDOMNode(ariaStatusInstance).textContent).to.equal('');
            });
        });
    });
});
