import {browser, by, element} from 'protractor';
import * as path from 'path';

describe('Result Page', () => {

    beforeEach(() => {
        browser.waitForAngularEnabled(true);
        browser.get('/select');
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

    function selectFiles() {
        browser.get('/select').then(() => {

            const listGroup = element.all(by.css('.pd-upload-files'));
            const compareButton = element(by.css('.pd-compare-button'));
            const numberOfFilesSelected = element.all(by.css('.pd-selected-files-for-student'))

            listGroup.get(0).element(by.css('.mouse-pointer')).click();
                // selecting another students files
            listGroup.get(2).element(by.css('.mouse-pointer')).click();
            compareButton.click();
            });

    }

    function clearLocalStorage() {
        browser.executeScript('window.localStorage.clear();');
    }

    it('should1 show no results', () => {
        browser.get('/result').then(() => {
            const alertElement = element(by.css('.alert-danger'));
            alertElement.getText().then(text => {
                expect(text).toContain('No Students Selected for comparison!');
            });
        });
    });

    it('should2 show results for selected files', () => {
        uploadSubmissions();
        selectFiles();
        browser.sleep(3000);
        browser.get('/result').then(() => {
            const resultTitle = element(by.css('.pd-result-title'));

            const results = element.all(by.css('.result .progress-bar'));


            resultTitle.getText().then(text => {
                expect(text).toContain('Sanjay');
            });

            results.get(0).getText().then(text => {
                expect(text).toBe('100.00%');
            })

            results.get(1).getText().then(text => {
                expect(text).toBe('100.00%');
            })

            results.get(2).getText().then(text => {
                expect(text).toBe('100.00%');
            })

            results.get(3).getText().then(text => {
                expect(text).toBe('100.00%');
            });
        });
    });

    it('should3 clear the results page when compare again is clicked', () => {
        uploadSubmissions();
        selectFiles();
        browser.sleep(3000);
        browser.get('/result').then(() => {
            const compareAgain = element(by.css('.compare-again'));

            compareAgain.click().then(() => {
                expect(browser.getCurrentUrl()).toContain('/select');

                // the results should be erased
                browser.get('/result').then(() => {
                    const alertElement = element(by.css('.alert-danger'));
                    alertElement.getText().then(text => {
                        expect(text).toContain('No Students Selected for comparison!');
                    });
                });
            });
        });
    });



});
