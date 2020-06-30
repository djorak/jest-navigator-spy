import React, { Component } from 'react';

const addToClipboard = () => {
    if (window.isSecureContext) {
        navigator.clipboard.writeText('Hello World')
            .then(() => {
                console.log('successfully copied to clipboard');
            })
            .catch(() => {
                console.log('copy to clipboard failed');
            });
    }
}

export default class TestClipboardComponent extends Component {
    render() {
        return (
            <button onClick={addToClipboard}>Copy to clipboard</button>
        );
    }
}
