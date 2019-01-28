/*
	Alpha by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			wide:      ( '1281px',  '1680px' ),
			normal:    ( '981px',   '1280px' ),
			narrow:    ( '737px',   '980px'  ),
			narrower:  ( '737px',   '840px'  ),
			mobile:    ( '481px',   '736px'  ),
			mobilep:   ( null,      '480px'  )
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right'
		});

	// NavPanel.

		// Button.
			$(
				'<div id="navButton">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Header.
		if (!browser.mobile
		&&	$header.hasClass('alt')
		&&	$banner.length > 0) {

			$window.on('load', function() {

				$banner.scrollex({
					bottom:		$header.outerHeight(),
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt reveal'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			});

		}

	/* ---- particles.js config ---- */

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 200,
      "density": {
        "enable": true,
        "value_area": 900
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});


/* ---- stats.js config ---- */

//var count_particles, stats, update;
//stats = new Stats;
//stats.setMode(0);
//stats.domElement.style.position = 'absolute';
//stats.domElement.style.left = '0px';
//stats.domElement.style.top = '0px';
//document.body.appendChild(stats.domElement);
//count_particles = document.querySelector('.js-count-particles');
//update = function() {
//  stats.begin();
//  stats.end();
//  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
//    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
//  }
//  requestAnimationFrame(update);
//};
//requestAnimationFrame(update);

// A comma separated list of currencies to display.
var ticker_currencies = ["btc","eth","usd","rub"];

ticker = function(currencies) {
  var symbols = {
    usd: "$",
    cny: "¥",
    jpy: "¥",
    eur: "€",
    btc: "฿",
    rub: "₽",
    eth: "Ξ"
  };

  $.ajax({
    type: "GET",
    //url: "https://min-api.cryptocompare.com/data/price?fsym=BCH&tsyms=" + currencies,
    url: "https://api.coingecko.com/api/v3/coins/taler",
    //contentType: "application/json; charset=utf-8",
    timeout: 6000,
    error: function (x, t, m) {
      if ($('#ticker_value').html() === 'Loading...') {
        $("#ticker_value").html("<div class='currency'>API data not found</div>");
      }
    },
    success: function (currencyRates) {
      var output = [];
    //console.log(currencyRates);
      $.each(ticker_currencies, function (num, currency)

      {
        var sym = symbols[currency],
            price = currencyRates['market_data']['current_price'][currency];
          console.log(currency, price);
        if (sym === undefined) {
          sym = "";
        }
        output.push("<div class='currency'>"  + sym + price.toFixed(8) + " <span class='country'>" + currency.toUpperCase() + "</span></div>");
      });

      $('#ticker_value').html(output);
    }
  }).done(function () {
    setTimeout(function(){ ticker(ticker_currencies); }, 50000);
  }).fail(function() {
    setTimeout(function(){ ticker(ticker_currencies); }, 50000);
  });
};

ticker(ticker_currencies);
})(jQuery);