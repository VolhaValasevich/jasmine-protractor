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
        switch (pos) {
            case "second": case "third": {
                return browser.actions().dragAndDrop(element(by.css('input.slider-range')), element(by.css(`div.${pos}-tick`))).mouseUp().perform();
            }
            case "first": {
                return browser.actions().dragAndDrop(element(by.css('input.slider-range')), element(by.css(`div.item-alt-one`))).mouseUp().perform();
            }
            case "fourth": break;
        }
    }

    it('should have correct title', () => {
        expect(browser.getTitle()).toEqual("Cell Phone Plans | Family Plans | Compare Cell Phone Plans | T-Mobile");
    });

    it('should change the price after moving the slider', () => {
        dragSliderToTick("second");
        expect(element(by.css("div.price-container.active div.price")).getText()).toEqual("60");
    });

    describe('Military Plans', () => {

        beforeAll(() => {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 40000;       //military plans page takes a very long time to load
        })

        beforeEach(() => {
            element(by.css('a[data-analytics-id="WEB-26806-military-available -buttonCta"]')).click();
        })

        afterAll(() => {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;        //returning timeout interval to its default value
        })

        it('should have correct title', () => {            
            expect(browser.getTitle()).toEqual("T-Mobile ONE Military Phone Plans | Discounts & More | T-Mobile");
        })

        it('should have an option for verifying military status', () => {
            expect(element(by.linkText("Verify military status")).isPresent()).toBeTruthy();
        })

        it('should change the price after moving the slider and have special prices for service members', () => {
            browser.executeScript(`window.scrollTo(0,1300);`);
            browser.sleep(2000);                            //sometimes the slider doesn't load in time
            dragSliderToTick("second");
            expect(element(by.css("div.price-container.active div.price")).getText()).toEqual("40");
        })
    })

});

describe('T-Mobile phones page', () => {

    beforeAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 40000;       
    })

    beforeEach(() => {
        element(by.css('a[data-analytics-id="WEB-26806-military-available -buttonCta"]')).click();
    })

    beforeEach(() => {
        getStartPage();
        clickLink("PHONES");
    });

    it('should have the right title', () => {
        expect(browser.getTitle()).toEqual("Smartphones & Cell Phones | Compare our Best Cell Phones & Smartphones");
    });

    fit('should filter phones by manufacturer', () => {
        browser.executeScript(`window.scrollTo(0,800);`);
        element(by.id("dropdownMenu1")).click();
        element(by.css('p[aria-label = "Apple"]')).click();
        browser.sleep(4000);
        expect(element(by.css('div.viewSection span.ng-binding')).getText()).toEqual("Apple");
    })

})