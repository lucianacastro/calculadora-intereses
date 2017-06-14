var annual_rates = {
		santander: {
			pesos: {
				precancelable: {
					'30': 0.165,
					'60': 0.165,
					'90': 0.165,
					'180': 0.165,
					'365': 0.165,
				},
				non_cancelable: {
					'30': 0.15,
					'60': 0.149,
					'90': 0.1480,
					'180': 0.1450,
					'365': 0.14,
				},
			},
			dollars: {
				precancelable: {
					'30': 0.05,
					'60': 0.05,
					'90': 0.05,
					'180': 0.05,
					'365': 0.05,
				},
				non_cancelable: {
					'30': 0.05,
					'60': 0.05,
					'90': 0.05,
					'180': 0.05,
					'365': 0.05,
				},
			},
		},
		galicia: {
			pesos: {
				precancelable: {
					'30': 0.175,
					'60': 0.175,
					'90': 0.175,
					'180': 0.175,
					'365': 0.175,
				},
				non_cancelable: {
					'30': 0.16,
					'60': 0.159,
					'90': 0.1580,
					'180': 0.1550,
					'365': 0.15,
				},
			},
			dollars: {
				precancelable: {
					'30': 0.06,
					'60': 0.06,
					'90': 0.06,
					'180': 0.06,
					'365': 0.06,
				},
				non_cancelable: {
					'30': 0.06,
					'60': 0.06,
					'90': 0.06,
					'180': 0.06,
					'365': 0.06,
				},
			},
		},
	};

function getRate(bank, currency, cancellation, term) {
	var current_annual_rates = annual_rates[bank][currency][cancellation];
	var rate;
	if (term >= 365) {
		rate = current_annual_rates['365'];
	} else if (term >= 180) {
		rate = current_annual_rates['180'];
	} else if (term >= 90) {
		rate = current_annual_rates['90'];
	} else if (term >= 60) {
		rate = current_annual_rates['60'];
	} else if (term >= 30) {
		rate = current_annual_rates['30'];
	} else {
		return 0;
	}
	return rate;
};


//interest = capital * term * rate/365
function getInterest(rate, capital, term) {
	var interest = capital*(rate/365)*term;
	return interest;
}

function validate() {
	var capital = $('#capital').val();
	var term = $('#term').val();
	return (term >= 30) && (capital >= 500);
}

function showResult(interest, capital,currency) {
	var sign = currency === 'dollars'?  'US$' : 'AR$';
	$('#inicial-capital').text(sign + ' ' + capital);
	$('#interest-result').text(sign + ' ' + interest);
	var total = parseFloat(capital) + parseFloat(interest);
	$('#total-result').text(sign + ' ' + total.toFixed(2));
}


$(function() {
	$('#start').on('click', function() {
		$('.slide.cover').css('display', 'none');
		$('.slide.data').css('display', 'block');
	});

	$('#calc').on('click', function() {
		$('.slide.data').css('display', 'none');
		$('.slide.result').css('display', 'block');
		var bank = $('#bank').val();
		var currency = $('#currency').val();
		var cancellation = $('#cancellation').val();
		var term = $('#term').val();
		var rate = getRate(bank, currency, cancellation, term);
		var capital = $('#capital').val();
		var interest = (getInterest(rate, capital, term)).toFixed(2);
		showResult(interest, capital, currency);
	});

	$('#recalc').on('click', function() {
		$('.slide.result').css('display', 'none');
		$('.slide.cover').css('display', 'block');
	});

	$('.slide.data').on('change keyup', function(){
		$('button#calc').attr('disabled', validate() ? null : 'disabled');
	});

});




