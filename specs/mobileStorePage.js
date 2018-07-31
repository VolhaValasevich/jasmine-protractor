const helper = require("../util/elementHelper.js");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 40000;

describe('T-Mobile phones page', () => {

    beforeAll(() => {
        helper.getStartPage();
        helper.clickLink("PHONES");
    });

    it('should have correct title', () => {
        expect(helper.getPageTitle()).toEqual("Smartphones & Cell Phones | Compare our Best Cell Phones & Smartphones");
    });

    it('should filter phones by manufacturer', () => {
        helper.scrollTo(0, 700);
        helper.getPageObjectElement("Filter Button").click();
        helper.getPageObjectElement("Apple Checkbox").click();
        const firstSearchResult = helper.getPageObjectElement("First Search Result");
        expect(firstSearchResult.getText()).toContain("Apple");
    });

    it('should have links to phone pages', () => {
        const firstSearchResult = helper.getPageObjectElement("First Search Result");
        const phoneName = firstSearchResult.getText();
        firstSearchResult.click();
        expect(helper.getPageTitle()).toContain(phoneName);
    });

    describe('Phone Accessories page', () => {
        beforeAll(async () => {
            helper.clickLink("PHONES");
            helper.getPageObjectElement("Accessories Icon").click();
            browser.sleep(3000);
            // await helper.waitUntilPresent("Search Input"); // for some reason it results in Angular timeout
        });

        it('should autocomplete search input', async () => {
            const searchInput = helper.getPageObjectElement("Search Input");
            helper.sendKeys(searchInput, "apple");
            helper.sendKeys(searchInput, protractor.Key.ENTER);
            const text = await searchInput.getAttribute('value');
            expect(text).toEqual("Apple Watch Nike+ 38mm");
        });

        it('should display prices from low to high by default', () => {
            const defaultSortOrder = helper.getPageObjectElement("Sort Order Dropdown Text");
            expect(defaultSortOrder.getText()).toEqual("Price low to high");
        });
    });
});