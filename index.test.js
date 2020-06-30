import React from 'react';
import { shallow } from 'enzyme';

import TestClipboardComponent from '.';

const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

const oldIsSecureContext = global.isSecureContext;
const consoleLogSpy = jest.spyOn(console, 'log');
const mockClipboard = {
    writeText: jest.fn()
};

Object.assign(navigator, {
    clipboard: mockClipboard,
});


afterEach(() => {
    consoleLogSpy.mockRestore();
    mockClipboard.writeText.mockRestore();
});

describe('In a secure context', () => {
    beforeAll(() => {
        global.isSecureContext = true;
    });

    afterAll(() => {
        global.isSecureContext = oldIsSecureContext;
    });

    it('should write "Hello World" to the clipboard', async () => {
        mockClipboard.writeText.mockResolvedValueOnce();

        const testClipboardComponentView = shallow(<TestClipboardComponent />);

        testClipboardComponentView.find('button').simulate('click');

        await wait();
        expect(mockClipboard.writeText).toHaveBeenCalledWith('Hello World');
        expect(consoleLogSpy).toHaveBeenCalledWith('successfully copied to clipboard');
    });
});

describe('In an insecure context', () => {
    beforeAll(() => {
        global.isSecureContext = false;
    });

    afterAll(() => {
        global.isSecureContext = oldIsSecureContext;
    });

    it('should not write "Hello World" to the clipboard', async () => {
        mockClipboard.writeText.mockResolvedValueOnce();

        const testClipboardComponentView = shallow(<TestClipboardComponent />);

        testClipboardComponentView.find('button').simulate('click');

        expect(mockClipboard.writeText).not.toHaveBeenCalled();
    });
});

