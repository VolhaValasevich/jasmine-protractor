// spec.js

function getStartPage() {
    browser.get("https://www.t-mobile.com/");
}

function clickLink(linktext) {
    element(by.linkText(linktext)).click();
}

describe('T-Mobile plan page', () => {

    beforeEach(() => {
        getStartPage();
        clickLink("PLANS");
    });

    function dragSliderToTick(pos) {
        let locator;
        switch (pos) {
        case "second": case "third": {
            locator = by.css(`div.${pos}-tick`);
            break;
        }
        case "first": {
            locator = by.css('div.item-alt-one');
            break;
        }
        case "fourth": {
            locator = by.css('div.price-slider-container');
            break;
        }
        default: {
            locator = by.css('div.price-slider-container');
            break;
        }
        }
        return browser.actions().dragAndDrop(element(by.css('input.slider-range')), element(locator)).mouseUp().perform();
    }

    it('should have correct title', () => {
        expect(browser.getTitle()).toEqual("Cell Phone Plans | Family Plans | Compare Cell Phone Plans | T-Mobile");
    });

    it('should change the price after moving the slider', () => {
        dragSliderToTick("second");
        expect(element(by.css("div.price-container.active div.price")).getText()).toEqual("60");
    });

    describe('/ Military Plans page', () => {

        beforeAll(() => {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 40000; // military plans page takes a very long time to load
        });

        beforeEach(() => {
            element(by.css('a[data-analytics-id="WEB-26806-military-available -buttonCta"]')).click();
        });

        afterAll(() => {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000; // returning timeout interval to its default value
        });

        it('should have correct title', () => {
            expect(browser.getTitle()).toEqual("T-Mobile ONE Military Phone Plans | Discounts & More | T-Mobile");
        });

        it('should have an option for verifying military status', () => {
            expect(element(by.linkText("Verify military status")).isPresent()).toBeTruthy();
        });

        it('should change the price after moving the slider and have special prices for service members', () => {
            browser.executeScript(`window.scrollTo(0,1300);`);
            browser.sleep(3000); // sometimes the slider doesn't load in time
            dragSliderToTick("second");
            expect(element(by.css("div.price-container.active div.price")).getText()).toEqual("40");
        });
    });

});

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