const helper = require("../util/elementHelper.js");
const logger = require("../util/logger.js").logger;

function getStartPage() {
    logger.info("Getting the start page");
    browser.get("https://www.t-mobile.com/");
}

function clickLink(linktext) {
    logger.info(`Clicking the link with text ${linktext}`);
    element(by.linkText(linktext)).click();
}

describe('T-Mobile plan page', () => {

    beforeAll(() => {
        logger.warn("Executing test: should have correct title");
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
        logger.info(`Dragging the slider to position "${pos}"[${locator}]`);
        return browser.actions().dragAndDrop(element(by.css('input.slider-range')), element(locator)).mouseUp().perform();
    }

    it('should have correct title', () => {
        expect(browser.getTitle()).toEqual("Cell Phone Plans | Family Plans | Compare Cell Phone Plans | T-Mobile");
    });

    fit('should change the price after moving the slider', () => {
        dragSliderToTick("second");
        // expect(element(by.css("div.price-container.active div.price")).getText()).toEqual("60");
        expect((helper.getElement("div.price-contttttainer.active div.price")).getText()).toEqual("60");
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