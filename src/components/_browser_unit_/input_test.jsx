'use strict';

var React = require('react'),
    ReactDOM = require('react-dom'),
    TestUtils = require('react-dom/test-utils'),
    Input = require('../input');

describe('Input', function() {
    describe('#componentDidUpdate', function() {
        var node, inputElement, inputInstance;

        it('should remove the `dir` attribute if re-rendered with a null/undefined value', function(done) {
            var div = document.createElement('div');
            var inputInstance = ReactDOM.render(<Input dir='rtl' />, div);
            var node = ReactDOM.findDOMNode(inputInstance);

            var values = [null, undefined];
            values.forEach(function(value, i) {
                ReactDOM.render(<Input dir={value} />, div, function () {
                    expect(node.hasAttribute('dir')).to.be.false;

                    if (i === values.length-1) {
                        done();
                    }
                });
            });
        });

        it('should not remove the `dir` attribute if re-rendered with a legit value', function(done) {
            var div = document.createElement('div');
            var inputInstance = ReactDOM.render(<Input dir='rtl' />, div);
            var node = ReactDOM.findDOMNode(inputInstance);

            ReactDOM.render(<Input dir='ltr' />, div, function () {
                expect(node.hasAttribute('dir')).to.be.true;
                done();
            });
        });
    });

    describe('#handleChange', function() {
        it('should call `onChange` if the input value did change', function() {
            var handleChange = sinon.spy(),
                inputInstance = TestUtils.renderIntoDocument(
                    <Input
                        value='ezequiel'
                        onChange={handleChange}
                    />
                );

            inputInstance.handleChange({
                target: {
                    value: 'ezequiel rodriguez'
                }
            });

            expect(handleChange).to.have.been.called.once;
        });

        it('should not call `onChange` if the input value did not change', function() {
            var handleChange = sinon.spy(),
                inputInstance = TestUtils.renderIntoDocument(
                    <Input
                        value='ezequiel'
                        onChange={handleChange}
                    />
                );

            inputInstance.handleChange({
                target: {
                    value: 'ezequiel'
                }
            });

            expect(handleChange).to.have.not.been.called;
        });

        it('should pass the event object to `onChange`', function() {
            var handleChange = sinon.spy(),
                inputInstance = TestUtils.renderIntoDocument(
                    <Input
                        value='ezequiel'
                        onChange={handleChange}
                    />
                ),
                eventData = {
                    target: {
                        value: 'ezequiel rodriguez'
                    }
                };

            // We cannot use TestUtils here, as it passes a full-fledged
            // SyntheticEvent to `handleChange`, which is difficult to test against.
            inputInstance.handleChange(eventData);

            expect(handleChange).to.have.been.calledWith(eventData);
        });

        it('should not throw an error if `onChange` was not passed in', function() {
            var inputInstance = TestUtils.renderIntoDocument(
                    <Input
                        value='ezequiel'
                    />
                );

            inputInstance.handleChange({
                target: {
                    value: 'ezequiel rodriguez'
                }
            });
        });
    });

    describe('#isCursorAtEnd', function() {
        // This is only required for tests which use `setSelectionRange`.
        // We have to render into the body because `setSelectionRange`
        // doesn't work if the element isn't actually on the page.
        // With React >= 0.14 rendering into document.body outputs a warning,
        // use a div inside an iframe instead. (http://yahooeng.tumblr.com/post/102274727496/to-testutil-or-not-to-testutil)

        beforeEach(function () {
            this.iframe = document.createElement('iframe');
            document.body.appendChild(this.iframe);

            this.iframeDiv = document.createElement('div');
            this.iframe.contentDocument.body.appendChild(this.iframeDiv);
        });

        afterEach(function() {
            ReactDOM.unmountComponentAtNode(this.iframeDiv);
            delete this.iframeDiv;

            document.body.removeChild(this.iframe);
            delete this.iframe;
        });

        it('should return `true` if the cursor is at the end', function() {
            var value = 'ezequiel',
                inputInstance = ReactDOM.render(
                    <Input
                        value={value}
                    />,
                    this.iframeDiv
                ),
                inputDOMNode = ReactDOM.findDOMNode(inputInstance),
                startRange = value.length,
                endRange = value.length;

            inputDOMNode.setSelectionRange(startRange, endRange);

            expect(inputInstance.isCursorAtEnd()).to.be.true;
        });

        it('should return `false` if the cursor is at the beginning', function() {
            var inputInstance = ReactDOM.render(
                    <Input
                        value='ezequiel'
                    />,
                    this.iframeDiv
                ),
                inputDOMNode = ReactDOM.findDOMNode(inputInstance);

            inputDOMNode.setSelectionRange(0, 0);

            expect(inputInstance.isCursorAtEnd()).to.be.false;
        });

        it('should return `false` if the cursor is in the middle', function() {
            var value = 'ezequiel',
                inputInstance = ReactDOM.render(
                    <Input
                        value={value}
                    />,
                    this.iframeDiv
                ),
                inputDOMNode = ReactDOM.findDOMNode(inputInstance),
                startRange = Math.floor(value.length / 2),
                endRange = Math.floor(value.length / 2);


            inputDOMNode.setSelectionRange(startRange, endRange);

            expect(inputInstance.isCursorAtEnd()).to.be.false;
        });

        it('should return `true` if the `value` is empty', function() {
            var inputInstance = ReactDOM.render(
                    <Input
                        value=''
                    />,
                    this.iframeDiv
                );

            expect(inputInstance.isCursorAtEnd()).to.be.true;
        });

        it('should return `true` if there is no `value`', function() {
            var inputInstance = ReactDOM.render(
                    <Input />,
                    this.iframeDiv
                );

            expect(inputInstance.isCursorAtEnd()).to.be.true;
        });
    });
});
