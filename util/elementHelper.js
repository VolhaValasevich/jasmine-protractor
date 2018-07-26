const TMobilePO = require('./TMobilePO.js');
const logger = require("./logger.js").logger;

class ElementHelper {
    getPageObjectElement(alias) {
        const selector = TMobilePO.elements[alias];
        logger.info(`Searching for element ${selector}`);
        return element(by.css(selector));
    }

    getElement(selector) {
        // const selector = TMobilePO.elements[alias];
        logger.info(`Searching for element ${selector}`);
        const el = element(by.css(selector));
        console.log("el:" + Object.keys(el));
        return el;
    }
}

module.exports = new ElementHelper();