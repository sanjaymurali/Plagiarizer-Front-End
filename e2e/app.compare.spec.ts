import {browser, by, element} from 'protractor';
import * as path from 'path';

describe('Compare Page', () => {

    beforeEach(() => {
        browser.get('/select');
        browser.waitForAngularEnabled(true);
    });

    beforeAll(() => {
        browser.waitForAngularEnabled(false);
        browser.get('http://localhost:8080/cleanse');
    });

    afterAll(() => {
        browser.waitForAngularEnabled(false);
        browser.get('http://localhost:8080/cleanse');
    });


    function uploadSubmissions() {
        browser.get('/upload').then(() => {
            const uploadButton = element(by.css('#pd-test-upload-button'));
            const uploadForm = element(by.tagName('form'));

            const file1 = path.join('test-files', 'try.java');
            const absolutePath = path.resolve(__dirname, file1);

            uploadForm.element(by.css('input[type=text]')).sendKeys('Sanjay'); // Student name
            uploadForm.element(by.css('input[type=file]')).sendKeys(absolutePath); // Student name

            uploadButton.click().then(() => {
                const file2 = path.join('test-files', 'try.java');
                const file3 = path.join('test-files', 'try copy.java');
                const absolutePath1 = path.resolve(__dirname, file2);
                const absolutePath2 = path.resolve(__dirname, file3);

                uploadForm.element(by.css('input[type=text]')).sendKeys('Suvi'); // Student name
                uploadForm.element(by.css('input[type=file]')).sendKeys(absolutePath1  + '\n' + absolutePath2); // Student name

                uploadButton.click();
            });
        });

    }

    it('should show no submissions message', () => {
        const alertCSS = element.all(by.css('.alert-danger'));

        // should show No submissions found error message on both sides!

        alertCSS.get(0).getText().then(text => {
            expect(text).toContain('No Submissions Found! Please Upload');
        });

        alertCSS.get(1).getText().then(text => {
            expect(text).toContain('No Submissions Found! Please Upload');
        });

        // Upload link
        const uploadLink1 = alertCSS.get(0).element(by.tagName('a'));
        uploadLink1.click().then(() => {
            expect(browser.getCurrentUrl()).toContain('/upload');
        });

        browser.get('/select');

        const uploadLink2 = alertCSS.get(1).element(by.tagName('a'));
        uploadLink2.click().then(() => {
            expect(browser.getCurrentUrl()).toContain('/upload');
        });
    });

    it('should show no submissions message in left side', () => {

        browser.get('/upload');
        const uploadButton = element(by.css('#pd-test-upload-button'));
        const uploadForm = element(by.tagName('form'));

        const file1 = 'test-files/try.java';
        const absolutePath = path.resolve(__dirname, file1);

        uploadForm.element(by.css('input[type=text]')).sendKeys('Sanjay'); // Student name
        uploadForm.element(by.css('input[type=file]')).sendKeys(absolutePath); // Student name

        uploadButton.click();

        browser.get('/select').then(() => {
            const alertCSS = element.all(by.css('.alert-danger'));
            expect(alertCSS.count()).toBe(1); // should have been 2, but we have uploaded for one student

            const submission = element(by.css('.pd-one-student'));

            submission.getText().then(text => {
                expect(text).toBe('Sanjay');
            });
        });
        browser.waitForAngularEnabled(false);
        browser.get('http://localhost:8080/cleanse');
    });

    it('should show both submissions', () => {
        uploadSubmissions();

        browser.get('/select').then(() => {
            const listGroup = element.all(by.css('.pd-upload-files'));

            listGroup.count().then(count => {
                expect(count).toBe(3); // we uploaded 1 file for one student and 2 files for another
            });
        });
    });

    it('should allow compare only when both student files are selected', () => {

        browser.waitForAngularEnabled(false);
        browser.get('http://localhost:8080/cleanse');
        uploadSubmissions();

        browser.get('/select').then(() => {

            const listGroup = element.all(by.css('.pd-upload-files'));
            const compareButton = element(by.css('.pd-compare-button'));
            const numberOfFilesSelected = element.all(by.css('.pd-selected-files-for-student'))

            listGroup.get(0).element(by.css('.mouse-pointer')).click().then(() => {
                const student1SelectedFiles = numberOfFilesSelected.get(0);
                let student2SelectedFiles = numberOfFilesSelected.get(1);

                expect(student1SelectedFiles.getText()).toBe('1 files selected of Suvi');
                expect(student2SelectedFiles.getText()).toBe('0 files selected of Sanjay');

                // the compare button should be disabled
                expect(compareButton.isEnabled()).toBeFalsy();

                // selecting another students files
                listGroup.get(2).element(by.css('.mouse-pointer')).click().then(() => {
                    student2SelectedFiles = numberOfFilesSelected.get(1);
                    expect(student2SelectedFiles.getText()).toBe('1 files selected of Sanjay');
                    // compare button should be enabled
                    expect(compareButton.isEnabled()).toBeTruthy();
                });
            });
        });
    });

});
