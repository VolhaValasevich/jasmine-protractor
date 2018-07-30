const TMobilePO = require('./TMobilePO.js');
const logger = require("./logger.js").logger;
const until = protractor.ExpectedConditions;

class ElementHelper {
    getPageObjectElement(alias) {
        const selector = TMobilePO.elements[alias];
        logger.info(`Searching for element ${selector}`);
        return element(by.css(selector));
    }

    getPageTitle() {
        logger.info("Getting the page title");
        return browser.getTitle();
    }

    getStartPage() {
        logger.info("Getting the start page");
        browser.get("https://www.t-mobile.com/");
    }

    clickLink(linktext) {
        logger.info(`Clicking the link with text ${linktext}`);
        element(by.linkText(linktext)).click();
    }

    dragSliderToTick(pos) {
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
        logger.info(`Dragging the slider to position "${pos}" [${locator}]`);
        return browser.actions().dragAndDrop(element(by.css('input.slider-range')), element(locator)).mouseUp().perform();
    }

    isElementPresent(element) {
        logger.info('Checking if the element is present');
        return element.isPresent();
    }

    waitUntilPresent(alias) {
        logger.info(`Waiting until "${alias}" is present`);
        browser.wait(until.presenceOf(this.getPageObjectElement(alias)), 30000);
    }

    scrollTo(x, y) {
        logger.info(`Scrolling to position ${x}, ${y}`);
        return browser.executeScript(`window.scrollTo(${x},${y});`);
    }

    sendKeys(element, keys) {
        logger.info(`Sending [${keys}] keys to the element`);
        element.sendKeys(keys);
    }
}

module.exports = new ElementHelper();