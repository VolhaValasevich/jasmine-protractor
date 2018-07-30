const helper = require("../util/elementHelper.js");
const logger = require("../util/logger.js").logger;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 40000;

fdescribe('T-Mobile plans page', () => {

    beforeAll(() => {
        helper.getStartPage();
        helper.clickLink("PLANS");
    });

    it('should have correct title', () => {
        logger.info("Checking T-Mobile plans page title");
        expect(helper.getPageTitle()).toEqual("Cell Phone Plans | Family Plans | Compare Cell Phone Plans | T-Mobile");
    });

    it('should change the price after moving the slider', () => {
        logger.info("Checking the price slider on T-Mobile plans page");
        helper.dragSliderToTick("second");
        const priceContainer = helper.getPageObjectElement("Monthly Price");
        expect(priceContainer.getText()).toEqual("60");
    });

    describe('Military Plans page', () => {

        beforeAll(() => {
            helper.getPageObjectElement("Military Plans Button").click();
        });

        it('should have correct title', () => {
            logger.info("Checking T-Mobile military plans page title");
            expect(helper.getPageTitle()).toEqual("T-Mobile ONE Military Phone Plans | Discounts & More | T-Mobile");
        });

        it('should have an option for verifying military status', () => {
            logger.info("Checking the presence of 'Verify military status' button");
            const verifyButton = helper.getPageObjectElement("Verify Military Status Button");
            expect(helper.isElementPresent(verifyButton)).toBeTruthy();
        });

        it('should change the price after moving the slider and have special prices for service members', () => {
            logger.info("Checking the price slider on T-Mobile military plans page");
            helper.scrollTo(0, 1300);
            helper.dragSliderToTick("second");
            const priceContainer = helper.getPageObjectElement("Monthly Price");
            expect(priceContainer.getText()).toEqual("40");
        });
    });

});