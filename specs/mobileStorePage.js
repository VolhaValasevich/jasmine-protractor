function getStartPage() {
    browser.get("https://www.t-mobile.com/");
}

function clickLink(linktext) {
    element(by.linkText(linktext)).click();
}

describe('T-Mobile phones page', () => {

    beforeAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 40000;
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
    });

    beforeEach(() => {
        getStartPage();
        clickLink("PHONES");
    });

    it('should have correct title', () => {
        expect(browser.getTitle()).toEqual("Smartphones & Cell Phones | Compare our Best Cell Phones & Smartphones");
    });

    it('should filter phones by manufacturer', () => {
        browser.executeScript(`window.scrollTo(0,800);`);
        element(by.id("dropdownMenu1")).click();
        element(by.css('p[aria-label = "Apple"]')).click();
        expect(element(by.css('div.viewSection span.ng-binding')).getText()).toEqual("Apple");
    });

    it('should have links to phone pages', () => {
        const firstResultLink = element(by.css("a.product-name"));
        const phoneName = firstResultLink.getText();
        firstResultLink.click();
        expect(browser.getTitle()).toContain(phoneName);
    });

    describe('/ Phone Accessories page', () => {
        beforeEach(() => {
            element(by.xpath('//span[contains(text(), "Accessories")]')).click();
            browser.sleep(5000); // accessories load for a long time
        });

        it('should autocomplete search input', () => {
            const searchInput = element(by.id("devicesSearchInput"));
            searchInput.sendKeys("apple").sendKeys(protractor.Key.ENTER);
            expect(searchInput.getAttribute('value')).toEqual("Apple Watch Nike+ 38mm");
        });

        it('should display prices from low to high by default', () => {
            expect(element(by.css('button[id = "sort"] span')).getText()).toEqual("Price low to high");
        });
    });
});