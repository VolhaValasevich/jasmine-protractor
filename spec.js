// spec.js

function getStartPage() {
        browser.get("https://www.t-mobile.com/");
}

function clickLink(linktext) {
    element(by.linkText(linktext)).click();
}

xdescribe('T-Mobile plan page', () => {

    beforeEach(() => {
        getStartPage();
        clickLink("PLANS");
    });

    it('should have the right title', () => {
        expect(browser.getTitle()).toEqual("Cell Phone Plans | Family Plans | Compare Cell Phone Plans | T-Mobile");
    });
});

describe('T-Mobile phones page', () => {

    beforeEach(() => {
        getStartPage();
        clickLink("PHONES");
    });

    it('should have the right title', () => {
        expect(browser.getTitle()).toEqual("Smartphones & Cell Phones | Compare our Best Cell Phones & Smartphones");
    });

})