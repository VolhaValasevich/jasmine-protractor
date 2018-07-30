const helper = require("../util/elementHelper.js");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 40000;

describe('T-Mobile plans page', () => {

    beforeAll(() => {
        helper.getStartPage();
        helper.clickLink("PLANS");
    });

    it('should have correct title', () => {
        expect(helper.getPageTitle()).toEqual("Cell Phone Plans | Family Plans | Compare Cell Phone Plans | T-Mobile");
    });

    it('should change the price after moving the slider', () => {
        helper.dragSliderToTick("second");
        const priceContainer = helper.getPageObjectElement("Monthly Price");
        expect(priceContainer.getText()).toEqual("60");
    });

    describe('Military Plans page', () => {

        beforeAll(() => {
            helper.getPageObjectElement("Military Plans Button").click();
        });

        it('should have correct title', () => {
            expect(helper.getPageTitle()).toEqual("T-Mobile ONE Military Phone Plans | Discounts & More | T-Mobile");
        });

        it('should have an option for verifying military status', () => {
            const verifyButton = helper.getPageObjectElement("Verify Military Status Button");
            expect(helper.isElementPresent(verifyButton)).toBeTruthy();
        });

        it('should change the price after moving the slider and have special prices for service members', () => {
            helper.scrollTo(0, 1300);
            helper.dragSliderToTick("second");
            const priceContainer = helper.getPageObjectElement("Monthly Price");
            expect(priceContainer.getText()).toEqual("40");
        });
    });

});