const customReporter = require("./util/jasmine-custom-reporter.js");

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    specs: ['./specs/mobilePlansPage.js'],

    capabilities: {
        browserName: 'chrome'
    },

    jasmineNodeOpts: {
        // Remove default dot reporter
        print: () => { }
    },

    onPrepare: () => {
        jasmine.getEnv().addReporter(new customReporter());
        browser.driver.manage().window().maximize();
    }
};