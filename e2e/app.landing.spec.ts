import {browser, by, element} from 'protractor';

describe('Landing Page', () => {

    it('should display navbar', () => {
        browser.get('/')
        const navbar = element(by.css('.navbar'));

        navbar.all(by.css('.pd-navbar-header .navbar-nav')).get(1).getText().then(text => {
            expect(text).toBe('Upload');
        });

        navbar.all(by.css('.pd-navbar-header .navbar-nav')).get(2).getText().then(text => {
                expect(text).toBe('Compare');
        });

        navbar.all(by.css('.pd-navbar-header .navbar-nav')).get(3).getText().then(text => {
            expect(text).toBe('Result');
        });

    });

    it('should navigate to Uploads page', () => {
        browser.get('/')
        const navbar = element(by.css('.navbar'));

        navbar.all(by.css('.pd-navbar-header .navbar-nav')).get(1).getText().then(text => {
            browser.get('/' + text.toLowerCase());
            expect(browser.getCurrentUrl()).toContain('/upload');
        });
    });

    it('should navigate to Compare page', () => {
        browser.get('/')
        const navbar = element(by.css('.navbar'));

        navbar.all(by.css('.pd-navbar-header .navbar-nav')).get(2).getText().then(text => {
            browser.get('/' + text.toLowerCase());
            expect(browser.getCurrentUrl()).toContain('/compare');
        });
    });

    it('should navigate to Result page', () => {
        browser.get('/')
        const navbar = element(by.css('.navbar'));

        navbar.all(by.css('.pd-navbar-header .navbar-nav')).get(3).getText().then(text => {
            browser.get('/' + text.toLowerCase());
            expect(browser.getCurrentUrl()).toContain('/result');
        });
    });
})
