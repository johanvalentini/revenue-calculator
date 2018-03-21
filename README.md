# DIBS Easy Revenue Calculator Widget
---

# Use

## Files
Files found in /dist/ is to be used. An example of implementation is shown in ```dist/index.html```.
Required files are:
```
easy-widget.bundle.js
easy-widget.css
```
The extra image assets used are:
```
coin.svg
bubble-green-dark.svg
bubble-green-light.svg
slider-knob.svg
```
These are used as assets in the HTML and css and are recommended be moved to an asset server and linked to with full urls ```(https://***.**)``` or equivalent.

## Initialization Attributes
From the attributes of the placeholder element, you can control the parameters and labels of the calculator widget. Here is the attributes from the example:
```
data-min="0"
data-max="1500000"
data-start-value="50000"
data-step="1000"
data-currency="SEK"
data-month-label="per måned"
data-year-label="per år"
data-percent-revenue-per-month="12"
data-title-slider="Din omsättning per månad"
data-title-visual="MED EASY ÖKAR DIN OMSÄTTNING MED"
```

```data-min``` is the slider minimum. 

```data-max``` is the slider maximum.

```data-start-value``` is a custom start value. Defaults to 10% of max value.

```data-step``` controls the slider increment size.

```data-currency``` is appended to currency labels.

```data-month-label``` label for revenue/month bubble.

```data-year-label``` label for revenue/year bubble.

```data-percent-revenue-per-month``` percentage points used for calculation.

```data-title-slider``` slider section title.

```data-title-visual``` visual section title.


# Develop
## Requirements for building
 * [`yarn` package manager](https://yarnpkg.com/)

## Setup for building
```
yarn
```

## Build

### All
```
yarn build
```

### Individually
```
yarn watch:js
yarn build:js
yarn watch:sass
yarn build:sass
```

## The HTML
The included ```dist/index.html``` contains examples of use. The included script, stylesheet and image assets is required for the widget to work. The font will default to the default page font.
The classes styled in the CSS and IDs used for mechanics is all scoped with a "ac-" prefix and should not collide with any existing css in the existing DIBS template.

## Notes on compatibility
The code is made for modern browsers (IE 11+, Edge, Chrome, Firefox, Safari). Vendor prefixes is added to be compatible for the latest two versions of each of the evergreen browsers (Edge, Chrome, Firefox). 
