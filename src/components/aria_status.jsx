'use strict';

var React = require('react'),
    ReactDOM = require('react-dom'),
    PropTypes = require('prop-types');

module.exports = class extends React.Component {
    static displayName = 'Aria Status';

    static propTypes = process.env.NODE_ENV === 'production' ? {} : {
        message: PropTypes.string
    };

    componentDidMount() {
        var _this = this;

        // This is needed as `componentDidUpdate`
        // does not fire on the initial render.
        _this.setTextContent(_this.props.message);
    }

    componentDidUpdate() {
        var _this = this;

        _this.setTextContent(_this.props.message);
    }

    render() {
        return (
            <span
                role='status'
                aria-live='polite'
                style={{
                    left: '-9999px',
                    position: 'absolute'
                }}
            />
        );
    }

    // We cannot set `textContent` directly in `render`,
    // because React adds/deletes text nodes when rendering,
    // which confuses screen readers and doesn't cause them to read changes.
    setTextContent = (textContent) => {
        // We could set `innerHTML`, but it's better to avoid it.
        ReactDOM.findDOMNode(this).textContent = textContent || '';
    };
};
