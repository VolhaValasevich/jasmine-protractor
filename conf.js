// conf.js
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    specs: ['./specs/mobilePlansPage.js'],

    capabilities: {
        browserName: 'chrome'
    },

    onPrepare: () => {
        browser.driver.manage().window().maximize();
    }
};