import rangesliderJs from 'rangeslider-js'

var easyCalculatorWidget = document.getElementById('ac-easy-calculator-widget')

if(easyCalculatorWidget) {
    var currency = easyCalculatorWidget.getAttribute('data-currency') || "USD"
    var minSliderValue = parseInt(easyCalculatorWidget.getAttribute('data-min')) || 0
    var maxSliderValue = parseInt(easyCalculatorWidget.getAttribute('data-max')) || 10000
    var initialSliderValue = parseInt(easyCalculatorWidget.getAttribute('data-start-value')) || maxSliderValue*0.1
    var sliderIncrementStepAmount = parseInt(easyCalculatorWidget.getAttribute('data-step')) || 1000
    var monthLabel = easyCalculatorWidget.getAttribute('data-month-label') || "per month"
    var yearLabel = easyCalculatorWidget.getAttribute('data-year-label') || "per year"
    var monthlyRevenuePercent = easyCalculatorWidget.getAttribute('data-percent-revenue-per-month') || "10"
    var titleSlider = easyCalculatorWidget.getAttribute('data-title-slider') || "Your revenue per month"
    var titleVisual = easyCalculatorWidget.getAttribute('data-title-visual') || "With Easy you increase your revenue with"
    

    easyCalculatorWidget.innerHTML = renderTemplate(monthLabel, yearLabel, titleSlider, titleVisual)

    var easyCalculatorWidgetRangeSliderLabel = easyCalculatorWidget.querySelector('#ac-easy-calculator__slider-label')
    var easyCalculatorWidgetRangeSlider = easyCalculatorWidget.querySelector('#ac-easy-calculator-widget-range-slider')
    var visual1Coins = easyCalculatorWidget.querySelector('#ac-easy-calculator__visual__coins-1').querySelectorAll('.ac-easy-calculator__visual__coin')
    var visual2Coins = easyCalculatorWidget.querySelector('#ac-easy-calculator__visual__coins-2').querySelectorAll('.ac-easy-calculator__visual__coin')
    var message1 = document.getElementById('ac-easy-calculator__visual__message-1')
    var message2 = document.getElementById('ac-easy-calculator__visual__message-2')
    var message1Pricelabel = message1.querySelector('.ac-easy-calculator__visual__message__head')
    var message2Pricelabel = message2.querySelector('.ac-easy-calculator__visual__message__head')
    var rangesliderOptions = {
        min: minSliderValue,
        max: maxSliderValue,
        value: initialSliderValue,
        step: sliderIncrementStepAmount,
        onSlide: handleSlide,
        onInit: handleSlide,
    }
    rangesliderJs.create(easyCalculatorWidgetRangeSlider, rangesliderOptions)

    // Bind popup
    var popup = document.querySelector('.ac-easy-calculator-widget-popup-readmore__icon-container')
    if(popup) {
        popup.addEventListener('click', toggleReadmorePopup)
    }


}

function handleSlide(value, percent, position) {
    window.requestAnimationFrame(function(){
        calculateAmountOfVisibleCoins(percent)
        updateSliderLabelAndPosition(value, position, this.maxHandleX)    
        updateRevenueLabels(value)
    }.bind(this))
}


function calculateAmountOfVisibleCoins(percent) {
    
    var p1f = 100/visual1Coins.length // get fraction
    var step1 = Math.floor((100*percent)/p1f) // get amount of fractions from current percentage
    var step1Coin = Math.max(0, (visual1Coins.length - 1) - step1) // get step number. Start from bottom element and move up

    var p2f = 100/visual2Coins.length
    var step2 = Math.floor((100*percent)/p2f)
    var step2Coin = Math.max(0, (visual2Coins.length - 1) - step2)
    
    for (var i = 0; i < visual1Coins.length; i++) {
        visual1Coins[i].classList.remove('is-active')
    }
    for (var i = 0; i < visual2Coins.length; i++) {
        visual2Coins[i].classList.remove('is-active')
    }

    visual1Coins[step1Coin].classList.add('is-active')
    visual2Coins[step2Coin].classList.add('is-active')

    updateRevenueBubblePosition(step1, step2)
}

function updateSliderLabelAndPosition(value,position, maxHandleX) {
    easyCalculatorWidgetRangeSliderLabel.innerHTML = value.toLocaleString('da') + ' ' + currency

    if(position < (easyCalculatorWidgetRangeSliderLabel.clientWidth/2 - 25) ) {
        easyCalculatorWidgetRangeSliderLabel.setAttribute('style', 'transform: translateX(0);')
    } else if(position > (maxHandleX - (easyCalculatorWidgetRangeSliderLabel.clientWidth/2 - 28))) {
        easyCalculatorWidgetRangeSliderLabel.setAttribute('style', 'transform: translateX('+(maxHandleX - easyCalculatorWidgetRangeSliderLabel.clientWidth/2 - 28)+'px);')
    } else {
        easyCalculatorWidgetRangeSliderLabel.setAttribute('style', 'transform: translateX('+(position - (easyCalculatorWidgetRangeSliderLabel.clientWidth/2) + 25)+'px)')
    }
}

function calculateMonthlyRevenue(value) {
    return value*(monthlyRevenuePercent/100)
}

