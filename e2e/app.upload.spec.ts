import {browser, by, element} from 'protractor';
import * as path from 'path';

describe('Upload Page', () => {

    beforeEach(() => {
        browser.get('/');
        const navbar = element(by.css('.navbar'));

        navbar.all(by.css('.pd-navbar-header .navbar-nav')).get(1).getText().then(text => {
            browser.get('/' + text.toLowerCase());
        });
    });

    beforeAll(() => {
        browser.waitForAngularEnabled(false);
        browser.get('http://localhost:8080/cleanse');
    });

    afterAll(() => {
        browser.waitForAngularEnabled(false);
        browser.get('http://localhost:8080/cleanse');
    });

    it('shouldnt allow upload without filename', () => {
        const uploadButton = element(by.css('#pd-test-upload-button'));
        expect(uploadButton.isEnabled()).toBeFalsy();
    });

    it('should throw Error when trying to upload without files', () => {
        const uploadButton = element(by.css('#pd-test-upload-button'));
        const uploadForm = element(by.tagName('form'));
        uploadForm.element(by.css('input[type=text]')).sendKeys('Sanjay'); // Student name
        uploadButton.click().then(() => {
            const error = element(by.tagName('app-alerts')).getText();
            expect(error).toContain('Error!');
        });
    });

    it('should upload successfully', () => {
        const uploadButton = element(by.css('#pd-test-upload-button'));
        const uploadForm = element(by.tagName('form'));

        const file1 = path.join('test-files', 'try.java');
        const absolutePath = path.resolve(__dirname, file1);

        uploadForm.element(by.css('input[type=text]')).sendKeys('Sanjay'); // Student name
        uploadForm.element(by.css('input[type=file]')).sendKeys(absolutePath); // Student name

        uploadButton.click().then(() => {
            const success = element(by.tagName('app-alerts'))
            expect(success.getText()).toContain('Success!');

        });


    });

    it('should upload multiple files successfully', () => {
        const uploadButton = element(by.css('#pd-test-upload-button'));
        const uploadForm = element(by.tagName('form'));

        const file1 = path.join('test-files', 'try.java');
        const file2 = path.join('test-files', 'try copy.java');
        const absolutePath1 = path.resolve(__dirname, file1);
        const absolutePath2 = path.resolve(__dirname, file2);

        uploadForm.element(by.css('input[type=text]')).sendKeys('Sanjay'); // Student name
        uploadForm.element(by.css('input[type=file]')).sendKeys(absolutePath1); // Student name
        uploadForm.element(by.css('input[type=file]')).sendKeys(absolutePath2); // Student name

        uploadButton.click().then(() => {
            const success = element(by.tagName('app-alerts'));
            expect(success.getText()).toContain('Success!');

        });


    });

});
