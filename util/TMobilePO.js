class TMobilePO {

    constructor() {
        this.elements = {

            // elements from "Plans" page
            "Price Slider": "input.slider-range",
            "First Slider Tick": "div.item-alt-one",
            "Second Slider Tick": "div.second-tick",
            "Third Slider Tick": "div.third-tick",
            "Fourth Slider Tick": "div.price-slider-container",
            "Monthly Price": "div.price-container.active div.price",
            "Military Plans Button": "a[data-analytics-id='WEB-26806-military-available -buttonCta']",
            "Verify Military Status Button": "a[aria-label='Click to verify military status.']",

            // elements from "Store" page
            "Filter Button": "button[id='dropdownMenu1']",
            "Apple Checkbox": "label[for='filter-pm-0']",
            "LG Checkbox": "label[for='filter-pm-1']",
            "Samsung Checkbox": "label[for='filter-pm-2']",
            "First Search Result": "a.product-name",
            "Accessories Icon": "i.fa-headphones",
            "Search Input": "input[id='devicesSearchInput']",
            "Sort Order Dropdown Text": "button[id = 'sort'] span"
        };
    }
}

module.exports = new TMobilePO();