function calculateYearlyRevenue(value) {
    return (value*(monthlyRevenuePercent/100))*12
}

function updateRevenueLabels(value) {
    message1Pricelabel.innerHTML = calculateMonthlyRevenue(value).toLocaleString('da') + " " + currency
    message2Pricelabel.innerHTML = calculateYearlyRevenue(value).toLocaleString('da') + " " + currency
}

function updateRevenueBubblePosition(step1AmountOfCoins,step2AmountOfCoins) {
    
    var heightOfCoin = 9

    // mesage1
    if(step1AmountOfCoins <= visual1Coins.length) {
        message1.setAttribute('style', 'transform: translateY(-'+((step1AmountOfCoins + 2)*heightOfCoin)+'px);')
    }
    // mesage2
    if(step2AmountOfCoins <= visual2Coins.length) {
        message2.setAttribute('style', 'transform: translateY(-'+((step2AmountOfCoins + 2)*heightOfCoin)+'px);')
    }
}

function toggleReadmorePopup() {
    this.classList.toggle('is-active')
}

function renderTemplate(monthLabel, yearLabel, titleSlider, titleVisual) {

    return '<div class="ac-easy-calculator">'+
        '<div class="ac-easy-calculator__slider-container">'+
            '<div class="ac-easy-calculator__slider-container__title">'+ titleSlider +'</div>'+
            '<div class="ac-easy-calculator__slider">'+
                '<input type="range" name="asd" id="ac-easy-calculator-widget-range-slider">'+
                '<div class="ac-easy-calculator__slider-label" id="ac-easy-calculator__slider-label"></div>'+
            '</div>'+
        '</div>'+
        '<div class="ac-easy-calculator__visual-container" id="ac-easy-calculator__visual-container">'+
            '<div class="ac-easy-calculator__visual-container__title">'+ titleVisual +'</div>'+
            '<div class="ac-easy-calculator__visual ac-easy-calculator__visual--1">'+
                '<div class="ac-easy-calculator__visual__message" id="ac-easy-calculator__visual__message-1">'+
                    '<div class="ac-easy-calculator__visual__message__head"></div>'+
                    '<div class="ac-easy-calculator__visual__message__body">' + monthLabel + '</div>'+
                '</div>'+
                '<div class="ac-easy-calculator__visual__coins" id="ac-easy-calculator__visual__coins-1">'+
                    '<div class="ac-easy-calculator__visual__coin">'+
                        '<img src="/coin.svg">'+
                    '</div>'+
                    '<div class="ac-easy-calculator__visual__coin">'+
                        '<img src="/coin.svg">'+
                    '</div>'+
                    '<div class="ac-easy-calculator__visual__coin">'+
                        '<img src="/coin.svg">'+
                    '</div>'+
                    '<div class="ac-easy-calculator__visual__coin">'+
                        '<img src="/coin.svg">'+
                    '</div>'+
                    '<div class="ac-easy-calculator__visual__coin">'+
                        '<img src="/coin.svg">'+
                    '</div>'+
                    '<div class="ac-easy-calculator__visual__coin">'+
                        '<img src="/coin.svg">'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="ac-easy-calculator__visual ac-easy-calculator__visual--2">'+
                '<div class="ac-easy-calculator__visual__message" id="ac-easy-calculator__visual__message-2">'+
                    '<div class="ac-easy-calculator__visual__message__head"></div>'+
                    '<div class="ac-easy-calculator__visual__message__body">' + yearLabel + '</div>'+
                '</div>'+
                '<div class="ac-easy-calculator__visual__coins" id="ac-easy-calculator__visual__coins-2">'+
                    '<div class="ac-easy-calculator__visual__coin">'+
                        '<img src="/coin.svg">'+
                    '</div>'+
                    '<div class="ac-easy-calculator__visual__coin">'+
                        '<img src="/coin.svg">'+
                    '</div>'+
                    '<div class="ac-easy-calculator__visual__coin">'+
                        '<img src="/coin.svg">'+
                    '</div>'+
                    '<div class="ac-easy-calculator__visual__coin">'+
                        '<img src="/coin.svg">'+
                    '</div>'+
                    '<div class="ac-easy-calculator__visual__coin">'+
                        '<img src="/coin.svg">'+
                    '</div>'+
                    '<div class="ac-easy-calculator__visual__coin">'+
                        '<img src="/coin.svg">'+
                    '</div>'+
                    '<div class="ac-easy-calculator__visual__coin">'+
                        '<img src="/coin.svg">'+
                    '</div>'+
                    '<div class="ac-easy-calculator__visual__coin">'+
                        '<img src="/coin.svg">'+
                    '</div>'+
                    '<div class="ac-easy-calculator__visual__coin">'+
                        '<img src="/coin.svg">'+
                    '</div>'+
                    '<div class="ac-easy-calculator__visual__coin">'+
                        '<img src="/coin.svg">'+
                    '</div>'+
                    '<div class="ac-easy-calculator__visual__coin">'+
                        '<img src="/coin.svg">'+
                    '</div>'+
                    '<div class="ac-easy-calculator__visual__coin">'+
                        '<img src="/coin.svg">'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'
}
