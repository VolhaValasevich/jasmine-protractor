const customReporter = require("./util/jasmine-custom-reporter.js");
const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    specs: ['./specs/*.js'],

    capabilities: {
        browserName: 'chrome'
    },

    jasmineNodeOpts: {
        // Remove default dot reporter
        print: () => { }
    },

    onPrepare: () => {
        jasmine.getEnv().addReporter(new customReporter());
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: './reports',
                takeScreenshotsOnlyOnFailures: true
            })
        );
        browser.driver.manage().window().maximize();
    }
};